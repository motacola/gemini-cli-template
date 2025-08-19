import { POST } from './route'; // Adjust the path as necessary
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '@/lib/logger'; // Assuming logger is importable

// Mock logger to prevent actual logging during tests and allow assertions
jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

// Mock @supabase/auth-helpers-nextjs
const mockSupabaseFrom = jest.fn().mockReturnThis();
const mockSupabaseSelect = jest.fn();
const mockSupabaseEq = jest.fn().mockReturnThis();
const mockSupabaseOrder = jest.fn().mockReturnThis();
const mockSupabaseLimit = jest.fn();

const mockSupabaseClient = {
  auth: {
    getUser: jest.fn(),
  },
  from: mockSupabaseFrom,
  // select, eq, order, limit will be chained from 'from'
};
mockSupabaseFrom.mockImplementation(() => ({
    select: mockSupabaseSelect.mockReturnThis(), // Keep returning 'this' if more chains
    eq: mockSupabaseEq.mockReturnThis(),
    order: mockSupabaseOrder.mockReturnThis(),
    limit: mockSupabaseLimit,
}));


jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createRouteHandlerClient: jest.fn(() => mockSupabaseClient),
}));


// Mock @google/generative-ai
const mockGenerateContent = jest.fn();
const mockGetGenerativeModel = jest.fn(() => ({
  generateContent: mockGenerateContent,
}));
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn(() => ({
    getGenerativeModel: mockGetGenerativeModel,
  })),
  HarmCategory: {
    HARM_CATEGORY_HARASSMENT: 'HARM_CATEGORY_HARASSMENT',
    HARM_CATEGORY_HATE_SPEECH: 'HARM_CATEGORY_HATE_SPEECH',
    HARM_CATEGORY_SEXUALLY_EXPLICIT: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    HARM_CATEGORY_DANGEROUS_CONTENT: 'HARM_CATEGORY_DANGEROUS_CONTENT',
  },
  HarmBlockThreshold: {
    BLOCK_MEDIUM_AND_ABOVE: 'BLOCK_MEDIUM_AND_ABOVE',
  },
}));

