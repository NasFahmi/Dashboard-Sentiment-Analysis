import { usePageHeader } from "@/hooks/usePageHeader";
import { recomendationBreadcrumbs } from "@/lib/breadcumb-config";
import { useState } from "react";
import { isFirstime } from "@/lib/constant";
import EmtpyStateData from "@/components/EmtpyStateData";
import { DatasetSelector } from "../components/DatasetSelector";
import RecomendationResult from "../components/RecomendationResult";

type ScrapeDataset = {
  id: string;
  targetAccount: string;
  scrapedAt: string;
  totalPosts: number;
  totalComments: number;
};



const mockScrapeSessions: ScrapeDataset[] = [
  {
    id: "1",
    targetAccount: "poliwangi_jinggo",
    scrapedAt: "2026-01-02T22:59:00",
    totalPosts: 10,
    totalComments: 1234,
  },
  {
    id: "2",
    targetAccount: "bem_poliwangi",
    scrapedAt: "2026-01-01T20:15:00",
    totalPosts: 5,
    totalComments: 342,
  },
];


const RecomendationPage: React.FC = () => {
  usePageHeader(recomendationBreadcrumbs);

  // null = belum memilih dataset
  const [activeDataset, setActiveDataset] =
    useState<ScrapeDataset | null>(null);

  // true = user belum punya data scraping sama sekali
  const isEmpty = isFirstime;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Recommendation Content
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Recommended content based on sentiment analysis results.
        </p>
      </div>

      {/* Main Content */}
      {isEmpty ? (
        <EmtpyStateData />
      ) : !activeDataset ? (
        <DatasetSelector
          datasets={mockScrapeSessions}
          onAnalyze={setActiveDataset}
        />
      ) : (
        <RecomendationResult
          activeDataset={activeDataset}
          onChangeDataset={() => setActiveDataset(null)}
        />
      )}
    </div>
  );
};

export default RecomendationPage;
