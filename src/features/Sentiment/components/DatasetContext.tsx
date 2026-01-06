import React from 'react'
type ScrapeDataset = {
  id: string;
  targetAccount: string;
  scrapedAt: string;
  totalPosts: number;
  totalComments: number;
};
const DatasetContext = ({ activeDataset, onChangeDataset }: { activeDataset: ScrapeDataset, onChangeDataset?: () => void }) => {
  return (
    <div className="rounded-xl mt-5  border border-slate-200 bg-white px-5 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Context Info */}
        <div className="space-y-1">
          <p className="text-xs text-slate-500">
            Using dataset
          </p>
          <p className="font-medium text-slate-900">
            @{activeDataset.targetAccount}
          </p>
          <p className="text-xs text-slate-500">
            {new Date(activeDataset.scrapedAt).toLocaleDateString("id-ID")} ·{" "}
            {activeDataset.totalPosts} post ·{" "}
            {activeDataset.totalComments} komentar
          </p>
        </div>

        {/* Action */}
        {onChangeDataset && (
          <button
            onClick={onChangeDataset}
            className="self-start text-sm font-medium text-blue-600 hover:underline sm:self-center"
          >
            Change dataset
          </button>
        )}
      </div>
    </div>
  )
}

export default DatasetContext