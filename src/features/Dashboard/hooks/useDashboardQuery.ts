import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { recomendationKeys, sentimentKeys } from "@/shared/query_keys";

// Repositories
import { RecomendationRepository } from "@/features/Recomendation/repository/recomendation.repository";
import { SentimentRepository } from "@/features/Sentiment/repository/sentiment.repository";

// Types & Mappers
import type { RecomendationResponse } from "@/features/Recomendation/types/recomendation";
import type { SentimentResponse } from "@/features/Sentiment/types/sentiment";
import { mapToRecomendation } from "@/features/Recomendation/types/recomendation";
import { mapToSentiment } from "@/features/Sentiment/types/sentiment";
import { mapToDashboard, type Dashboard } from "../types/dasboard";

export const useDashboardQuery = (datasetId: string) => {
  const AbsaRepo = SentimentRepository();
  const RecomendationRepo = RecomendationRepository();

  const absaQuery = useQuery<SentimentResponse>({
    queryKey: sentimentKeys.detail(datasetId),
    queryFn: () => AbsaRepo.getById(datasetId),
    enabled: !!datasetId,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const recommendationQuery = useQuery<RecomendationResponse>({
    queryKey: recomendationKeys.detail(datasetId),
    queryFn: () => RecomendationRepo.getById(datasetId),
    enabled: !!datasetId && absaQuery.isSuccess,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const dashboard = useMemo<Dashboard | undefined>(() => {
    if (!absaQuery.data) return undefined;

    const absaEntity = mapToSentiment(absaQuery.data);

    let recEntity = undefined;
    if (recommendationQuery.data) {
      recEntity = mapToRecomendation(recommendationQuery.data);
    }

    return mapToDashboard(absaEntity, recEntity);

  }, [absaQuery.data, recommendationQuery.data]);

  return {
    data: dashboard,
    isLoading: absaQuery.isLoading,
    isError: absaQuery.isError,
    error: absaQuery.error,
    isFetching: absaQuery.isFetching || recommendationQuery.isFetching,
  };
};