// components/EmptySelectDatasetState.tsx
import { Database } from "lucide-react";

interface EmptySelectDatasetStateProps {
  onSelectDataset?: () => void;
}

export const EmptySelectDatasetState = ({
  onSelectDataset,
}: EmptySelectDatasetStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-3">
        <Database className="h-6 w-6 text-slate-500" />
      </div>

      <h3 className="text-base font-medium text-slate-900">
        Belum ada dataset yang dipilih
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Pilih salah satu dataset hasil scraping yang sudah dianalisis
        untuk menampilkan insight, sentimen, dan rekomendasi konten.
      </p>

      {onSelectDataset && (
        <button
          onClick={onSelectDataset}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Pilih Dataset
        </button>
      )}
    </div>
  );
};
