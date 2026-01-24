import { parseDate } from "@/helper/parseDate";

/* =========================================================
 * RESPONSE DARI BACKEND
 * ======================================================= */

export interface SentimentResponse {
  message: string;
  data: SentimentData; // meta ADA DI DALAM data
}

export interface SentimentData {
  id: string;
  summary: Summary;
  sentiment_trend: SentimentTrend;
  sentimentComments: SentimentComment[];
  meta: Meta;
}

/* =========================================================
 * SUMMARY & ANALYSIS
 * ======================================================= */

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

/* =========================================================
 * SENTIMENT TREND
 * ======================================================= */

export interface OverallSentiment {
  date: Date;
  neutral: number;
  negative: number;
  positive: number;
}

export interface SentimentTrend {
  trend: OverallSentiment[];
  granularity: string;
}

/* =========================================================
 * COMMENT
 * ======================================================= */

export interface SentimentComment {
  id: string;
  created_at: Date;
  updated_at: Date | null;
  comment: string;
  food_quality: string;
  price: string;
  service: string;
}

/* =========================================================
 * PAGINATION META
 * ======================================================= */

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/* =========================================================
 * ENTITY YANG DIGUNAKAN FRONTEND
 * ======================================================= */

export interface Sentiment {
  id: string;
  summary: Summary;
  sentiment_trend: SentimentTrend;
  sentimentComments: SentimentComment[];
  meta: Meta;
}

/* =========================================================
 * MAPPING HELPERS
 * ======================================================= */

// Map satu komentar
const mapComment = (comment: SentimentComment): SentimentComment => ({
  ...comment,
  created_at: parseDate(comment.created_at),
  updated_at: comment.updated_at ? parseDate(comment.updated_at) : null,
});

// Map satu data trend
const mapOverallSentiment = (item: OverallSentiment): OverallSentiment => ({
  ...item,
  date: parseDate(item.date),
});

/* =========================================================
 * MAIN MAPPER (INI KUNCI MASALAH KAMU SEBELUMNYA)
 * ======================================================= */

export const mapToSentiment = (
  response: SentimentResponse
): Sentiment => {
  const data = response.data;

  return {
    id: data.id,
    summary: data.summary,
    sentiment_trend: {
      granularity: data.sentiment_trend.granularity,
      trend: data.sentiment_trend.trend.map(mapOverallSentiment),
    },
    sentimentComments: data.sentimentComments.map(mapComment),
    meta: data.meta, // ✅ BENAR — BUKAN response.meta
  };
};
