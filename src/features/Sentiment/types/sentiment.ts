export interface SentimentResponse {
  message: string;
  data: Data;
}

export interface Data {
  id: string;
  summary: Summary;
  sentiment_trend: SentimentTrend;
  sentimentComments: SentimentComment[];
}

export interface SentimentComment {
  id: string;
  created_at: Date;
  updated_at: null;
  comment: string;
  food_quality: string;
  price: string;
  service: string;
}

export interface SentimentTrend {
  trend: OverallSentiment[];
  granularity: string;
}

export interface OverallSentiment {
  date?: Date;
  neutral: number;
  negative: number;
  positive: number;
}

export interface Summary {
  percentage: Distribution;
  distribution: Distribution;
  overall_sentiment: OverallSentiment;
  relevance_analysis: RelevanceAnalysis;
}

export interface Distribution {
  price: OverallSentiment;
  service: OverallSentiment;
  food_quality: OverallSentiment;
}

export interface RelevanceAnalysis {
  relevant_comments: number;
  non_relevant_comments: number;
  relevant_ratio_percent: number;
  non_relevant_ratio_percent: number;
}
