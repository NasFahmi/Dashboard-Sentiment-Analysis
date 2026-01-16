import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ScraperRepository } from "../repository/scraper.repository.tsx1";
import { mapToScraper, type Scraper } from "../types/scraper";
import type { ScraperResponse } from "../types/scraper";

export const SCRAPER_QUERY_KEY = ["scrapper"];

export const useScraperQuery = () => {
  const repo = ScraperRepository();
  const queryClient = useQueryClient();

  const query = useQuery<ScraperResponse, Error, Scraper[]>({
    queryKey: SCRAPER_QUERY_KEY,
    queryFn: () => repo.get(),
    select: (data) => mapToScraper(data.data),
  });

  // =========================
  // Manual cache operations
  // =========================

  const setCache = (data: Scraper[]) => {
    queryClient.setQueryData(SCRAPER_QUERY_KEY, data);
  };

  const updateOne = (updated: Scraper) => {
    queryClient.setQueryData<Scraper[]>(SCRAPER_QUERY_KEY, (old) => {
      if (!old) return old;
      return old.map((item) =>
        item.id === updated.id ? updated : item
      );
    });
  };

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: SCRAPER_QUERY_KEY,
    });
  };

  const removeCache = () => {
    queryClient.removeQueries({
      queryKey: SCRAPER_QUERY_KEY,
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
