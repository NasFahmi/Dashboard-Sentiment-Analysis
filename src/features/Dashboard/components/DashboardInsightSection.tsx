import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { PieChart as PieIcon, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";


// dummySentimentData.ts
import { Smile, Meh, Frown } from "lucide-react";
import TopBrandList from "./TopBrandList";

const sentimentSummary = [
  {
    name: "Positif",
    value: 1103,
    percentage: 7.4,
    fill: "#22c55e",
    icon: <Smile className="w-4 h-4 text-green-600" />,
  },
  {
    name: "Netral",
    value: 13774,
    percentage: 91.9,
    fill: "#94a3b8",
    icon: <Meh className="w-4 h-4 text-slate-500" />,
  },
  {
    name: "Negatif",
    value: 107,
    percentage: 0.7,
    fill: "#ef4444",
    icon: <Frown className="w-4 h-4 text-red-500" />,
  },
];


const DashboardInsightSection = () => {
  const [view, setView] = useState<"pie" | "bar">("pie");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* SENTIMENT DISTRIBUTION */}
      {/* SENTIMENT DISTRIBUTION */}
      <Card className="shadow-sm border border-slate-200 bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-lg">
                Distribusi Sentimen
              </CardTitle>
              <CardDescription className="text-sm">
                Analisis dari 14.984 mentions
              </CardDescription>
            </div>

            {/* View Toggle */}
            <div className="flex items-center rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setView("pie")}
                className={cn(
                  "flex items-center justify-center rounded-md p-2 transition",
                  view === "pie"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <PieIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("bar")}
                className={cn(
                  "flex items-center justify-center rounded-md p-2 transition",
                  view === "bar"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Chart */}
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {view === "pie" ? (
                <PieChart>
                  <Pie
                    data={sentimentSummary}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={60}
                    paddingAngle={2}
                  >
                    {sentimentSummary.map((d, i) => (
                      <Cell key={i} fill={d.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              ) : (
                <BarChart data={sentimentSummary}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                  />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {sentimentSummary.map((d, i) => (
                      <Cell key={i} fill={d.fill} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Sentiment Summary */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {sentimentSummary.map((item) => (
              <div
                key={item.name}
                className={cn(
                  "flex items-center justify-between duration-300 ease-in-out rounded-xl px-4 py-3 text-sm transition",
                  item.name === "Positif" && "bg-green-50 hover:bg-green-100",
                  item.name === "Netral" && "bg-slate-50 hover:bg-slate-100",
                  item.name === "Negatif" && "bg-red-50 hover:bg-red-100"
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="font-medium text-slate-700">
                    {item.name}
                  </span>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-slate-900">
                    {item.percentage}%
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.value.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </CardContent>
      </Card>


      {/* TOP BRANDS */}
      <TopBrandList />


     
    </div>
  );
};

export default DashboardInsightSection;
