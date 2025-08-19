import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VoiceCommandPanel } from './voice-command-panel';

// Mock SpeechRecognition
const mockStart = jest.fn();
const mockStop = jest.fn();
const mockRecognitionInstance = {
  start: mockStart,
  stop: mockStop,
  continuous: false,
  interimResults: false,
  onstart: jest.fn(),
  onresult: jest.fn(),
  onerror: jest.fn(),
  onend: jest.fn(),
};

const mockSpeechRecognition = jest.fn(() => mockRecognitionInstance);
const mockWebkitSpeechRecognition = jest.fn(() => mockRecognitionInstance);

let originalSpeechRecognition: any;
let originalWebkitSpeechRecognition: any;

beforeAll(() => {
  originalSpeechRecognition = (window as any).SpeechRecognition;
  originalWebkitSpeechRecognition = (window as any).webkitSpeechRecognition;
});

afterAll(() => {
  (window as any).SpeechRecognition = originalSpeechRecognition;
  (window as any).webkitSpeechRecognition = originalWebkitSpeechRecognition;
});

beforeEach(() => {
  // Reset mocks before each test
  jest.clearAllMocks();
  (window as any).SpeechRecognition = mockSpeechRecognition;
  (window as any).webkitSpeechRecognition = mockWebkitSpeechRecognition;

  // Reset instance event handlers by re-assigning them
  // because the same mockRecognitionInstance is reused.
  mockRecognitionInstance.onstart = jest.fn();
  mockRecognitionInstance.onresult = jest.fn();
  mockRecognitionInstance.onerror = jest.fn();
  mockRecognitionInstance.onend = jest.fn();
});

