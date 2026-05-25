export interface ChatbotPayload {
  question: string;
}


export interface ChatbotResponse {
  message: string;
  data: string;
}


// Types
export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  error?: boolean;
}
