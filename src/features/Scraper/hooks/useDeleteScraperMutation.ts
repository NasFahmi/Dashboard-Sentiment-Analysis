import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScraperRepository } from "../repository/scraper.repository";
import { scraperKeys } from "@/shared/query_keys";
import type { ScraperResponse } from "../types/scraper";

export const useDeleteScraperMutation = () => {
  const repo = ScraperRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => repo.deleteById(id),

    // =========================
    // OPTIMISTIC UPDATE
    // =========================
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: scraperKeys.list(),
      });

      const previousData =
        queryClient.getQueryData<ScraperResponse>(scraperKeys.list());

      if (previousData) {
        queryClient.setQueryData<ScraperResponse>(scraperKeys.list(), {
          ...previousData,
          data: previousData.data.filter((item) => item.id !== id),
        });
      }

      return { previousData };
    },

    // =========================
    // ROLLBACK
    // =========================
    onError: (_error, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          scraperKeys.list(),
          context.previousData
        );
      }
    },

    // =========================
    // FINAL SYNC
    // =========================
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: scraperKeys.list(),
      });
    },
  });
};
