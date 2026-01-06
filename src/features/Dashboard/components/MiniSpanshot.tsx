import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

type MiniSnapshotProps = {
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topAspects: {
    aspect: string;
    total: number;
    dominantSentiment: "positive" | "neutral" | "negative";
  }[];
};

const SENTIMENT_COLORS = {
  positive: "bg-green-500",
  neutral: "bg-slate-300",
  negative: "bg-red-500",
};

const DONUT_COLORS = ["#22c55e", "#cbd5e1", "#ef4444"];

const MiniSnapshot: React.FC<MiniSnapshotProps> = ({
  sentimentDistribution,
  topAspects,
}) => {
  const donutData = [
    { name: "Positive", value: sentimentDistribution.positive },
    { name: "Neutral", value: sentimentDistribution.neutral },
    { name: "Negative", value: sentimentDistribution.negative },
  ];

  const maxTotal = Math.max(...topAspects.map((a) => a.total));

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-12">
      {/* ================= MINI SENTIMENT SNAPSHOT ================= */}
      <div className="rounded-2xl border border-slate-200 col-span-6 bg-white p-5">
        {/* Header */}
        <p className="text-sm font-medium text-slate-500">
          Sentiment Snapshot
        </p>

        {/* Content */}
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          {/* Donut + Center Label */}
          <div className="relative h-44 w-44 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={44}
                  outerRadius={58}
                  paddingAngle={2}
                  stroke="none"
                >
                  {DONUT_COLORS.map((color, idx) => (
                    <Cell key={idx} fill={color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-semibold text-slate-900">
                {sentimentDistribution.positive +
                  sentimentDistribution.neutral +
                  sentimentDistribution.negative}
              </span>
              <span className="text-[11px] text-slate-500">
                komentar
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid w-full grid-cols-3 gap-3 text-center sm:grid-cols-1 sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="text-sm text-slate-700">
                Positive
              </span>
              <span className="ml-auto text-sm font-medium text-slate-900 sm:ml-0">
                {sentimentDistribution.positive}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="text-sm text-slate-700">
                Neutral
              </span>
              <span className="ml-auto text-sm font-medium text-slate-900 sm:ml-0">
                {sentimentDistribution.neutral}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="text-sm text-slate-700">
                Negative
              </span>
              <span className="ml-auto text-sm font-medium text-slate-900 sm:ml-0">
                {sentimentDistribution.negative}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-xs text-slate-500">
          Distribusi singkat sentimen pelanggan berdasarkan komentar yang dianalisis.
        </p>
      </div>


      {/* ================= TOP ASPECT SNAPSHOT ================= */}
      <div className="rounded-2xl col-span-6 border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <p className="text-normal font-medium text-slate-500">
            Top Aspects
          </p>
        </div>

        <div className="mt-4 space-y-4">
          {topAspects.map((aspect) => (
            <div key={aspect.aspect}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-slate-800">
                  {aspect.aspect}
                </span>
                <span className="text-slate-500">
                  {aspect.total}
                </span>
              </div>

              <div className="h-5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${SENTIMENT_COLORS[aspect.dominantSentiment]
                    }`}
                  style={{
                    width: `${(aspect.total / maxTotal) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-slate-600">
          Aspek yang paling sering dibicarakan oleh pelanggan.
        </p>
      </div>
    </section>
  );
};

export default MiniSnapshot;
