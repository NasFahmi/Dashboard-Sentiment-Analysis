import React from "react";
import { CirclePlus, MessageCircleWarning, Smile, Meh, Frown } from 'lucide-react';

type CardInformationProps = {
  overallSentiment: "positive" | "neutral" | "negative";
  dominantAspect: string;
  attentionMessage?: string; // ⬅️ single focus message
};

const sentimentStyle = {
  positive: {
    label: "Positive",
    bg: "bg-green-50",
    text: "text-green-700",
    icon: Smile
  },
  neutral: {
    label: "Neutral",
    bg: "bg-slate-100",
    text: "text-slate-700",
    icon: Meh
  },
  negative: {
    label: "Negative",
    bg: "bg-red-50",
    text: "text-red-700",
    icon: Frown
  },
};

const CardInformation: React.FC<CardInformationProps> = ({
  overallSentiment,
  dominantAspect,
  attentionMessage,
}) => {
  const sentiment = sentimentStyle[overallSentiment];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* ================= OVERALL SENTIMENT ================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <div className={`flex items-center justify-center ${sentiment.bg} p-2 rounded-lg`}>
            <sentiment.icon className={`w-5 h-5 ${sentiment.text}`} />
          </div>
          <p className="text-sm font-medium text-slate-500">
            Overall Sentiment
          </p>

        </div>
        <div
          className={`mt-3 inline-flex items-center rounded-full px-4 py-1 text-sm font-semibold ${sentiment.bg} ${sentiment.text}`}
        >
          {sentiment.label}
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Gambaran umum perasaan pelanggan terhadap akun yang dianalisis.
        </p>
      </div>

      {/* ================= DOMINANT ASPECT ================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-blue-100 p-2 rounded-lg">
            <CirclePlus className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm font-medium text-slate-500">
            Dominant Aspect
          </p>

        </div>
        <p className="mt-3 text-lg font-semibold text-blue-400">
          {dominantAspect}
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Aspek yang paling sering dibicarakan oleh pelanggan.
        </p>
      </div>

      {/* ================= ATTENTION NEEDED ================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-yellow-100 p-2 rounded-lg">
            <MessageCircleWarning className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-sm font-medium text-slate-500">
            Attention Needed
          </p>

        </div>

        {attentionMessage ? (
          <div className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {attentionMessage}
          </div>
        ) : (
          <p className="mt-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
            Tidak ada perhatian khusus terkait sentimen saat ini.
          </p>
        )}
      </div>
    </section>
  );
};

export default CardInformation;
