import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";

type ExecutiveSummaryProps = {
  overallSentiment: "positive" | "neutral" | "negative";
  dominantAspect: string;
  insight: string;
  relevantComments: number;
  totalComments: number;
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

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  overallSentiment,
  dominantAspect,
  insight,
  relevantComments,
  totalComments,
}) => {
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
        <div className="space-y-4">
          {/* Overall Sentiment */}
          <div className={`rounded-xl px-4 py-3 ${sentiment.bg}`}>
            <p className="text-xs font-medium text-slate-600">
              Overall Sentiment
            </p>
            <p className={`mt-1 text-sm font-semibold ${sentiment.text}`}>
              {sentiment.label}
            </p>
          </div>

          {/* Dominant Aspect */}
          <div className="rounded-xl bg-blue-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-600">
              Dominant Aspect
            </p>
            <p className="mt-1 text-sm font-semibold text-blue-800 capitalize">
              {dominantAspect.replace("_", " ")}
            </p>
          </div>

          {/* Data Coverage */}
          <div className="rounded-xl bg-amber-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-600">
              Data Coverage
            </p>
            <p className="mt-1 text-sm text-amber-700">
              {relevantComments} dari {totalComments} komentar relevan dianalisis
            </p>
          </div>
        </div>

        {/* RIGHT: Insight */}
        {/* RIGHT: Insight */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="rounded-xl bg-indigo-50 px-5 py-4">
              <p className="text-xs font-medium tracking-wide text-indigo-600">
                Insight Utama -{' '}
                <span className="text-indigo-400 font-normal text-xs">
                  Generated insight based on aggregated sentiment patterns
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-indigo-900">
                {insight}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent >
            <p >Ringkasan otomatis berdasarkan pola sentimen komentar</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
};

export default ExecutiveSummary;
