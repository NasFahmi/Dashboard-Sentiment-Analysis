// recomendation.repository.tsx

import type { RecomendationResponse } from "../types/recomendation";
import { axiosClient } from "@/lib/axios";


export const RecomendationRepository = () => ({

  getById: async (id: string): Promise<RecomendationResponse> => {
    try {
      const response = await axiosClient.get<RecomendationResponse>(
        `/absa/${id}/recommendation`
      );
      console.log('Get recomendation response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },
})