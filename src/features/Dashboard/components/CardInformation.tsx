import React from "react";
import {
  Smile, Meh, Frown,
  AlertTriangle,
  Target
} from 'lucide-react';

// 1. Update Props sesuai Dashboard Row 1
type CardInformationProps = {
  overallSentiment: "positive" | "neutral" | "negative";
  criticalAspect: string;    // Menggantikan dominantAspect
  immediateAction: string;   // Menggantikan attentionMessage
};

// Helper: Styling untuk Sentiment
const sentimentStyle = {
  positive: {
    label: "Positive",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
    icon: Smile
  },
  neutral: {
    label: "Neutral",
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
    icon: Meh
  },
  negative: {
    label: "Negative",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-100",
    icon: Frown
  },
};

const CardInformation: React.FC<CardInformationProps> = ({
  overallSentiment,
  criticalAspect,
  immediateAction,
}) => {
  const sentiment = sentimentStyle[overallSentiment];

  // Helper untuk format text aspect (misal: "food_quality" -> "Food Quality")
  const formatAspect = (text: string) => {
    return text.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-3">

      {/* ================= CARD 1: OVERALL SENTIMENT ================= */}
      <div className={`rounded-2xl h-48 border bg-white p-5 shadow-sm transition-all hover:shadow-md ${sentiment.border}`}>
        <div className="flex flex-col items-start h-full justify-between mb-4">

          <div className="flex items-center w-full  justify-between">
            <p className="text-sm font-medium  text-slate-500 mb-1">
              Overall Sentiment
            </p>
            <div className={`flex items-center justify-center p-2.5 rounded-xl ${sentiment.bg}`}>
              <sentiment.icon className={`w-6 h-6 ${sentiment.text}`} />
            </div>
          </div>
          <h4 className={`text-2xl font-bold ${sentiment.text}`}>
            {sentiment.label}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Gambaran umum sentimen audiens berdasarkan analisis data terbaru.
          </p>


        </div>

      </div>

      {/* ================= CARD 2: CRITICAL ASPECT (Ex-Dominant) ================= */}
      {/* ================= CARD 2: CRITICAL ASPECT ================= */}
      <div className="rounded-2xl h-48 border border-orange-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex flex-col items-start h-full justify-between mb-4">
          <div className="flex items-center w-full justify-between">
            <p className="text-sm font-medium text-slate-500 mb-1">
              Critical Aspect
            </p>
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-orange-50">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-orange-700 capitalize">
            {formatAspect(criticalAspect)}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Aspek dengan tingkat sentimen negatif tertinggi yang perlu diperbaiki.
          </p>
        </div>
      </div>

      {/* ================= CARD 3: IMMEDIATE ACTION ================= */}
      <div className="rounded-2xl h-48 border border-indigo-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex flex-col items-start h-full justify-between mb-4">
          <div className="flex items-center w-full justify-between">
            <p className="text-sm font-medium text-slate-500 mb-1">
              Immediate Action
            </p>
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-indigo-50">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <p className="text-base font-bold text-indigo-900 leading-tight line-clamp-2">
            "{immediateAction}"
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Rekomendasi strategi konten prioritas berdasarkan analisis terbaru.
          </p>
        </div>
      </div>

    </section>
  );
};

export default CardInformation;