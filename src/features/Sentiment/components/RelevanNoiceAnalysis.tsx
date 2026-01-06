import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type RelevanceNoiseProps = {
  relevantComments: number;
  nonRelevantComments: number;
  relevanceRatio: number; // percent
};

// Palet warna yang konsisten (Hijau untuk Data, Abu untuk Noise)
const COLORS = {
  relevant: "#10b981", // emerald-500
  nonRelevant: "#cbd5e1", // slate-300
};

const RelevanceAnalysis: React.FC<RelevanceNoiseProps> = ({
  relevantComments,
  nonRelevantComments,
  relevanceRatio,
}) => {
  const chartData = [
    { name: "Relevant Comments", value: relevantComments },
    { name: "Non-Relevant Comments", value: nonRelevantComments },
  ];

  const totalComments = relevantComments + nonRelevantComments;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Analisis Kualitas Data
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Proporsi komentar yang mengandung topik spesifik vs komentar umum.
          </p>
        </div>


      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">

        {/* Left: Donut Chart dengan Label Tengah */}
        <div className="relative h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65} // Dibuat lebih tipis agar elegan
                outerRadius={85}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                cornerRadius={4} // Ujung chart membulat (modern look)
                stroke="none"
              >
                <Cell fill={COLORS.relevant} />
                <Cell fill={COLORS.nonRelevant} />
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} komentar`, "Jumlah"]}
                // TAMBAHKAN INI: memaksa tooltip berada di layer paling atas
                wrapperStyle={{ zIndex: 1000 }}
                contentStyle={{
                  borderRadius: "8px",
                  borderColor: "#f1f5f9",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
                itemStyle={{ color: "#334155" }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Text di Tengah Donut */}
          {/* Pastikan ada 'pointer-events-none' agar mouse bisa menembus teks dan mendeteksi chart */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-slate-800">{relevanceRatio}%</span>
            <span className="text-xs font-medium text-slate-400">Relevan</span>
          </div>
        </div>

        {/* Right: Detailed Breakdown */}
        <div className="space-y-6">

          {/* Progress Bars */}
          <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">
              Rincian Volume
            </h3>

            <div className="space-y-5">
              {/* Relevant Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                    <span className="text-sm font-semibold text-slate-700">Komentar Penting</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">{relevantComments}</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${(relevantComments / totalComments) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Non-Relevant Bar (Dibuat Netral/Abu-abu) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                    <span className="text-sm font-medium text-slate-500">Umum / Tidak Spesifik</span>
                  </div>
                  <span className="text-sm font-bold text-slate-500">{nonRelevantComments}</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-300 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${(nonRelevantComments / totalComments) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Total Indicator */}
            <div className="mt-5 pt-4 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-medium">Total Data Dianalisis</span>
              <span className="text-sm font-bold text-slate-800">{totalComments} ulasan</span>
            </div>
          </div>

          {/* Human Friendly Insight */}
          <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            <p className="text-sm leading-relaxed text-slate-600">
              Kami menemukan <span className="font-bold text-slate-800">{relevantComments} ulasan</span> yang membahas detail layanan Anda. Sisanya ({nonRelevantComments}) hanya berupa komentar basa-basi, mentions, atau emotikon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelevanceAnalysis;