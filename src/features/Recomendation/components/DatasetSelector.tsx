import { useState } from "react";
import { Button } from "@/components/ui/button";


type ScrapeDataset = {
  id: string;
  targetAccount: string;
  scrapedAt: string;
  totalPosts: number;
  totalComments: number;
};
type DatasetSelectorProps = {
  datasets: ScrapeDataset[];
  onAnalyze: (dataset: ScrapeDataset) => void;
};

export const DatasetSelector = ({ datasets, onAnalyze }: DatasetSelectorProps) => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = datasets.filter((s) =>
    s.targetAccount.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="">


      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari akun Instagram…"
        className="w-full max-w-sm rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 mb-4"
      />

      {/* List */}
      <div className="space-y-3 mb-4">
        {filtered.map((session) => (
          <label
            key={session.id}
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition
              ${selectedId === session.id
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 hover:border-slate-300"
              }
            `}
          >
            <div className="space-y-1">
              <p className="font-medium text-slate-900">
                @{session.targetAccount}
              </p>
              <p className="text-xs text-slate-500">
                {new Date(session.scrapedAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })}
              </p>
              <p className="text-xs text-slate-600">
                {session.totalPosts} post · {session.totalComments} komentar
              </p>
            </div>

            <input
              type="radio"
              name="dataset"
              checked={selectedId === session.id}
              onChange={() => setSelectedId(session.id)}
            />
          </label>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-end">
        <Button
          disabled={!selectedId}
          onClick={() => selectedId && onAnalyze(datasets.find(d => d.id === selectedId)!)}
        >
          Analyze Recommendation Content
        </Button>
      </div>
    </div>
  );
};
