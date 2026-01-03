// src/features/Dashboard/pages/DashboardPage.tsx
import { usePageHeader } from "@/hooks/usePageHeader";
import { dashboardBreadcrumbs } from "@/lib/breadcumb-config";
import { isFirstime } from "@/lib/constant";
import React from "react";
import { Link } from "react-router";

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
        <div>
          <h2 className="text-lg font-medium text-slate-800">
            Dashboard Content
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Sentiment charts and insights will be displayed here.
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold text-slate-800">
              No Data Available
            </h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              You haven’t scraped any social media data yet.  
              Please collect data first before viewing the sentiment dashboard.
            </p>

            <Link
              to="/dashboard/scrapes"
              className="inline-flex items-center justify-center mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              Go to Data Scraper
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
