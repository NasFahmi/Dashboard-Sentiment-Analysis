// Scraper.repository.tsx

import axiosClient from "@/lib/axios";
import type { ScraperResponse } from "../types/scraper";

export const ScraperRepository = () => ({
  get: async (): Promise<ScraperResponse> => {
    const response = await axiosClient.get<ScraperResponse>(
      "/scrapper"
    );
    return response.data;
  },
  analyzeById: async (id: string): Promise<ScraperResponse> => {
    const response = await axiosClient.post<ScraperResponse>(
      `/scrapper/${id}`
    );
    return response.data;
  },
});
