import { parseDate } from "@/helper/parseDate";

// inteface response
export interface RecomendationResponse {
  message: string;
  data: Data;
}

export interface Data {
  id: string;
  created_at: Date;
  content_strategy: string;
  recommendationCaptions: RecommendationCaptions[];
  recommendationHastags: RecommendationHastags[];
  recommendationBestPostings: RecommendationBestPosting[];
}

export interface RecommendationBestPosting {
  id: string;
  created_at: Date | null | string;
  updated_at: null | string | Date;
  time: string;
  day: string;
  reason: string;
  engagement_potential: string;
  best_content: string;
}
export interface RecommendationCaptions {
  id: string;
  created_at: Date | null | string;
  updated_at: null | string | Date;
  caption: string;
}
export interface RecommendationHastags {
  id: string;
  created_at: Date | null | string;
  updated_at: null | string | Date;
  hashtag: string;
}



//interface Entity
export interface Recomendation {
  id: string;
  created_at: Date;
  content_strategy: string;
  recommendationCaptions: RecommendationCaptionsEntity[];
  recommendationHastags: RecommendationHastagsEntity[];
  recommendationBestPostings: RecommendationBestPostingEntity[];
}

export interface RecommendationCaptionsEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
  caption: string;
}

export interface RecommendationHastagsEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
  hashtag: string;
}

export interface RecommendationBestPostingEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
  time: string;
  day: string;
  reason: string;
  engagement_potential: string;
  best_content: string;
}



export const mapToRecomendation = (
  response: RecomendationResponse
): Recomendation => {
  const data = response.data;

  // Map recommendationCaptions
  const recommendationCaptions: RecommendationCaptionsEntity[] =
    data.recommendationCaptions.map((item) => ({
      id: item.id,
      created_at: parseDate(item.created_at),
      updated_at: parseDate(item.updated_at),
      caption: item.caption,
    }));

  // Map recommendationHastags
  const recommendationHastags: RecommendationHastagsEntity[] =
    data.recommendationHastags.map((item) => ({
      id: item.id,
      created_at: parseDate(item.created_at),
      updated_at: parseDate(item.updated_at),
      hashtag: item.hashtag,
    }));

  // Map recommendationBestPostings
  const recommendationBestPostings: RecommendationBestPostingEntity[] =
    data.recommendationBestPostings.map((item) => ({
      id: item.id,
      created_at: parseDate(item.created_at),
      updated_at: parseDate(item.updated_at),
      time: item.time,
      day: item.day,
      reason: item.reason,
      engagement_potential: item.engagement_potential,
      best_content: item.best_content,
    }));

  return {
    id: data.id,
    created_at: parseDate(data.created_at), // asumsikan ini selalu valid
    content_strategy: data.content_strategy,
    recommendationCaptions,
    recommendationHastags,
    recommendationBestPostings,
  };
};