import { useState } from "react";
import { cn } from "@/lib/utils";

const topBrands = [
  { name: "Gacoan", percentage: 15.6, mentions: 917 },
  { name: "Solaria", percentage: 13.4, mentions: 842 },
  { name: "HokBen", percentage: 12.8, mentions: 799 },
  { name: "KFC", percentage: 11.6, mentions: 710 },
  { name: "McDonald's", percentage: 10.9, mentions: 689 },
];

const TopBrandList = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="space-y-4 bg-white shadow-sm p-6 rounded-2xl border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">
        Top Positive Brands
      </h3>
      <p className="text-sm text-slate-500">
        Based on the positive sentiment ratio
      </p>

      <div className="space-y-4 mt-4">
        {topBrands.map((brand) => {
          const isHovered = hovered === brand.name;

          return (
            <div
              key={brand.name}
              onMouseEnter={() => setHovered(brand.name)}
              onMouseLeave={() => setHovered(null)}
              className="group"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-slate-800">
                    {brand.name}
                  </span>

                  {/* Hover mentions */}
                  <span
                    className={cn(
                      "text-xs text-slate-500 transition-all",
                      isHovered
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2"
                    )}
                  >
                    ({brand.mentions.toLocaleString()} mentions)
                  </span>
                </div>

                <span className="text-sm font-medium text-slate-700">
                  {brand.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${brand.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-700 mb-1">
          Insight
        </p>
        <p>
          Brand dengan sentimen positif tertinggi didominasi oleh kategori makanan, yakni Gacoan, Solaria, HokBen, KFC, dan McDonald's. Hal ini
          menunjukkan persepsi publik yang relatif stabil,
        </p>

        <button className="mt-3 text-blue-600 hover:underline text-sm font-medium">
          View full brand analysis →
        </button>
      </div>

    </div>
  );
};

export default TopBrandList;
