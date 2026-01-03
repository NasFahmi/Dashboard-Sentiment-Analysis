type PostingTime = {
  time: string;
  label: string;
  description: string;
  best?: boolean;
};

const PostingScheduleSection = ({ postingTIme }: { postingTIme: PostingTime[] }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h4 className="text-normal font-semibold text-slate-900 mb-3">
        Best Posting Time
      </h4>

      <div className="space-y-3">
        {postingTIme.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-lg border px-4 py-3 ${item.best
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white"
              }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-900">
                {item.time}
              </span>
              {item.best && (
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
                  Best
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostingScheduleSection;
