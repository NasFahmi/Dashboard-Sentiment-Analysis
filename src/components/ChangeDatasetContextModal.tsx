// components/ChangeDatasetModal.tsx
import type { Scraper } from "@/features/Scraper/types/scraper";
import { cn } from "@/lib/utils";
import { useDatasetContextStore } from "@/store/useDatasetContextStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
interface ChangeDatasetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scrapers: Scraper[];
}

export const ChangeDatasetContextModal = ({
  open,
  onOpenChange,
  scrapers,
}: ChangeDatasetModalProps) => {
  const activeDatasetId = useDatasetContextStore(
    (s) => s.activeDatasetId
  );
  const setActiveDatasetId = useDatasetContextStore(
    (s) => s.setActiveDatasetId
  );

  // =========================
  // DERIVED DATASET LIST
  // =========================
  const analyzedDatasets = scrapers.filter(
    (item) => item.is_analyzed
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Pilih Dataset</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {analyzedDatasets.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-6">
              Belum ada dataset yang selesai dianalisis
            </p>
          )}

          {analyzedDatasets.map((dataset) => {
            const isActive = dataset.id === activeDatasetId;

            return (
              <button
                key={dataset.id}
                onClick={() => {
                  setActiveDatasetId(dataset.id);
                  onOpenChange(false); // close modal
                }}
                className={cn(
                  "w-full rounded-lg border px-4 py-3 text-left transition",
                  isActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:bg-slate-50"
                )}
              >
                <p className="font-medium text-slate-900">
                  @{dataset.username}
                </p>
                <p className="text-xs text-slate-500">
                  {dataset.post_count} post
                </p>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
