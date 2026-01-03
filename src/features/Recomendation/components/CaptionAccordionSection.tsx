import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type CaptionItem = {
  id: string;
  tone: string;
  text: string;
};

const CaptionAccordionSection = ({ captions }: { captions: CaptionItem[] }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Recommended Captions
        </h3>
        <p className="text-xs text-slate-500">
          Caption yang dihasilkan berdasarkan analisis sentimen
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        
        defaultValue="caption-1"
        className="space-y-2"
      >
        {captions.map((item, index) => (
          <AccordionItem
            key={item.id}
            value={`caption-${item}`}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="text-sm font-medium text-slate-800">
              Caption {index + 1} · Tone: {item.tone}
            </AccordionTrigger>

            <AccordionContent className="pt-2 space-y-4">
              <p className="text-sm text-slate-700 whitespace-pre-line">
                {item.text}
              </p>

              <div className="flex gap-3">
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
                  Copy caption
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CaptionAccordionSection;
