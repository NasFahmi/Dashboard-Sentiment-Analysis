// src/features/Dashboard/pages/DashboardPage.tsx
import EmtpyStateData from "@/components/EmtpyStateData";
import { usePageHeader } from "@/hooks/usePageHeader";
import { dashboardBreadcrumbs } from "@/shared/breadcumb-config";
import React from "react";
import DashboardResult from "../components/DashboardResult";
import { useScrapers } from "@/hooks/useScraper";
import { useDatasetContextSync } from "@/hooks/useDatasetContextSync";
import { DashbaordSkeletonComponent } from "@/components/DashbaordSkeletonComponent";
import { useDashboardQuery } from "../hooks/useDashboardQuery";
import ErrorStateData from "@/components/ErrorStateData";
import type { Scraper } from "@/features/Scraper/types/scraper";
import Chatbot from "../components/Chatbot";

const DashboardPage: React.FC = () => {
  usePageHeader(dashboardBreadcrumbs);
  const { scrapers } = useScrapers();

  const { activeDataset, status } =
    useDatasetContextSync(scrapers)

  // =====================================================
  // LOADING STATE (CONTEXT RESOLVING)
  // =====================================================
  if (status === "resolving") {
    return (
      <div>
        <Header />
        <DashbaordSkeletonComponent />
      </div>
    );
  }

  // =====================================================
  // EMPTY STATE
  // =====================================================
  // Jika status ready tapi tidak ada activeDataset, atau status empty
  if (status === "empty" || !activeDataset) {
    return (
      <div>
        <Header />
        <Chatbot datasetId="" />
        <EmtpyStateData />
      </div>
    );
  }

  // =====================================================
  // READY STATE (With Valid ID)
  // =====================================================
  return (
    <DashboardContent
      activeDataset={activeDataset}
      scrapers={scrapers}
    />
  );
};

// Internal component to ensure useQuery is only called with valid ID
const DashboardContent: React.FC<{
  activeDataset: Scraper;
  scrapers: Scraper[];
}> = ({ activeDataset, scrapers }) => {
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError
  } = useDashboardQuery(activeDataset.id);

  if (isDashboardLoading) {
    return (
      <div>
        <Header />
        <DashbaordSkeletonComponent />
      </div>
    );
  }

  if (isDashboardError) {
    return (
      <div>
        <Header />
        <ErrorStateData />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div>
        <Header />
        <EmtpyStateData />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <DashboardResult
        scrapers={scrapers}
        activeDataset={activeDataset}
        data={dashboardData}
      />
    </div>
  );
};


const Header = () => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-slate-900">Sentiment Dashboard</h1>
    <p className="mt-2 text-xs sm:text-sm text-slate-500">
      An overview of sentiment analysis results from social media data.
    </p>
  </div>
);

export default DashboardPage;
