import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as PieTooltip
} from "recharts";

// 1. Export tipe agar bisa dipakai di luar
export type SentimentValues = {
  positive: number;
  neutral: number;
  negative: number;
};

type MiniSnapshotProps = {
  sentimentDistribution: SentimentValues;
  aspects: Record<string, SentimentValues>;
};

// Konstanta warna yang konsisten
const COLORS = {
  positive: "#10b981", // Emerald-500
  neutral: "#cbd5e1",  // Slate-300
  negative: "#f43f5e", // Rose-500
};

const DONUT_COLORS = [COLORS.positive, COLORS.neutral, COLORS.negative];

const MiniSnapshot: React.FC<MiniSnapshotProps> = ({
  sentimentDistribution,
  aspects,
}) => {

  // --- LOGIC 1: Donut Chart Data ---
  const donutData = useMemo(() => [
    { name: "Positive", value: sentimentDistribution.positive },
    { name: "Neutral", value: sentimentDistribution.neutral },
    { name: "Negative", value: sentimentDistribution.negative },
  ], [sentimentDistribution]);

  const totalComments = sentimentDistribution.positive + sentimentDistribution.neutral + sentimentDistribution.negative;

  // --- LOGIC 2: Transform Aspect Data untuk Stacked Bar ---
  const sortedAspects = useMemo(() => {
    const processed = Object.entries(aspects).map(([key, value]) => {
      const total = value.positive + value.neutral + value.negative;

      // Hitung persentase untuk CSS width
      // (Gunakan Math.max(0.1) agar bar kecil tetap terlihat sedikit jika ada isinya)
      const pctPositive = total > 0 ? (value.positive / total) * 100 : 0;
      const pctNeutral = total > 0 ? (value.neutral / total) * 100 : 0;
      const pctNegative = total > 0 ? (value.negative / total) * 100 : 0;

      // Format Label
      const label = key
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        aspect: label,
        total,
        raw: value, // Simpan nilai asli untuk tooltip/display
        percentages: {
          positive: pctPositive,
          neutral: pctNeutral,
          negative: pctNegative
        }
      };
    });

    // Sort descending berdasarkan total mention
    return processed.sort((a, b) => b.total - a.total);
  }, [aspects]);

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-12">

      {/* ================= SECTION KIRI: SENTIMENT SNAPSHOT (DONUT) ================= */}
      <div className="rounded-2xl border border-slate-200 col-span-12 lg:col-span-5 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Overall Sentiment
          </p>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full">
            ALL DATA
          </span>
        </div>

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
          {/* Donut Chart Wrapper */}
          <div className="relative h-44 w-44 shrink-0">

            {/* 1. CENTER LABEL (Pindahkan ke sini/ATAS) */}
            {/* Karena ditulis duluan, dia akan berada di layer paling bawah (background) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-800 tracking-tight">
                {totalComments}
              </span>
              <span className="text-[10px] uppercase text-slate-400 font-bold">
                Comments
              </span>
            </div>

            {/* 2. CHART (Taruh di BAWAH label) */}
            {/* Karena ditulis belakangan, dia akan berada di layer atas, sehingga Tooltip aman */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={65}
                  paddingAngle={4}
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                  cornerRadius={4}
                >
                  {donutData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={DONUT_COLORS[index]} />
                  ))}
                </Pie>

                {/* Tambahkan wrapperStyle zIndex untuk memastikan tooltip selalu paling atas */}
                <PieTooltip
                  wrapperStyle={{ zIndex: 100 }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ fontSize: "12px", fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Custom */}
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            {donutData.map((item, idx) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-6 text-sm group"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-md transition-transform group-hover:scale-110"
                    style={{ backgroundColor: DONUT_COLORS[idx] }}
                  />
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-800">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= SECTION KANAN: ASPECT BREAKDOWN (STACKED BAR) ================= */}
      <div className="rounded-2xl border border-slate-200 col-span-12 lg:col-span-7 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Sentiment by Aspect
          </p>
          <div className="flex gap-2">
            {/* Mini Legend untuk Bar */}
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[10px] text-slate-400">Positive</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-300"></div><span className="text-[10px] text-slate-400">Neutral</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div><span className="text-[10px] text-slate-400">Negative</span></div>
          </div>
        </div>

        <div className="space-y-6">
          {sortedAspects.map((item) => (
            <div key={item.aspect} className="group">
              {/* Header: Nama Aspek & Total */}
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-700  transition-colors">
                  {item.aspect}
                </span>
              </div>

              {/* Stacked Bar Container */}
              <div className="relative h-4 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                {/* Positive Segment */}
                {item.percentages.positive > 0 && (
                  <div
                    className="h-full bg-emerald-500 transition-all duration-700 hover:bg-emerald-400 relative group/segment"
                    style={{ width: `${item.percentages.positive}%` }}
                  >
                    {/* Tooltip Hover (Opsional, agar user tau angka pasti) */}
                    <div className="opacity-0 group-hover/segment:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                      {item.raw.positive} Positive
                    </div>
                  </div>
                )}

                {/* Neutral Segment */}
                {item.percentages.neutral > 0 && (
                  <div
                    className="h-full bg-slate-300 transition-all duration-700 hover:bg-slate-400 relative group/segment border-l border-white/50"
                    style={{ width: `${item.percentages.neutral}%` }}
                  >
                    <div className="opacity-0 group-hover/segment:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                      {item.raw.neutral} Neutral
                    </div>
                  </div>
                )}

                {/* Negative Segment */}
                {item.percentages.negative > 0 && (
                  <div
                    className="h-full bg-rose-500 transition-all duration-700 hover:bg-rose-400 relative group/segment border-l border-white/50"
                    style={{ width: `${item.percentages.negative}%` }}
                  >
                    <div className="opacity-0 group-hover/segment:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                      {item.raw.negative} Negative
                    </div>
                  </div>
                )}
              </div>

              {/* Optional: Menampilkan persentase di bawah bar jika perlu detail */}
              <div className="mt-1 flex justify-between text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{Math.round(item.percentages.positive)}%</span>
                <span>{Math.round(item.percentages.negative)}%</span>
              </div>
            </div>
          ))}

          {/* Empty State jika data kosong */}
          {sortedAspects.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-sm italic">
              No aspect data available yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MiniSnapshot;