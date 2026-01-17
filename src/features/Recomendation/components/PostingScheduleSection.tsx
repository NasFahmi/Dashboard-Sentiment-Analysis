import { Calendar, Lightbulb, Sparkles, TrendingUp, BarChart3, AlertCircle } from "lucide-react";

// 1. Gunakan Interface yang SAMA dengan Entity Anda
// Anda bisa meng-import ini dari file types Anda, atau definisikan ulang di sini jika perlu.
export interface RecommendationBestPostingEntity {
  id: string;
  created_at: Date;      // Sudah disesuaikan menjadi Date
  updated_at: Date;      // Sudah disesuaikan menjadi Date
  time: string;
  day: string;
  reason: string;
  engagement_potential: string; // Di Entity ini string generic
  best_content: string;
}

interface PostingScheduleSectionProps {
  data: RecommendationBestPostingEntity[];
}

// Helper: Menentukan gaya visual (Type Guard untuk string potential)
const getPotentialStyle = (potential: string) => {
  // Normalisasi string (jaga-jaga jika ada perbedaan case)
  const key = potential.toLowerCase();

  switch (key) {
    case "very_high":
      return {
        containerBorder: "border-indigo-100",
        containerBg: "bg-white ring-1 ring-indigo-50",
        badgeBg: "bg-indigo-50",
        badgeBorder: "border-indigo-200",
        badgeText: "text-indigo-700",
        icon: <Sparkles className="w-3.5 h-3.5 mr-1.5" />,
        label: "Very High"
      };
    case "high":
      return {
        containerBorder: "border-emerald-100",
        containerBg: "bg-white",
        badgeBg: "bg-emerald-50",
        badgeBorder: "border-emerald-200",
        badgeText: "text-emerald-700",
        icon: <TrendingUp className="w-3.5 h-3.5 mr-1.5" />,
        label: "High"
      };
    case "medium":
      return {
        containerBorder: "border-amber-100",
        containerBg: "bg-white",
        badgeBg: "bg-amber-50",
        badgeBorder: "border-amber-200",
        badgeText: "text-amber-700",
        icon: <BarChart3 className="w-3.5 h-3.5 mr-1.5" />,
        label: "Medium"
      };
    default:
      return {
        containerBorder: "border-slate-200",
        containerBg: "bg-white",
        badgeBg: "bg-slate-100",
        badgeBorder: "border-slate-200",
        badgeText: "text-slate-600",
        icon: <AlertCircle className="w-3.5 h-3.5 mr-1.5" />,
        label: potential || "Normal"
      };
  }
};

const PostingScheduleSection = ({ data }: PostingScheduleSectionProps) => {
  // Sorting: Prioritaskan 'very_high', lalu 'high'
  const sortedData = [...data].sort((a, b) => {
    const priority: Record<string, number> = { very_high: 3, high: 2, medium: 1, low: 0 };
    const pA = priority[a.engagement_potential.toLowerCase()] || 0;
    const pB = priority[b.engagement_potential.toLowerCase()] || 0;
    return pB - pA;
  });

  if (!data || data.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl">
        <p className="text-slate-500 text-sm">No posting schedule recommendations available.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 rounded-xl border border-slate-200 bg-white p-5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            Best Posting Time
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Optimized schedule based on your audience activity
          </p>
        </div>
      </div>

      {/* Grid Layout - Responsive */}
      <div className="grid gap-4 sm:grid-cols-1 ">
        {sortedData.map((item) => {
          const style = getPotentialStyle(item.engagement_potential);

          return (
            <div
              key={item.id}
              className={`group relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${style.containerBorder} ${style.containerBg}`}
            >
              {/* Header Card: Badge & Day */}
              <div className="flex justify-between items-start mb-3">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${style.badgeBg} ${style.badgeBorder} ${style.badgeText}`}>
                  {style.icon}
                  <span className="capitalize">{style.label} Potential</span>
                </div>

                <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-200/50">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  {item.day}
                </div>
              </div>

              {/* Main Content: Time & Reason */}
              <div className="mb-5">
                <h4 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-2">
                  {item.time}
                </h4>
                <div className="pl-3 border-l-[3px] border-slate-200">
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "{item.reason}"
                  </p>
                </div>
              </div>

              {/* Footer Card: Content Suggestion */}
              <div className="mt-auto pt-4 border-t border-slate-100/80 border-dashed">
                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-amber-50 rounded-md shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Recommended Content
                    </span>
                    <p className="text-sm font-semibold text-slate-700 leading-snug">
                      {item.best_content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostingScheduleSection;