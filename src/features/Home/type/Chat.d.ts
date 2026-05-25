
// Types
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  sources?: string[];
  isLoading?: boolean;
  error?: boolean;
}

interface ChatRequest {
  question: string;
}

interface ChatResponse {
  answer: string;
  sources: string[];
}