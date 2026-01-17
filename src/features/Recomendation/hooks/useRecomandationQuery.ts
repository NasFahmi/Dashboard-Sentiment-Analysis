import { recomendationKeys } from "@/shared/query_keys";
import { RecomendationRepository } from "../repository/Recomendation.repository";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { mapToRecomendation, type Recomendation, type RecomendationResponse } from "../types/recomendation";
export const useRecomandationQuery = (id: string) => {
  const repo = RecomendationRepository();
  const queryClient = useQueryClient();
  const query = useQuery<RecomendationResponse, Error, Recomendation>({
    queryKey: recomendationKeys.detail(id), // ✅ gunakan key terpusat
    queryFn: () => repo.getById(id),
    select: (response) => mapToRecomendation(response),
    enabled: !!id,
  });

  const setCache = (data: Recomendation) => {
    queryClient.setQueryData(recomendationKeys.detail(id), data);
  };

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: recomendationKeys.detail(id),
    });
  };

  const removeCache = () => {
    queryClient.removeQueries({
      queryKey: recomendationKeys.detail(id),
    });
  };

  return {
    ...query,
    setCache,
    invalidate,
    removeCache,
  };
};