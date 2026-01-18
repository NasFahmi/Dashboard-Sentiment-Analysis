
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SentimentRepository } from "../repository/sentiment.repository";
import { type SentimentResponse, type Sentiment } from "../types/sentiment";
import { sentimentKeys } from "@/shared/query_keys";
import { mapToSentiment } from "../types/sentiment";
export const useSentimentQuery = (id: string) => {
  const repo = SentimentRepository();
  const queryClient = useQueryClient();
  const query = useQuery<SentimentResponse, Error, Sentiment>({
    queryKey: sentimentKeys.detail(id), // ✅ gunakan key terpusat
    queryFn: () => repo.getById(id),
    select: (response) => mapToSentiment(response),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 menit
    gcTime: 30 * 60 * 1000,   // 30 menit
    refetchOnMount: false,
    refetchOnWindowFocus: false,

  });

  const setCache = (data: Sentiment) => {
    queryClient.setQueryData(sentimentKeys.detail(id), data);
  };

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: sentimentKeys.detail(id),
    });
  };

  const removeCache = () => {
    queryClient.removeQueries({
      queryKey: sentimentKeys.detail(id),
    });
  };

  return {
    ...query,
    setCache,
    invalidate,
    removeCache,
  };
};