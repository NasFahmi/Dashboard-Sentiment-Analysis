import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale"; // Locale Indonesia

type TrendItem = {
  date: string; // ISO date (YYYY-MM-DD)
  positive: number;
  neutral: number;
  negative: number;
};

type SentimentTrendProps = {
  data: TrendItem[];
};

// Tipe granularity sekarang: Harian (Daily), Bulanan (Monthly), Tahunan (Yearly)
type Granularity = "daily" | "monthly" | "yearly";

const COLORS = {
  positive: "#10b981", // emerald-500
  neutral: "#94a3b8",  // slate-400
  negative: "#ef4444", // red-500
};

const SentimentTrend: React.FC<SentimentTrendProps> = ({ data }) => {
  // Default: Harian (Menampilkan semua data harian)
  const [granularity, setGranularity] = useState<Granularity>("daily");

  const chartData = useMemo(() => {
    // 1. Sort data dulu biar urut dari tanggal terlama ke terbaru
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // OPSI 1: HARIAN (Tampilkan semua data mentah apa adanya)
    if (granularity === "daily") {
      return sortedData;
    }

    // OPSI 2 & 3: AGREGASI BULANAN ATAU TAHUNAN
    const map = new Map<string, TrendItem>();

    sortedData.forEach((item) => {
      const dateObj = parseISO(item.date);
      let key = "";

      // Tentukan format key pengelompokan
      if (granularity === "monthly") {
        key = format(dateObj, "yyyy-MM"); // Group by "2025-11"
      } else if (granularity === "yearly") {
        key = format(dateObj, "yyyy");    // Group by "2025"
      }

      if (!map.has(key)) {
        map.set(key, {
          date: key, // Date disini berisi wakil kelompok (bulan/tahun)
          positive: 0,
          neutral: 0,
          negative: 0,
        });
      }

      // Jumlahkan data (Accumulate)
      const acc = map.get(key)!;
      acc.positive += item.positive;
      acc.neutral += item.neutral;
      acc.negative += item.negative;
    });

    return Array.from(map.values());
  }, [data, granularity]);

  /**
   * Formatter Sumbu X Dinamis sesuai Granularity
   */
  const formatXAxis = (tickItem: string) => {
    // Cek apakah tickItem valid date string
    const date = new Date(tickItem);
    if (isNaN(date.getTime())) return tickItem;

    if (granularity === "yearly") {
      return format(date, "yyyy"); // Output: 2025
    }
    if (granularity === "monthly") {
      return format(date, "MMM yyyy", { locale: id }); // Output: Nov 2025
    }
    // Daily
    return format(date, "d MMM", { locale: id }); // Output: 18 Nov
  };

  /**
   * Formatter Tooltip Dinamis
   */
  const formatTooltipLabel = (label: string) => {
    const date = new Date(label);
    if (isNaN(date.getTime())) return label;

    if (granularity === "yearly") {
      return `Tahun ${format(date, "yyyy")}`;
    }
    if (granularity === "monthly") {
      return format(date, "MMMM yyyy", { locale: id });
    }
    return format(date, "eeee, d MMMM yyyy", { locale: id });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Tren Sentimen
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Perubahan volume sentimen berdasarkan {granularity === 'daily' ? 'hari' : granularity === 'monthly' ? 'bulan' : 'tahun'}.
          </p>
        </div>

        {/* Dropdown Pilihan Granularity */}
        <div className="w-[160px]">
          <Select
            value={granularity}
            onValueChange={(value) => setGranularity(value as Granularity)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih tampilan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Harian (Semua)</SelectItem>
              <SelectItem value="monthly">Bulanan</SelectItem>
              <SelectItem value="yearly">Tahunan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[345px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              stroke="#64748b"
              fontSize={12}
              axisLine={false}
              tickLine={false}
              dy={10}
              // Agar label tidak bertumpuk jika data "All Daily" sangat banyak
              minTickGap={30}
            />

            <YAxis
              stroke="#64748b"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              labelFormatter={formatTooltipLabel}
              formatter={(value, name) => [
                value != null ? `${value} ulasan` : '—',
                name === 'positive'
                  ? 'Positif'
                  : name === 'negative'
                    ? 'Negatif'
                    : name === 'neutral'
                      ? 'Netral'
                      : typeof name === 'string'
                        ? name.charAt(0).toUpperCase() + name.slice(1)
                        : '—',
              ]}
              contentStyle={{
                borderRadius: "8px",
                borderColor: "#e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                fontSize: "12px",
                fontWeight: 500
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => {
                if (value === 'positive') return 'Positif';
                if (value === 'negative') return 'Negatif';
                return 'Netral';
              }}
            />

            <Line
              type="monotone"
              dataKey="neutral"
              name="neutral"
              stroke={COLORS.neutral}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="positive"
              name="positive"
              stroke={COLORS.positive}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="negative"
              name="negative"
              stroke={COLORS.negative}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default SentimentTrend;