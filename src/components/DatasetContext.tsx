import { useState } from "react";
import type { Scraper } from "@/features/Scraper/types/scraper";
import { ChangeDatasetContextModal } from "./ChangeDatasetContextModal";

type DatasetContextProps = {
  scrapers: Scraper[];
  activeDataset: Scraper;
};

const DatasetContext = ({
  scrapers,
  activeDataset,
}: DatasetContextProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rounded-xl mt-5 border border-slate-200 bg-white px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs text-slate-500">Using dataset</p>
            <p className="font-medium text-slate-900">
              @{activeDataset.username}
            </p>
            <p className="text-xs text-slate-500">
              {activeDataset.post_count} post
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="self-start text-sm font-medium text-blue-600 hover:underline sm:self-center"
          >
            Change dataset
          </button>
        </div>
      </div>

      <ChangeDatasetContextModal
        open={open}
        onOpenChange={setOpen}
        scrapers={scrapers}
      />
    </>
  );
};

export default DatasetContext;
