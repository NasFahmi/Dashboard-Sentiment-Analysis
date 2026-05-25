import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScraperRepository } from "../repository/scraper.repository";
import { scraperKeys } from "@/shared/query_keys";
import { toast } from "sonner";

export const useHandleAnalysis = () => {
  const repo = ScraperRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => repo.analyzeById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scraperKeys.list(),
      });
      toast.success("Berhasil menganalisa Data");
    },
    onError: () => {
      toast.error("Gagal menganalisis Data");
    },
  });
};