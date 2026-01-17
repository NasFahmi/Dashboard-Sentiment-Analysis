import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ScraperRepository } from "../repository/scraper.repository";
import { mapToScraper, type Scraper } from "../types/scraper";
import type { ScraperResponse } from "../types/scraper";
import { scraperKeys } from "@/shared/query_keys";
import { useAuth } from "@/hooks/useAuth";

export const useScraperQuery = () => {
  const repo = ScraperRepository();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const query = useQuery<ScraperResponse, Error, Scraper[]>({
    queryKey: scraperKeys.list(),
    queryFn: () => repo.get(),
    select: (response) => mapToScraper(response.data),

    staleTime: 5 * 60 * 1000, // 5 menit
    gcTime: 30 * 60 * 1000,   // 30 menit
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isAuthenticated,
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
