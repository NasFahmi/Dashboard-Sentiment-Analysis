import React from 'react';
import { usePageHeader } from '@/hooks/usePageHeader';
import { sentimentBreadcrumbs } from '@/shared/breadcumb-config';
import EmtpyStateData from '@/components/EmtpyStateData';
import SentimentResult from '../components/SentimentResult';
import { useScrapers } from '@/hooks/useScraper';
import { useDatasetContextSync } from '@/hooks/useDatasetContextSync';
import { useSentimentQuery } from '../hooks/useSentimentQuery';
import { DashbaordSkeletonComponent } from '@/components/DashbaordSkeletonComponent';
import ErrorStateData from '@/components/ErrorStateData';

const SentimentPage: React.FC = () => {
  usePageHeader(sentimentBreadcrumbs);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);

  // 1. Get All Scrapers (Master Data)
  const { scrapers, isLoading: isScrapersLoading } = useScrapers();

  // 2. Sync URL <-> Active Dataset
  const { activeDataset, status } = useDatasetContextSync(scrapers);

  // 3. Fetch Sentiment Data (Only if we have an active dataset)
  const {
    data: sentimentData,
    isLoading: isSentimentLoading,
    isError,
  } = useSentimentQuery(activeDataset?.id ?? "", page, limit);

  // =====================================================
  // LOADING STATE
  // =====================================================
  if (
    isScrapersLoading ||
    status === "resolving" ||
    (status === "ready" && isSentimentLoading)
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
    !sentimentData
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
  if (isError) {
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
    <div>
      <Header />
      <SentimentResult
        scrapers={scrapers}
        activeDataset={activeDataset!}
        data={sentimentData}
        onPageChange={setPage}
      />
    </div>
  );
};

const Header = () => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-slate-900">Sentiment Analysis</h1>
    <p className="mt-2 text-xs sm:text-sm text-slate-500">
      Sentiments Analysis page content goes here
    </p>
  </div>
);

export default SentimentPage;
