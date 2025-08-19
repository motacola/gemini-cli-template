import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NLTimesheetEntry } from './nl-timesheet-entry'; // Adjust path as needed
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client'; // Adjust path for supabase client

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Supabase client
const mockSupabaseInsert = jest.fn();
const mockSupabaseFrom = jest.fn(() => ({
  insert: mockSupabaseInsert,
}));
const mockSupabaseClient = {
  from: mockSupabaseFrom,
};
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => mockSupabaseClient),
}));

// Mock fetch
global.fetch = jest.fn();

// Mock window.webkitSpeechRecognition
const mockSpeechRecognitionStart = jest.fn();
const mockSpeechRecognitionStop = jest.fn(); // if you add stop functionality
let mockSpeechRecognitionInstance: any;

beforeAll(() => {
  mockSpeechRecognitionInstance = {
    start: mockSpeechRecognitionStart,
    stop: mockSpeechRecognitionStop,
    continuous: false,
    interimResults: false,
    lang: '',
    onresult: null,
    onerror: null,
    onend: null,
  };
  (window as any).webkitSpeechRecognition = jest.fn(() => mockSpeechRecognitionInstance);
});


describe('NLTimesheetEntry Component', () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ result: {} }), // Default happy path empty result
    });
    mockSupabaseInsert.mockResolvedValue({ error: null }); // Default happy path for Supabase insert
  });

  describe('Initial Render and Basic Input', () => {
    it('renders the input form correctly', () => {
      render(<NLTimesheetEntry />);
      expect(screen.getByLabelText(/describe your work/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /process input/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /mic/i })).toBeInTheDocument(); // For voice input
    });

    it('allows typing in the textarea and calls API on "Process Input"', async () => {
      const inputText = 'Worked 2 hours on Project X';
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({
          result: {
            project_id: '123',
            project_name: 'Project X',
            hours: 2,
            description: inputText,
            date: '2024-05-24',
            billable: true,
            task_type: 'Development',
          },
        }),
      });

      render(<NLTimesheetEntry />);
      fireEvent.change(screen.getByLabelText(/describe your work/i), { target: { value: inputText } });
      fireEvent.click(screen.getByRole('button', { name: /process input/i }));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/process-timesheet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: inputText }),
        });
      });

      await waitFor(() => {
        expect(screen.getByText('Project X')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument(); // Hours
        expect(screen.getByText('Development')).toBeInTheDocument(); // Task Type
      });
    });
  });

  describe('Display Parsed Data', () => {
    it('displays all parsed information correctly, including task_type', async () => {
      const apiResult = {
        project_id: 'proj-alpha',
        project_name: 'Project Alpha',
        job_number: 'JOB-001',
        hours: 4.5,
        date: '2024-05-24',
        billable: false,
        description: 'Client meeting and planning for phase 2.',
        task_type: 'Meeting',
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ result: apiResult }),
      });

      render(<NLTimesheetEntry />);
      fireEvent.change(screen.getByLabelText(/describe your work/i), { target: { value: 'Meeting about Alpha phase 2 for 4.5 hours' } });
      fireEvent.click(screen.getByRole('button', { name: /process input/i }));

      await waitFor(() => {
        expect(screen.getByText('Project Alpha')).toBeInTheDocument();
        expect(screen.getByText('4.5')).toBeInTheDocument();
        expect(screen.getByText('2024-05-24')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument(); // Billable: No
        expect(screen.getByText('JOB-001')).toBeInTheDocument();
        expect(screen.getByText('Client meeting and planning for phase 2.')).toBeInTheDocument();
        expect(screen.getByText('Meeting')).toBeInTheDocument(); // Task Type
      });
    });
  });

  describe('Clarification Flow', () => {
    const initialInput = 'Work on website update';
    const clarificationResponse = {
      result: {
        clarification_needed: true,
        clarification_question: 'Which website update project did you mean?',
        possible_options: [
          { project_id: 'proj-1', project_name: 'Old Website Update', client_name: 'Client X' },
          { project_id: 'proj-2', project_name: 'New Portal Update', client_name: 'Client Y' },
        ],
      },
    };
    const finalResponse = {
      result: {
        project_id: 'proj-2',
        project_name: 'New Portal Update',
        hours: 3,
        description: initialInput + ' (clarified)',
        date: '2024-05-24',
        billable: true,
        task_type: 'Maintenance',
      },
    };

    it('displays clarification UI when API returns clarification_needed', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(clarificationResponse),
      });

      render(<NLTimesheetEntry />);
      fireEvent.change(screen.getByLabelText(/describe your work/i), { target: { value: initialInput } });
      fireEvent.click(screen.getByRole('button', { name: /process input/i }));

      await waitFor(() => {
        expect(screen.getByText('Which website update project did you mean?')).toBeInTheDocument();
      });
      expect(screen.getByLabelText(/old website update/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/new portal update/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit selection/i })).toBeInTheDocument();
    });

    it('calls API again with selected project ID and updates UI with final data', async () => {
      // First call returns clarification
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(clarificationResponse),
      });
      // Second call returns final data
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(finalResponse),
      });
      
      render(<NLTimesheetEntry />);
      // Initial input and process
      fireEvent.change(screen.getByLabelText(/describe your work/i), { target: { value: initialInput } });
      fireEvent.click(screen.getByRole('button', { name: /process input/i }));

      // Wait for clarification UI
      await waitFor(() => {
        expect(screen.getByText('Which website update project did you mean?')).toBeInTheDocument();
      });

      // Select an option and submit clarification
      fireEvent.click(screen.getByLabelText(/new portal update/i)); // Selects proj-2
      fireEvent.click(screen.getByRole('button', { name: /submit selection/i }));

      // Check if fetch was called correctly for the second time
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(2); // Called once for initial, once for clarification
        expect(fetch).toHaveBeenLastCalledWith('/api/process-timesheet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: initialInput, projectId: 'proj-2' }),
        });
      });
      
      // Check for final parsed data display
      await waitFor(() => {
        expect(screen.getByText('New Portal Update')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument(); // Hours
        expect(screen.getByText('Maintenance')).toBeInTheDocument(); // Task Type
      });
      expect(screen.queryByText('Which website update project did you mean?')).not.toBeInTheDocument(); // Clarification UI gone
    });
  });

  describe('Error Display', () => {
    it('displays API error message when fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue({ error: 'AI service is down' }),
      });

      render(<NLTimesheetEntry />);
      fireEvent.change(screen.getByLabelText(/describe your work/i), { target: { value: 'Test' } });
      fireEvent.click(screen.getByRole('button', { name: /process input/i }));

      await waitFor(() => {
        expect(screen.getByText('AI service is down')).toBeInTheDocument();
      });
    });

     it('displays error message when clarification selection is not made', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({
          result: {
            clarification_needed: true,
            clarification_question: 'Choose one',
            possible_options: [{ project_id: '1', project_name: 'Option 1' }],
          },
        }),
      });
      render(<NLTimesheetEntry />);
      fireEvent.change(screen.getByLabelText(/describe your work/i), { target: { value: "test" } });
      fireEvent.click(screen.getByRole('button', { name: /process input/i }));

      await waitFor(() => screen.getByText('Choose one'));
      fireEvent.click(screen.getByRole('button', { name: /submit selection/i }));
      
      expect(screen.getByText('Please select an option to proceed.')).toBeInTheDocument();
    });
  });

  describe('Submission to Supabase', () => {
    const finalParsedData = {
      project_id: 'proj-final',
      project_name: 'Final Project',
      job_number: 'JOB-FINAL',
      hours: 5,
      date: '2024-05-25',
      billable: true,
      description: 'Finalized all tasks.',
      task_type: 'Closure',
    };

    it('calls Supabase insert with correct data and navigates on success', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ result: finalParsedData }),
      });

      render(<NLTimesheetEntry />);
      fireEvent.change(screen.getByLabelText(/describe your work/i), { target: { value: 'Finalize tasks 5 hours' } });
      fireEvent.click(screen.getByRole('button', { name: /process input/i }));

      await waitFor(() => { // Wait for parsed data to be displayed
        expect(screen.getByText('Final Project')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByRole('button', { name: /save timesheet entry/i }));

      await waitFor(() => {
        expect(mockSupabaseInsert).toHaveBeenCalledWith([
          {
            project_id: finalParsedData.project_id,
            description: finalParsedData.description,
            hours: finalParsedData.hours,
            date: finalParsedData.date,
            billable: finalParsedData.billable,
            job_number: finalParsedData.job_number,
            task_type: finalParsedData.task_type,
          },
        ]);
      });
      expect(mockRouterPush).toHaveBeenCalledWith('/timesheet');
    });

    it('displays error if Supabase insert fails', async () => {
       (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ result: finalParsedData }),
      });
      mockSupabaseInsert.mockResolvedValueOnce({ error: { message: 'Supabase error' } });

      render(<NLTimesheetEntry />);
      fireEvent.change(screen.getByLabelText(/describe your work/i), { target: { value: 'Data for Supabase' } });
      fireEvent.click(screen.getByRole('button', { name: /process input/i }));

      await waitFor(() => screen.getByText('Final Project'));
      fireEvent.click(screen.getByRole('button', { name: /save timesheet entry/i }));

      await waitFor(() => {
        expect(screen.getByText('Supabase error')).toBeInTheDocument();
      });
    });
  });

  describe('Cancel Button Functionality', () => {
    it('clears parsed data and resets UI when "Cancel" is clicked after processing', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ result: { project_name: 'Test Project' } }),
      });
      render(<NLTimesheetEntry />);
      fireEvent.change(screen.getByLabelText(/describe your work/i), { target: { value: 'test' } });
      fireEvent.click(screen.getByRole('button', { name: /process input/i }));

      await waitFor(() => screen.getByText('Test Project'));
      fireEvent.click(screen.getByRole('button', { name: /edit \/ start over/i }));
      
      expect(screen.queryByText('Test Project')).not.toBeInTheDocument();
      expect(screen.getByLabelText(/describe your work/i)).toBeInTheDocument(); // Back to input UI
    });

    it('resets from clarification UI when "Cancel / Start Over" is clicked', async () => {
       (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({
          result: {
            clarification_needed: true,
            clarification_question: 'Choose project?',
            possible_options: [{project_id: '1', project_name: 'Proj 1'}],
          },
        }),
      });
      render(<NLTimesheetEntry />);
      fireEvent.change(screen.getByLabelText(/describe your work/i), { target: { value: 'test' } });
      fireEvent.click(screen.getByRole('button', { name: /process input/i }));

      await waitFor(() => screen.getByText('Choose project?'));
      fireEvent.click(screen.getByRole('button', { name: /cancel \/ start over/i }));

      expect(screen.queryByText('Choose project?')).not.toBeInTheDocument();
      expect(screen.getByLabelText(/describe your work/i)).toBeInTheDocument();
    });
  });
  
  describe('Voice Input', () => {
    it('updates textarea with transcript from speech recognition', async () => {
      render(<NLTimesheetEntry />);
      const micButton = screen.getByRole('button', { name: /mic/i });
      fireEvent.click(micButton);

      expect(mockSpeechRecognitionStart).toHaveBeenCalled();
      
      // Simulate speech recognition result
      const spokenText = 'Voice input test';
      act(() => {
        if (mockSpeechRecognitionInstance.onresult) {
          mockSpeechRecognitionInstance.onresult({ results: [[{ transcript: spokenText }]] });
        }
      });
      
      await waitFor(() => {
        expect(screen.getByLabelText(/describe your work/i)).toHaveValue(spokenText);
      });
    });

    it('handles speech recognition error', async () => {
      render(<NLTimesheetEntry />);
      fireEvent.click(screen.getByRole('button', { name: /mic/i }));
      
      act(() => {
         if (mockSpeechRecognitionInstance.onerror) {
          mockSpeechRecognitionInstance.onerror(new Event('error'));
        }
      });

      await waitFor(() => {
        expect(screen.getByText('Error recognizing speech. Please try again.')).toBeInTheDocument();
      });
    });
  });

});
