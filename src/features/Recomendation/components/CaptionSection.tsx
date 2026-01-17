import { useState } from "react";
import { Copy, Check, Quote, Hash, AlignLeft } from "lucide-react";
import type { RecommendationCaptionsEntity } from "../types/recomendation";

// --- Sub-Component: Single Caption Card ---
const CaptionCard = ({
  caption,
  index,
}: {
  caption: RecommendationCaptionsEntity;
  index: number;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption.caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  // Hitung jumlah karakter untuk info tambahan (UX Plus)
  const charCount = caption.caption.length;
  const hashtagCount = (caption.caption.match(/#/g) || []).length;

  return (
    <div className="group relative flex flex-col rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:border-indigo-200 hover:shadow-md">
      {/* Card Header: Label & Metadata */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 bg-slate-50/50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
            {index + 1}
          </div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Option
          </span>
        </div>

        {/* Metadata stats */}
        <div className="flex items-center gap-3 text-[10px] font-medium text-slate-400">
          <span className="flex items-center gap-1" title="Character count">
            <AlignLeft className="w-3 h-3" /> {charCount} chars
          </span>
          {hashtagCount > 0 && (
            <span className="flex items-center gap-1" title="Hashtag count">
              <Hash className="w-3 h-3" /> {hashtagCount} tags
            </span>
          )}
        </div>
      </div>

      {/* Card Body: The Caption Text */}
      <div className="flex-1 p-5">
        <div className="relative rounded-lg bg-slate-50 p-4 border border-slate-100/50 group-hover:bg-indigo-50/30 transition-colors">
          <Quote className="absolute -top-2 -left-2 w-4 h-4 text-slate-300 fill-slate-300" />
          <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap font-medium">
            {caption.caption}
          </p>
        </div>
      </div>

      {/* Card Footer: Action Button */}
      <div className="px-5 pb-5 pt-0">
        <button
          onClick={handleCopy}
          className={`
            w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-all duration-200
            ${copied
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow"
            }
          `}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied to clipboard!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Caption
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// --- Main Container Component ---
const CaptionSection = ({ captions }: { captions: RecommendationCaptionsEntity[] }) => {
  if (!captions || captions.length === 0) return null;

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Section Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            Recommended Captions
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Pilih variasi caption terbaik yang sesuai dengan tone brand Anda.
          </p>
        </div>
        <span className="hidden sm:inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {captions.length} Variasi
        </span>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-5">
        {captions.map((item, index) => (
          <CaptionCard key={item.id} caption={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CaptionSection;