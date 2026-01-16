import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SCRAPER_QUERY_KEY } from "./useScraperQuery";
import { ScraperRepository } from "../repository/scraper.repository.tsx1";
import type { Scraper } from "../types/scraper";

export const useScraperMutation = () => {
  const repo = ScraperRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => repo.analyzeById(id),

    // =========================
    // OPTIMISTIC UPDATE
    // =========================
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: SCRAPER_QUERY_KEY,
      });

      const previousData =
        queryClient.getQueryData<Scraper[]>(SCRAPER_QUERY_KEY);

      queryClient.setQueryData<Scraper[]>(
        SCRAPER_QUERY_KEY,
        (old) =>
          old?.map((item) =>
            item.id === id
              ? { ...item, is_analyzed: true }
              : item
          ) ?? []
      );

      return { previousData };
    },

    // =========================
    // ROLLBACK JIKA ERROR
    // =========================
    onError: (_error, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          SCRAPER_QUERY_KEY,
          context.previousData
        );
      }
    },

    // =========================
    // FINAL SYNC
    // =========================
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: SCRAPER_QUERY_KEY,
      });
    },
  });
};
