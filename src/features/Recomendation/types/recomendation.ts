export interface RecomendationResponse {
  message: string;
  data: Data;
}

export interface Data {
  id: string;
  created_at: Date;
  content_strategy: string;
  recommendationCaptions: Recommendation[];
  recommendationHastags: Recommendation[];
  recommendationBestPostings: RecommendationBestPosting[];
}

export interface RecommendationBestPosting {
  id: string;
  created_at: Date;
  updated_at: null;
  time: string;
  day: string;
  reason: string;
  engagement_potential: string;
  best_content: string;
}

export interface Recommendation {
  id: string;
  created_at: Date;
  updated_at: null;
  caption?: string;
  hashtag?: string;
}
