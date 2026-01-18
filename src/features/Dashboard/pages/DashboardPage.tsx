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

const DashboardPage: React.FC = () => {
  usePageHeader(dashboardBreadcrumbs);
  const { scrapers } = useScrapers();

  const { activeDataset, status } =
    useDatasetContextSync(scrapers)


  const { data: dashboardData, isLoading: isDashboardLoading, isError: isDashboardError } = useDashboardQuery(activeDataset?.id || "");
  // =====================================================
  // LOADING STATE
  // =====================================================
  if (
    isDashboardLoading ||
    status === "resolving" ||
    (status === "ready" && isDashboardLoading)
  ) {
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
  if (
    status === "empty" ||
    (status === "ready" && !activeDataset) ||
    !dashboardData
  ) {
    return (
      <div>
        <Header />
        <EmtpyStateData />
      </div>
    );
  }

  // =====================================================
  // ERROR STATE
  // =====================================================
  if (isDashboardError) {
    return (
      <div>
        <Header />
        <ErrorStateData />
      </div>
    );
  }

  // =====================================================
  // RENDER CONTENT
  // =====================================================

  return (
    <div >
      {/* Header */}
      <Header />
      <DashboardResult scrapers={scrapers} activeDataset={activeDataset!} data={dashboardData} />
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