describe('VoiceCommandPanel', () => {
  const mockOnClose = jest.fn();
  const mockOnCommand = jest.fn();

  it('renders initial state correctly', () => {
    render(<VoiceCommandPanel onClose={mockOnClose} onCommand={mockOnCommand} />);
    expect(screen.getByText('Voice Commands')).toBeInTheDocument();
    expect(screen.getByText('Click to speak a command')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start voice command/i })).toBeEnabled();
  });

  it('handles browser not supporting SpeechRecognition API', () => {
    (window as any).SpeechRecognition = undefined;
    (window as any).webkitSpeechRecognition = undefined;

    render(<VoiceCommandPanel onClose={mockOnClose} onCommand={mockOnCommand} />);
    
    expect(screen.getByText('Voice recognition is not supported in your browser.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start voice command/i })).toBeDisabled();
  });

  describe('Successful Voice Recognition', () => {
    it('calls onCommand with trimmed, non-empty transcript for final result', async () => {
      render(<VoiceCommandPanel onClose={mockOnClose} onCommand={mockOnCommand} />);
      const micButton = screen.getByRole('button', { name: /start voice command/i });
      fireEvent.click(micButton);

      expect(mockSpeechRecognition).toHaveBeenCalledTimes(1);
      expect(mockStart).toHaveBeenCalledTimes(1);

      // Simulate onstart
      act(() => {
        mockRecognitionInstance.onstart();
      });
      expect(screen.getByText('Listening...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /stop listening/i })).toBeInTheDocument();

      // Simulate interim result
      const interimTranscript = 'Hello';
      act(() => {
        mockRecognitionInstance.onresult({
          results: [
            { isFinal: false, 0: { transcript: interimTranscript, confidence: 0.9 }, length: 1 }
          ],
          resultIndex: 0,
        } as unknown as SpeechRecognitionEvent);
      });
      expect(screen.getByText('Transcript:')).toBeInTheDocument();
      expect(screen.getByText(interimTranscript)).toBeInTheDocument();
      expect(mockOnCommand).not.toHaveBeenCalled(); // Should not be called for interim

      // Simulate final result
      const finalTranscript = 'Hello world';
      act(() => {
        mockRecognitionInstance.onresult({
          results: [
            // Can include the interim result as well, common in actual API behavior
            { isFinal: false, 0: { transcript: interimTranscript, confidence: 0.9 }, length: 1 },
            { isFinal: true, 0: { transcript: finalTranscript, confidence: 0.9 }, length: 1 }
          ],
          resultIndex: 1, // Assuming the last result is the one being processed for finality
        } as unknown as SpeechRecognitionEvent);
      });
      
      // The component should update to the final transcript.
      // If the component concatenates, it would be 'HelloHello world'.
      // The current implementation in VoiceCommandPanel re-calculates interim and final from event.results each time.
      // So, if the last result in the event.results array has isFinal = true, its transcript will be used.
      // Let's simulate a more realistic event where the final result is the only one or properly marked.
      // The component's logic:
      // for (let i = 0; i < event.results.length; ++i) {
      //   if (event.results[i].isFinal) { finalTranscript += event.results[i][0].transcript; } 
      //   else { interimTranscript += event.results[i][0].transcript; }
      // }
      // So, if a final result is present, it will be taken. If multiple final, they'd be concatenated.
      // For this test, a single final result is sufficient.

      act(() => {
        mockRecognitionInstance.onresult({
          results: [ // A single, final result
            { isFinal: true, 0: { transcript: finalTranscript, confidence: 0.9 }, length: 1 }
          ],
          // resultIndex: 0, // if only one result
        } as unknown as SpeechRecognitionEvent);
      });

      expect(screen.getByText(finalTranscript)).toBeInTheDocument();
      expect(mockOnCommand).toHaveBeenCalledTimes(1);
      expect(mockOnCommand).toHaveBeenCalledWith(finalTranscript);

      // Simulate onend
      act(() => {
        mockRecognitionInstance.onend();
      });
      expect(screen.getByText('Click to try again')).toBeInTheDocument(); 
      expect(screen.getByRole('button', { name: /start voice command/i })).toBeInTheDocument();
    });

    it('calls onCommand with trimmed transcript when final result has leading/trailing spaces', () => {
      render(<VoiceCommandPanel onClose={mockOnClose} onCommand={mockOnCommand} />);
      fireEvent.click(screen.getByRole('button', { name: /start voice command/i }));
      act(() => mockRecognitionInstance.onstart()); // Trigger listening state

      const transcriptWithSpaces = "  leading and trailing spaces  ";
      const expectedTranscript = "leading and trailing spaces";
      act(() => {
        mockRecognitionInstance.onresult({
          results: [ { isFinal: true, 0: { transcript: transcriptWithSpaces, confidence: 0.9 }, length: 1 } ],
        } as unknown as SpeechRecognitionEvent);
      });
      expect(mockOnCommand).toHaveBeenCalledWith(expectedTranscript);
    });

    it('does NOT call onCommand if the final transcript is empty', () => {
      render(<VoiceCommandPanel onClose={mockOnClose} onCommand={mockOnCommand} />);
      fireEvent.click(screen.getByRole('button', { name: /start voice command/i }));
      act(() => mockRecognitionInstance.onstart());

      act(() => {
        mockRecognitionInstance.onresult({
          results: [ { isFinal: true, 0: { transcript: "", confidence: 0.9 }, length: 1 } ],
        } as unknown as SpeechRecognitionEvent);
      });
      expect(mockOnCommand).not.toHaveBeenCalled();
    });

    it('does NOT call onCommand if the final transcript is whitespace-only', () => {
      render(<VoiceCommandPanel onClose={mockOnClose} onCommand={mockOnCommand} />);
      fireEvent.click(screen.getByRole('button', { name: /start voice command/i }));
      act(() => mockRecognitionInstance.onstart());
      
      act(() => {
        mockRecognitionInstance.onresult({
          results: [ { isFinal: true, 0: { transcript: "   ", confidence: 0.9 }, length: 1 } ],
        } as unknown as SpeechRecognitionEvent);
      });
      expect(mockOnCommand).not.toHaveBeenCalled();
    });
  });

  describe('Voice Recognition Errors', () => {
    it('handles "no-speech" error', () => {
      render(<VoiceCommandPanel onClose={mockOnClose} onCommand={mockOnCommand} />);
      fireEvent.click(screen.getByRole('button', { name: /start voice command/i }));

      act(() => {
        mockRecognitionInstance.onerror({ error: 'no-speech' } as SpeechRecognitionErrorEvent);
      });

      expect(screen.getByText('No speech detected. Please try again.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /start voice command/i })).toBeInTheDocument(); // Back to start state
      expect(mockOnCommand).not.toHaveBeenCalled();
    });

    it('handles "not-allowed" error', () => {
      render(<VoiceCommandPanel onClose={mockOnClose} onCommand={mockOnCommand} />);
      fireEvent.click(screen.getByRole('button', { name: /start voice command/i }));

      act(() => {
        mockRecognitionInstance.onerror({ error: 'not-allowed' } as SpeechRecognitionErrorEvent);
      });

      expect(screen.getByText('Microphone access denied. Please allow microphone access in your browser settings.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /start voice command/i })).toBeInTheDocument();
      expect(mockOnCommand).not.toHaveBeenCalled();
    });
    
    it('handles "audio-capture" error', () => {
      render(<VoiceCommandPanel onClose={mockOnClose} onCommand={mockOnCommand} />);
      fireEvent.click(screen.getByRole('button', { name: /start voice command/i }));

      act(() => {
        mockRecognitionInstance.onerror({ error: 'audio-capture' } as SpeechRecognitionErrorEvent);
      });

      expect(screen.getByText('Audio capture error. Please check microphone permissions.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /start voice command/i })).toBeInTheDocument();
      expect(mockOnCommand).not.toHaveBeenCalled();
    });
  });

  describe('Manual Stop Listening', () => {
    it('stops listening when mic button is clicked while listening', () => {
      render(<VoiceCommandPanel onClose={mockOnClose} onCommand={mockOnCommand} />);
      const micButton = screen.getByRole('button', { name: /start voice command/i });
      
      // Start listening
      fireEvent.click(micButton);
      act(() => {
        mockRecognitionInstance.onstart();
      });
      expect(screen.getByText('Listening...')).toBeInTheDocument();
      
      // Stop listening by clicking the same button (now a stop button)
      const stopButton = screen.getByRole('button', { name: /stop listening/i });
      fireEvent.click(stopButton);

      expect(mockStop).toHaveBeenCalledTimes(1);
      // The onend event should be triggered by recognition.stop() internally or by the component
      // For this test, we assume setIsListening(false) is called directly in handleStopListening
      // or onend is called.
      // If onend is not called by stop(), then we should test the state directly.
      // The component's handleStopListening calls setIsListening(false) directly.
      expect(screen.queryByText('Listening...')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /start voice command/i })).toBeInTheDocument();
    });
  });
});
