// Dashboard.repository.tsx

import axiosClient from "@/lib/axios";
import type { InsightResponse } from "../types/insight";
import type { ChatbotPayload, ChatbotResponse } from "../types/chatbot";


export const DashboardRepository = () => ({

  getInsights: async (id: string): Promise<InsightResponse> => {
    try {
      const response = await axiosClient.get<InsightResponse>(
        `/rag/insights/${id}`
      );
      console.log('Get sentiment response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },
  postChatbot: async (id: string, payload: ChatbotPayload): Promise<ChatbotResponse> => {
    try {
      const response = await axiosClient.post<ChatbotResponse>(
        `/rag/query/${id}`,
        payload
      );
      console.log('Post chatbot response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Post chatbot error:', error);
      throw error;
    }
  },
})