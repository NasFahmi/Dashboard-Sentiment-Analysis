// src/features/Dashboard/pages/DashboardPage.tsx
import EmtpyStateData from "@/components/EmtpyStateData";
import { usePageHeader } from "@/hooks/usePageHeader";
import { dashboardBreadcrumbs } from "@/lib/breadcumb-config";
import { isFirstime } from "@/lib/constant";
import React from "react";
import DashboardResult from "../components/DashboardResult";

const DashboardPage: React.FC = () => {
  usePageHeader(dashboardBreadcrumbs);
  const isEmpty = isFirstime;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Sentiment Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          An overview of sentiment analysis results from social media data.
        </p>
      </div>

      {/* Main Content */}
      {!isEmpty ? (
        <div className="space-y-6">
          <DashboardResult />
        </div>
      ) : <EmtpyStateData />}
    </div>
  );
};

export default DashboardPage;