describe('/api/process-timesheet POST', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    jest.clearAllMocks();
    originalEnv = process.env; // Backup original process.env
    process.env = { ...originalEnv, GEMINI_API_KEY: 'test-api-key' }; // Set default API key

    // Default mock implementations
    (cookies as jest.Mock).mockReturnValue({ get: jest.fn() }); // Mock cookies
    (createRouteHandlerClient as jest.Mock).mockReturnValue(mockSupabaseClient);
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: { id: 'test-user-id', email: 'test@example.com' } },
      error: null,
    });
    // Reset chained Supabase calls for flexibility in tests
    // Default for projects fetch
    mockSupabaseSelect.mockImplementation((query) => {
        if (query.includes("clients (name)")) { // projects query
            return { data: mockProjects, error: null };
        }
        return { data: [], error: null }; // Default empty
    });
    // Default for recent entries fetch
    mockSupabaseLimit.mockResolvedValue({ data: mockRecentEntries, error: null });
  });

  afterEach(() => {
    process.env = originalEnv; // Restore original process.env
  });

  const mockProjects = [
    { id: 'proj-1', name: 'Project Alpha', job_number: 'JOB-001', clients: { name: 'Client A' } },
    { id: 'proj-2', name: 'Project Beta', job_number: 'JOB-002', clients: { name: 'Client B' } },
  ];
  const mockRecentEntries = [
    { id: 'entry-1', description: 'Did something for Alpha', hours: 2, date: '2024-05-23', projects: mockProjects[0] },
  ];

  function createMockRequest(body: any, headers?: Record<string, string>): NextRequest {
    const defaultHeaders = { 'x-request-id': 'test-req-id', ...headers };
    return {
      json: jest.fn().mockResolvedValue(body),
      headers: new Headers(defaultHeaders),
      method: 'POST',
      url: 'http://localhost/api/process-timesheet',
    } as unknown as NextRequest;
  }

  describe('Successful Processing', () => {
    it('should process valid input and return parsed data from Gemini', async () => {
      const mockGeminiResponse = {
        project_id: 'proj-1',
        project_name: 'Project Alpha',
        job_number: 'JOB-001',
        hours: 3,
        date: '2024-05-24',
        billable: true,
        description: 'Worked on Project Alpha for 3 hours.',
        task_type: 'Development',
      };
      mockGenerateContent.mockResolvedValue({
        response: { text: () => JSON.stringify(mockGeminiResponse) },
      });
      
      // Ensure Supabase mocks are set for this specific path if default isn't enough
      mockSupabaseFrom.mockImplementation((tableName) => {
        if (tableName === 'projects') {
            return { select: jest.fn().mockResolvedValue({ data: mockProjects, error: null }) };
        }
        if (tableName === 'timesheet_entries') {
            return { 
                select: jest.fn().mockReturnThis(), 
                eq: jest.fn().mockReturnThis(), 
                order: jest.fn().mockReturnThis(), 
                limit: jest.fn().mockResolvedValue({data: mockRecentEntries, error: null})
            };
        }
        return { select: jest.fn().mockResolvedValue({ data: [], error: null }) }; // default empty
      });


      const request = createMockRequest({ input: '3 hours on Project Alpha today' });
      const response = await POST(request);
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody.result).toEqual(expect.objectContaining(mockGeminiResponse));
      expect(mockGenerateContent).toHaveBeenCalledTimes(1);
      
      // Snapshot the prompt for verification (optional, but good for complex prompts)
      // The prompt is the first argument to generateContent
      expect(mockGenerateContent).toHaveBeenCalled();
      const promptArg = mockGenerateContent.mock.calls[0][0];
      if (promptArg) {
        expect(promptArg.toString()).toContain('User Input: "3 hours on Project Alpha today"');
        expect(promptArg).toContain('ID: proj-1, Name: Project Alpha');
      }
    });
  });

  describe('Clarification Flow', () => {
    it('should return clarification data if Gemini indicates it', async () => {
      const mockClarificationResponse = {
        clarification_needed: true,
        clarification_question: 'Which Alpha project?',
        possible_options: [{ project_id: 'proj-1', project_name: 'Project Alpha' }],
      };
      mockGenerateContent.mockResolvedValue({
        response: { text: () => JSON.stringify(mockClarificationResponse) },
      });
        mockSupabaseFrom.mockImplementation((tableName) => {
        if (tableName === 'projects') {
            return { select: jest.fn().mockResolvedValue({ data: mockProjects, error: null }) };
        }
        if (tableName === 'timesheet_entries') {
            return { 
                select: jest.fn().mockReturnThis(), 
                eq: jest.fn().mockReturnThis(), 
                order: jest.fn().mockReturnThis(), 
                limit: jest.fn().mockResolvedValue({data: mockRecentEntries, error: null})
            };
        }
        return { select: jest.fn().mockResolvedValue({ data: [], error: null }) }; 
      });

      const request = createMockRequest({ input: 'Work on Alpha' });
      const response = await POST(request);
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody.result).toEqual(mockClarificationResponse);
    });

    it('should handle follow-up request with projectId for clarification', async () => {
      const finalResponse = { project_id: 'proj-1', hours: 5, description: 'Clarified work on Alpha' };
      mockGenerateContent.mockResolvedValueOnce({ // For the second call
        response: { text: () => JSON.stringify(finalResponse) },
      });
       mockSupabaseFrom.mockImplementation((tableName) => {
        if (tableName === 'projects') {
            return { select: jest.fn().mockResolvedValue({ data: mockProjects, error: null }) };
        }
        if (tableName === 'timesheet_entries') {
            return { 
                select: jest.fn().mockReturnThis(), 
                eq: jest.fn().mockReturnThis(), 
                order: jest.fn().mockReturnThis(), 
                limit: jest.fn().mockResolvedValue({data: mockRecentEntries, error: null})
            };
        }
        return { select: jest.fn().mockResolvedValue({ data: [], error: null }) }; 
      });

      // First call (simulated, not tested here, assume it led to clarification)
      // Second call with projectId
      const request = createMockRequest({ input: 'Work on Alpha', projectId: 'proj-1' });
      const response = await POST(request);
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody.result).toEqual(expect.objectContaining(finalResponse));
      expect(mockGenerateContent).toHaveBeenCalledTimes(1); // Only the second call in this test scope
      const promptArgFollowUp = mockGenerateContent.mock.calls[0][0];
      if (promptArgFollowUp) {
        expect(promptArgFollowUp.toString()).toContain('User has pre-selected Project ID: "proj-1"');
      }
    });
  });

  describe('Error Handling', () => {
    it('should return 500 if API key is missing', async () => {
      delete process.env.GEMINI_API_KEY;
      const request = createMockRequest({ input: 'Test input' });
      const response = await POST(request);
      const responseBody = await response.json();

      expect(response.status).toBe(500);
      expect(responseBody.error).toBe('AI service not configured. Missing API key.');
    });

    it('should return 500 if Supabase projects fetch fails', async () => {
      mockSupabaseFrom.mockImplementation((tableName) => {
        if (tableName === 'projects') {
            return { select: jest.fn().mockResolvedValue({ data: null, error: new Error('Supabase DB error') }) };
        }
         if (tableName === 'timesheet_entries') { // Still need to mock this path
            return { 
                select: jest.fn().mockReturnThis(), 
                eq: jest.fn().mockReturnThis(), 
                order: jest.fn().mockReturnThis(), 
                limit: jest.fn().mockResolvedValue({data: mockRecentEntries, error: null})
            };
        }
        return { select: jest.fn().mockResolvedValue({ data: [], error: null }) };
      });
      
      const request = createMockRequest({ input: 'Test input' });
      const response = await POST(request);
      const responseBody = await response.json();

      expect(response.status).toBe(500);
      expect(responseBody.error).toBe('Failed to fetch projects');
    });
    
    it('should proceed without recent entries if Supabase recent entries fetch fails', async () => {
      // Projects fetch is fine
       mockSupabaseFrom.mockImplementation((tableName) => {
        if (tableName === 'projects') {
            return { select: jest.fn().mockResolvedValue({ data: mockProjects, error: null }) };
        }
        if (tableName === 'timesheet_entries') { // This one fails
            return { 
                select: jest.fn().mockReturnThis(), 
                eq: jest.fn().mockReturnThis(), 
                order: jest.fn().mockReturnThis(), 
                limit: jest.fn().mockResolvedValue({data: null, error: new Error('Recent entries error')})
            };
        }
        return { select: jest.fn().mockResolvedValue({ data: [], error: null }) };
      });

      const mockGeminiResponse = { project_id: 'proj-1', description: 'Test' };
      mockGenerateContent.mockResolvedValue({ response: { text: () => JSON.stringify(mockGeminiResponse) } });

      const request = createMockRequest({ input: 'Test input' });
      const response = await POST(request);
      expect(response.status).toBe(200); // Should still succeed
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to fetch recent entries from Supabase", 
        expect.any(Error), 
        expect.anything()
      );
      const promptArg = mockGetGenerativeModel.mock.calls[0][0].generationConfig !== undefined ? mockGenerateContent.mock.calls[0][0] : undefined;
      if (promptArg) {
        expect(promptArg.toString()).toContain('Recent Timesheet Entries (for context on typical work):\n      No recent entries.');
      }
    });

    it('should return 500 if Gemini API call fails', async () => {
      mockGenerateContent.mockRejectedValue(new Error('Gemini API error'));
       mockSupabaseFrom.mockImplementation((tableName) => {
        if (tableName === 'projects') {
            return { select: jest.fn().mockResolvedValue({ data: mockProjects, error: null }) };
        }
        if (tableName === 'timesheet_entries') {
            return { 
                select: jest.fn().mockReturnThis(), 
                eq: jest.fn().mockReturnThis(), 
                order: jest.fn().mockReturnThis(), 
                limit: jest.fn().mockResolvedValue({data: mockRecentEntries, error: null})
            };
        }
        return { select: jest.fn().mockResolvedValue({ data: [], error: null }) };
      });

      const request = createMockRequest({ input: 'Test input' });
      const response = await POST(request);
      const responseBody = await response.json();

      expect(response.status).toBe(500);
      expect(responseBody.error).toBe('An unexpected error occurred');
    });

    it('should return 500 if Gemini response is not JSON', async () => {
      mockGenerateContent.mockResolvedValue({ response: { text: () => 'This is not JSON' } });
       mockSupabaseFrom.mockImplementation((tableName) => {
        if (tableName === 'projects') {
            return { select: jest.fn().mockResolvedValue({ data: mockProjects, error: null }) };
        }
        if (tableName === 'timesheet_entries') {
            return { 
                select: jest.fn().mockReturnThis(), 
                eq: jest.fn().mockReturnThis(), 
                order: jest.fn().mockReturnThis(), 
                limit: jest.fn().mockResolvedValue({data: mockRecentEntries, error: null})
            };
        }
        return { select: jest.fn().mockResolvedValue({ data: [], error: null }) };
      });

      const request = createMockRequest({ input: 'Test input' });
      const response = await POST(request);
      const responseBody = await response.json();

      expect(response.status).toBe(500);
      expect(responseBody.error).toBe('AI returned invalid data format.');
    });
    
    it('should return 500 if Gemini response is JSON but wrapped in markdown and still invalid', async () => {
      mockGenerateContent.mockResolvedValue({ response: { text: () => '```json\nthis is not valid json inside markdown\n```' } });
       mockSupabaseFrom.mockImplementation((tableName) => {
        if (tableName === 'projects') {
            return { select: jest.fn().mockResolvedValue({ data: mockProjects, error: null }) };
        }
        if (tableName === 'timesheet_entries') {
            return { 
                select: jest.fn().mockReturnThis(), 
                eq: jest.fn().mockReturnThis(), 
                order: jest.fn().mockReturnThis(), 
                limit: jest.fn().mockResolvedValue({data: mockRecentEntries, error: null})
            };
        }
        return { select: jest.fn().mockResolvedValue({ data: [], error: null }) };
      });

      const request = createMockRequest({ input: 'Test input' });
      const response = await POST(request);
      const responseBody = await response.json();

      expect(response.status).toBe(500);
      expect(responseBody.error).toBe('AI returned invalid data format after markdown strip.');
    });


    it('should return 422 if AI response is valid JSON but missing essential project info', async () => {
      const mockInvalidResponse = { hours: 2, description: 'Forgot project' }; // No project_id or project_name
      mockGenerateContent.mockResolvedValue({ response: { text: () => JSON.stringify(mockInvalidResponse) } });
       mockSupabaseFrom.mockImplementation((tableName) => {
        if (tableName === 'projects') {
            return { select: jest.fn().mockResolvedValue({ data: mockProjects, error: null }) };
        }
        if (tableName === 'timesheet_entries') {
            return { 
                select: jest.fn().mockReturnThis(), 
                eq: jest.fn().mockReturnThis(), 
                order: jest.fn().mockReturnThis(), 
                limit: jest.fn().mockResolvedValue({data: mockRecentEntries, error: null})
            };
        }
        return { select: jest.fn().mockResolvedValue({ data: [], error: null }) };
      });

      const request = createMockRequest({ input: 'Test input' });
      const response = await POST(request);
      const responseBody = await response.json();

      expect(response.status).toBe(422);
      expect(responseBody.error).toBe('AI could not determine the project.');
    });

    it('should return 400 if input is missing in request body', async () => {
      const request = createMockRequest({ projectId: 'proj-1' }); // Missing 'input'
      const response = await POST(request);
      const responseBody = await response.json();

      expect(response.status).toBe(400);
      expect(responseBody.error).toBe('Input is required');
    });
    
    it('should return 400 if request body is not valid JSON', async () => {
      const request = {
        headers: new Headers({ 'x-request-id': 'test-req-id' }),
        json: jest.fn().mockRejectedValue(new Error("Failed to parse")),
        method: 'POST',
        url: 'http://localhost/api/process-timesheet',
      } as unknown as NextRequest;
      const response = await POST(request);
      const responseBody = await response.json();

      expect(response.status).toBe(400);
      expect(responseBody.error).toBe('Invalid request body');
    });

    it('should return 401 if user authentication fails', async () => {
        mockSupabaseClient.auth.getUser.mockResolvedValueOnce({ data: { user: null }, error: new Error("Auth error") });
        const request = createMockRequest({ input: 'Test input' });
        const response = await POST(request);
        const responseBody = await response.json();

        expect(response.status).toBe(401);
        expect(responseBody.error).toBe('Authentication required');
    });

  });
});
