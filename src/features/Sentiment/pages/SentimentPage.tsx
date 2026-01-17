
import { usePageHeader } from '@/hooks/usePageHeader';
import { sentimentBreadcrumbs } from '@/shared/breadcumb-config';
import React from 'react';
import { isFirstime } from '@/lib/constant';
import EmtpyStateData from '@/components/EmtpyStateData';
import SentimentResult from '../components/SentimentResult';


const SentimentPage: React.FC = () => {
  usePageHeader(sentimentBreadcrumbs);
  // null = belum memilih dataset

  // const [activeDataset, setActiveDataset] =
  //   useState<ScrapeDataset | null>(null);

  // const onChangeDataset = (dataset: ScrapeDataset) => {
  //   setActiveDataset(dataset);
  // };
  return (

    <div>
      <h1 className="text-2xl font-bold">Sentiment Analysis</h1>
      <p className="mt-2 text-xs sm:text-sm text-slate-500">
        Sentiments Analysis page content goes here
      </p>

      {isFirstime ? (
        <EmtpyStateData />
      ) : (
        <SentimentResult />
      )}
    </div>
  );
};

export default SentimentPage;
