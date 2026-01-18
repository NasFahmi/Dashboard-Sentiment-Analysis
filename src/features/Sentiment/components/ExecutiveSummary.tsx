import React from "react";
import type { Summary } from "../types/sentiment";

type ExecutiveSummaryProps = {
  data: Summary;
};

const sentimentStyle = {
  positive: {
    label: "Positive Dominant",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  neutral: {
    label: "Neutral Dominant",
    bg: "bg-slate-100",
    text: "text-slate-700",
  },
  negative: {
    label: "Negative Dominant",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
};

const getDominantSentiment = (data: {
  positive: number;
  neutral: number;
  negative: number;
}): "positive" | "neutral" | "negative" => {
  const { positive, neutral, negative } = data;
  if (positive >= neutral && positive >= negative) return "positive";
  if (neutral >= positive && neutral >= negative) return "neutral";
  return "negative";
};

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ data }) => {
  // 1. Calculate Overall Sentiment
  const overallSentiment = getDominantSentiment(data.overall_sentiment);

  // 2. Calculate Dominant Aspect
  const aspects = [
    { name: "food_quality", ...data.distribution.food_quality },
    { name: "price", ...data.distribution.price },
    { name: "service", ...data.distribution.service },
  ];

  const dominantAspect = aspects.reduce((prev, current) => {
    const prevTotal = prev.positive + prev.neutral + prev.negative;
    const currTotal = current.positive + current.neutral + current.negative;
    return prevTotal > currTotal ? prev : current;
  }).name;

  // 3. Data Coverage
  const relevantComments = data.relevance_analysis.relevant_comments;
  const totalComments =
    data.relevance_analysis.relevant_comments +
    data.relevance_analysis.non_relevant_comments;

  const sentiment = sentimentStyle[overallSentiment];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Executive Summary
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Ringkasan kondisi sentimen audiens berdasarkan analisis komentar
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
        {/* LEFT: Key Indicators */}
        <div className="space-y-8">
          {/* Overall Sentiment */}
          <div className={`rounded-xl px-4 py-3 ${sentiment.bg}`}>
            <p className="text-base font-medium text-slate-600">
              Overall Sentiment
            </p>
            <p className={`mt-1 text-lg font-semibold ${sentiment.text}`}>
              {sentiment.label}
            </p>
          </div>

          {/* Dominant Aspect */}
          <div className="rounded-xl bg-blue-50 px-4 py-3">
            <p className="text-base font-medium text-slate-600">
              Dominant Aspect
            </p>
            <p className="mt-1 text-lg font-semibold text-blue-800 capitalize">
              {dominantAspect.replace("_", " ")}
            </p>
          </div>

          {/* Data Coverage */}
          <div className="rounded-xl bg-amber-50 px-4 py-3">
            <p className="text-base font-medium text-slate-600">
              Data Coverage
            </p>
            <p className="mt-1 text-lg text-amber-700">
              {relevantComments} dari {totalComments} komentar relevan dianalisis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveSummary;
