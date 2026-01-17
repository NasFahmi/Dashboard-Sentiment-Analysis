import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ScraperRepository } from "../repository/scraper.repository";
import { mapToScraper, type Scraper } from "../types/scraper";
import type { ScraperResponse } from "../types/scraper";
import { scraperKeys } from "@/shared/query_keys";

export const useScraperQuery = () => {
  const repo = ScraperRepository();
  const queryClient = useQueryClient();

  const query = useQuery<ScraperResponse, Error, Scraper[]>({
    queryKey: scraperKeys.list(),
    queryFn: () => repo.get(),
    select: (response) => mapToScraper(response.data),

    staleTime: 20 * 1000, //20 detik
    gcTime: 30 * 1000,//30  detik
  });

  // =========================
  // CACHE OPERATIONS
  // =========================

  const setCache = (data: Scraper[]) => {
    queryClient.setQueryData(scraperKeys.list(), data);
  };

  const updateOne = (updated: Scraper) => {
    queryClient.setQueryData<Scraper[]>(
      scraperKeys.list(),
      (old = []) =>
        old.map((item) =>
          item.id === updated.id ? updated : item
        )
    );
  };

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: scraperKeys.list(),
    });
  };

  const removeCache = () => {
    queryClient.removeQueries({
      queryKey: scraperKeys.list(),
    });
  };

  return {
    ...query,
    setCache,
    updateOne,
    invalidate,
    removeCache,
  };
};
