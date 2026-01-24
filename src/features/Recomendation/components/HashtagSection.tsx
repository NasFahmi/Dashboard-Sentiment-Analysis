const HashtagSection = ({ hastags }: { hastags: string[] }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h4 className="text-normal font-semibold text-slate-900 mb-3">
        Recommended Hashtags
      </h4>

      <div className="flex flex-wrap gap-2 mb-4">
        {hastags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        className="
    inline-flex items-center justify-center
    rounded-md 
    cursor-pointer
    px-3 py-1.5
    bg-(--color-logo-1)
    text-xs font-medium text-slate-100
    hover:bg-logo-1/80
    transition
  "
      >
        Copy all hashtags
      </button>

    </div>
  );
};

export default HashtagSection;
