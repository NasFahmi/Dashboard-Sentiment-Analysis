import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type EvidenceData = {
  [aspect: string]: {
    positive?: string[];
    negative?: string[];
    neutral?: string[];
  };
};

type EvidenceCommentProps = {
  data: EvidenceData;
};

const sentimentStyle = {
  positive: {
    label: "Positive",
    className: "bg-green-50 text-green-700",
  },
  negative: {
    label: "Negative",
    className: "bg-red-50 text-red-700",
  },
  neutral: {
    label: "Neutral",
    className: "bg-slate-100 text-slate-600",
  },
};

const EvidenceComment: React.FC<EvidenceCommentProps> = ({ data }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Representative Comments
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Contoh komentar yang merepresentasikan sentimen pada masing-masing
          aspek.
        </p>
      </div>

      {/* Accordion */}
      <Accordion type="multiple" className="space-y-3">
        {Object.entries(data).map(([aspect, sentiments]) => (
          <AccordionItem
            key={aspect}
            value={aspect}
            className="rounded-xl border border-slate-200 px-4"
          >
            <AccordionTrigger className="text-sm font-medium text-slate-900">
              {aspect.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pt-4">
              {Object.entries(sentiments).map(([sentiment, comments]) => {
                if (!comments || comments.length === 0) return null;

                const style =
                  sentimentStyle[
                  sentiment as keyof typeof sentimentStyle
                  ];

                return (
                  <div key={sentiment} className="space-y-2">
                    {/* Sentiment Label */}
                    <span
                      className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${style.className}`}
                    >
                      {style.label}
                    </span>

                    {/* Comment List */}
                    <ul className="space-y-2">
                      {comments.map((comment, idx) => (
                        <li
                          key={idx}
                          className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                        >
                          “{comment}”
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default EvidenceComment;
