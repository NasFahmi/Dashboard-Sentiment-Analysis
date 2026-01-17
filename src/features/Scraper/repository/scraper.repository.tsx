/* eslint-disable @typescript-eslint/no-explicit-any */
// Scraper.repository.tsx

import axiosClient from "@/lib/axios";
import type { ScraperDeleteResponse, ScraperResponse } from "../types/scraper";
import type { AnalyzeABSAResponse } from "../types/absa";

export const ScraperRepository = () => ({

  get: async (): Promise<ScraperResponse> => {
    try {
      const response = await axiosClient.get<ScraperResponse>(
        "/scraping/results"
      );
      console.log('Get response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },
  // analyze absa by id
  analyzeById: async (id: string): Promise<AnalyzeABSAResponse> => {
    try {
      const response = await axiosClient.post<AnalyzeABSAResponse>(
        `/absa/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },
  downloadCSVById: async (id: string): Promise<Blob> => {
    try {
      const response = await axiosClient.get(
        `/scraping/results/${id}/download/csv`,
        { responseType: "blob" }
      );
      return response.data;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },
  downloadExcelById: async (id: string): Promise<Blob> => {
    try {
      const response = await axiosClient.get(
        `/scraping/results/${id}/download/excel`,
        { responseType: "blob" }
      );
      return response.data;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },


  deleteById: async (id: string): Promise<ScraperDeleteResponse> => {
    console.log('Deleting scraper with ID:', id);
    try {
      const response = await axiosClient.delete<ScraperDeleteResponse>(
        `/scraping/results/${id}`
      );
      console.log('Delete response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  },
});
