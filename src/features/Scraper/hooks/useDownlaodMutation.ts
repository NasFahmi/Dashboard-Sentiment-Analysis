// hooks/useDownloadMutation.ts
import { useMutation } from "@tanstack/react-query";
import { ScraperRepository } from "../repository/scraper.repository";

export const useDownloadMutation = () => {
  const repo = ScraperRepository();

  // Satu mutasi, tapi kita bisa lacak ID-nya via onSuccess/onError
  const downloadCSV = useMutation({
    mutationFn: (id: string) => repo.downloadCSVById(id),
  });

  const downloadExcel = useMutation({
    mutationFn: (id: string) => repo.downloadExcelById(id),
  });

  return { downloadCSV, downloadExcel };
};