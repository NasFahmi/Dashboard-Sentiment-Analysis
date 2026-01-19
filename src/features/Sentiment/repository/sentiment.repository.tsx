// Sentiment.repository.tsx


// import type { RecomendationResponse } from "../types/recomendation";
import { axiosClient } from "@/lib/axios";
import type { SentimentResponse } from "../types/sentiment";


export const SentimentRepository = () => ({

  getById: async (id: string): Promise<SentimentResponse> => {
    try {
      const response = await axiosClient.get<SentimentResponse>(
        `/absa/${id}`
      );
      console.log('Get sentiment response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },
})