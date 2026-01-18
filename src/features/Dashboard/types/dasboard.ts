// Dashboard.ts
import type { Recomendation, RecommendationBestPostingEntity } from "@/features/Recomendation/types/recomendation";
import type { Sentiment, PercentageDistributionDatum, SentimentTrend } from "@/features/Sentiment/types/sentiment";

// =======================
// 1. Dashboard Entity
// =======================
export interface Dashboard {
  // --- Row 1: KPI ---
  overallSentiment: "positive" | "negative" | "neutral";
  criticalAspect: string; // "price" | "service" | "food_quality"
  immediateAction: string;

  // --- Row 2: Charts ---
  sentimentDistribution: PercentageDistributionDatum; // Pie Chart Data
  aspectSentimentBreakdown: AspectBreakdown; // Stacked Bar Data

  // --- Row 3: Trend & Action ---
  sentimentTrend: SentimentTrend;
  recommendationBestPostings: RecommendationBestPostingEntity[];
}

// Helper interface untuk breakdown aspek (agar strict type)
export interface AspectBreakdown {
  price: PercentageDistributionDatum;
  service: PercentageDistributionDatum;
  food_quality: PercentageDistributionDatum;
}

// =======================
// 2. Mapper Function
// =======================
export const mapToDashboard = (
  absa: Sentiment, // Menerima Entity (hasil mapToSentiment)
  recommendation?: Recomendation // Menerima Entity (hasil mapToRecomendation)
): Dashboard => {

  // 1. Hitung Overall Sentiment Label
  const overall = absa.summary.overall_sentiment;
  let overallLabel: "positive" | "negative" | "neutral" = "neutral";

  if (overall.positive >= overall.negative && overall.positive >= overall.neutral) {
    overallLabel = "positive";
  } else if (overall.negative >= overall.neutral) {
    overallLabel = "negative";
  } else {
    overallLabel = "neutral";
  }

  // 2. Cari Critical Aspect (Aspek dengan % negatif tertinggi)
  const percentages = absa.summary.percentage;

  // Buat array untuk dibandingkan
  const aspects = [
    { name: "price", score: percentages.price.negative },
    { name: "service", score: percentages.service.negative },
    { name: "food_quality", score: percentages.food_quality.negative },
  ];

  // Sorting desc berdasarkan score negatif
  const critical = aspects.sort((a, b) => b.score - a.score)[0];

  return {
    // ===== Row 1 =====
    overallSentiment: overallLabel,
    criticalAspect: critical.name, // Akan return "service", "price", atau "food_quality"
    immediateAction: recommendation?.content_strategy ?? "Belum ada rekomendasi strategi",

    // ===== Row 2 =====
    sentimentDistribution: absa.summary.overall_sentiment,
    aspectSentimentBreakdown: absa.summary.percentage,

    // ===== Row 3 =====
    sentimentTrend: absa.sentiment_trend,
    recommendationBestPostings: recommendation?.recommendationBestPostings ?? [],
  };
};