import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type AspectSentimentItem = {
  aspect: string;
  positive: number;
  neutral: number;
  negative: number;
};

type AspectSentimentProps = {
  data: AspectSentimentItem[];
};

const COLORS = {
  positive: "#34d399", // emerald-400
  neutral: "#CBD5E1",  // slate-300
  negative: "#fb7185", // rose-400
};

const AspectSentiment: React.FC<AspectSentimentProps> = ({ data }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Aspect Sentiment Breakdown
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Grafik ini menunjukkan bagian mana dari usaha Anda yang paling sering dipuji atau dikeluhkan pelanggan.
        </p>
      </div>

      {/* Chart */}
      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <XAxis
              dataKey="aspect"
              stroke="#64748b"
              fontSize={12}
            />

            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#64748b"
              fontSize={12}
            />

            <Tooltip
              formatter={(value: number, name: string) => [
                `${value}%`,
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
              contentStyle={{
                borderRadius: "8px",
                borderColor: "#e2e8f0",
                fontSize: "12px",
              }}
            />

            <Legend
              formatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
            />

            <Bar
              dataKey="positive"
              fill={COLORS.positive}
              barSize={40}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="neutral"
              fill={COLORS.neutral}
              barSize={40}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="negative"
              fill={COLORS.negative}
              barSize={40}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AspectSentiment;
