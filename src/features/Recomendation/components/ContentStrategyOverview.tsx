type ContentStrategy = {
  content_strategy: string;
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
          {data.content_strategy}
        </p>
      </div>
    </div>
  );
};
