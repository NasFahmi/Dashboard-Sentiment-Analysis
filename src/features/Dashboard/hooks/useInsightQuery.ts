import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_SENTIMENT_DASHBOARD } from "@/lib/local-storage";
import { insightKeys } from "@/shared/query_keys";
import type { CachedInsight, InsightResponse } from "../types/insight";
import { DashboardRepository } from "../repository/dashboard.repository";

// Helpers
const getLocalStorageCache = (id: string): CachedInsight | null => {
  try {
    const cached = localStorage.getItem(`${CACHE_KEY_SENTIMENT_DASHBOARD}_${id}`);
    if (!cached) return null;
    return JSON.parse(cached);
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    localStorage.removeItem(`${CACHE_KEY_SENTIMENT_DASHBOARD}_${id}`);
    return null;
  }
};

const setLocalStorageCache = (id: string, data: InsightResponse): void => {
  try {
    const now = Date.now();
    const cacheData: CachedInsight = {
      data,
      timestamp: now,
      expiresAt: 0,
    };
    localStorage.setItem(`${CACHE_KEY_SENTIMENT_DASHBOARD}_${id}`, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const clearInsightCache = (id: string): void => {
  try {
    localStorage.removeItem(`${CACHE_KEY_SENTIMENT_DASHBOARD}_${id}`);
  } catch (error) {
    console.error("Error clearing insights cache:", error);
  }
};

export const useInsightQuery = (id: string) => {
  const queryClient = useQueryClient();
  const queryKey = insightKeys.detail(id);
  const repo = DashboardRepository();

  const query = useQuery<InsightResponse>({
    queryKey,
    queryFn: async () => {
      if (!id) throw new Error("Dataset ID is required");

      // Check localStorage first
      const cached = getLocalStorageCache(id);
      if (cached) {
        return cached.data;
      }

      // Fetch API
      const freshData = await repo.getInsights(id);
      setLocalStorageCache(id, freshData);
      return freshData;
    },
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const refresh = async () => {
    if (!id) return;
    // Clear cache first so the next fetch hits the API
    clearInsightCache(id);
    // Invalidate and refetch
    return query.refetch();
  };

  const clearCache = () => {
    if (!id) return;
    clearInsightCache(id);
    queryClient.removeQueries({ queryKey });
  };

  // Helper to check if we have data in LS
  const hasLocalCache = !!getLocalStorageCache(id);

  return {
    ...query,
    refresh,
    clearCache,
    hasLocalCache
  };
};
