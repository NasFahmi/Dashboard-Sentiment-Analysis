type ContentStrategy = {
  focusAreas: string[];
  tone: string;
  contentMix: {
    label: string;
    percentage: number;
  }[];
};

export const ContentStrategyOverview = ({ data }: { data: ContentStrategy }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-normal font-semibold text-slate-900">
            Content Strategy
          </h3>
          <p className="text-xs text-slate-500">
            Rekomendasi strategi konten berbasis analisis sentimen
          </p>
        </div>

        {/* Subtle accent */}
        <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-(--color-logo-1)">
          Recommendation
        </span>
      </div>

      {/* Tone (PRIMARY HIGHLIGHT) */}
      <div className="rounded-lg bg-blue-100 px-4 py-3">
        <p className="text-xs text-blue-600 font-medium">
          Recommended Tone
        </p>
        <p className="mt-1 text-sm font-semibold text-blue-600">
          {data.tone}
        </p>
      </div>

      {/* Focus Areas */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-600">
          Focus Areas
        </p>
        <ul className="w-fit flex flex-wrap gap-2">
          {data.focusAreas.map((item, idx) => (
            <li
              key={idx}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Mix */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-600">
          Content Mix
        </p>

        {data.contentMix.map((item) => {
          const barColor =
            item.label.toLowerCase().includes("education")
              ? "bg-sky-500"
              : item.label.toLowerCase().includes("promotion")
              ? "bg-amber-500"
              : "bg-emerald-500";

          return (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600">
                <span>{item.label}</span>
                <span className="font-medium">
                  {item.percentage}%
                </span>
              </div>

              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
