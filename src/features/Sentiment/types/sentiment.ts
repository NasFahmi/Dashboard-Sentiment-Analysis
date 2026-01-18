import { parseDate } from "@/helper/parseDate";

//sentiment response
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

export interface Summary {
  percentage: PercentageDistribution;
  distribution: PercentageDistribution;
  overall_sentiment: PercentageDistributionDatum;
  relevance_analysis: RelevanceAnalysis;
}
export interface PercentageDistribution {
  price: PercentageDistributionDatum;
  service: PercentageDistributionDatum;
  food_quality: PercentageDistributionDatum;
}

export interface PercentageDistributionDatum {
  neutral: number;
  negative: number;
  positive: number;
}

export interface RelevanceAnalysis {
  relevant_comments: number;
  non_relevant_comments: number;
  relevant_ratio_percent: number;
  non_relevant_ratio_percent: number;
}


export interface OverallSentiment {
  date: Date;
  neutral: number;
  negative: number;
  positive: number;
}



export interface Distribution {
  price: OverallSentiment;
  service: OverallSentiment;
  food_quality: OverallSentiment;
}




export interface SentimentComment {
  id: string;
  created_at: Date;
  updated_at: null | Date | string;
  comment: string;
  food_quality: string;
  price: string;
  service: string;
}

export interface SentimentTrend {
  trend: OverallSentiment[];
  granularity: string;
}


//sentiment entity
export interface Sentiment {
  id: string;
  summary: Summary;
  sentiment_trend: SentimentTrend;
  sentimentComments: SentimentComment[];
}


// Helper: map satu comment
const mapComment = (comment: SentimentComment): SentimentComment => ({
  ...comment,
  created_at: parseDate(comment.created_at),
  updated_at: parseDate(comment.updated_at),
});

// Helper: map satu OverallSentiment (untuk trend)
const mapOverallSentiment = (item: OverallSentiment): OverallSentiment => ({
  ...item,
  date: parseDate(item.date), // pastikan date jadi Date
});

export const mapToSentiment = (response: SentimentResponse): Sentiment => {
  const data = response.data;

  return {
    id: data.id,
    summary: data.summary, // tidak perlu transformasi — sudah sesuai
    sentiment_trend: {
      granularity: data.sentiment_trend.granularity,
      trend: data.sentiment_trend.trend.map(mapOverallSentiment),
    },
    sentimentComments: data.sentimentComments.map(mapComment),
  };
};