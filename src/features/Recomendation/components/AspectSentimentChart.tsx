type AspectSentiment = {
  aspect: string;
  sentiment: "positive" | "neutral" | "negative";
  score: number;
};

const sentimentStyle = {
  positive: {
    label: "Positive",
    emoji: "😊",
    bar: "bg-green-400",
    badge: "bg-green-100 text-green-400",
  },
  neutral: {
    label: "Neutral",
    emoji: "😐",
    bar: "bg-yellow-400",
    badge: "bg-yellow-100 text-yellow-400",
  },
  negative: {
    label: "Negative",
    emoji: "😠",
    bar: "bg-red-400",
    badge: "bg-red-100 text-red-400",
  },
};

export const AspectSentimentChart = ({ data }: { data: AspectSentiment[] }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-normal font-semibold text-slate-900">
          Sentiment by Aspect
        </h3>
        <p className="text-xs text-slate-500">
          Distribusi kecenderungan sentimen per aspek
        </p>
      </div>

      {/* List */}
      <div className="grid gap-3 ">
        {data.map((item) => {
          const style = sentimentStyle[item.sentiment];

          return (
            <div key={item.aspect} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-medium">
                  {item.aspect}
                </span>
                <span className="text-slate-500">
                  {item.score}% · {style.label}
                </span>
              </div>

              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full ${style.bar}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
        })}
        {/* Insight Summary */}
        <div className="mt-4 rounded-lg bg-slate-50 p-4 space-y-2">
          <p className="text-sm font-medium text-blue-400">
            AI Insight Summary
          </p>

          <p className="space-y-1 text-xs text-slate-800">
            Sentimen positif paling dominan berasal dari diskusi mengenai kualitas makanan, sementara sentimen negatif lebih sering muncul pada topik harga. Pola ini konsisten di beberapa post dengan engagement tinggi, menunjukkan bahwa persepsi nilai merupakan faktor penting dalam respons audiens.
          </p>
        </div>

      </div>
    </div>
  );
};
