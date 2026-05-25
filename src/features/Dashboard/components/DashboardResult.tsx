import DatasetContext from '@/components/DatasetContext';
import CardInformation from './CardInformation';
import type { Scraper } from '@/features/Scraper/types/scraper';
import type { Dashboard } from '../types/dasboard';
import MiniSnapshot, { type SentimentValues } from './MiniSpanshot';
import SentimentTrend from '@/features/Sentiment/components/SentimentTrend';
import PostingScheduleSection from '@/features/Recomendation/components/PostingScheduleSection';
import Insight from './Insight';

import Chatbot from '@/features/Dashboard/components/Chatbot';

type DashboardResultProps = {
  scrapers: Scraper[];
  activeDataset: Scraper;
  data: Dashboard;
};


const DashboardResult = ({ scrapers,
  activeDataset,
  data }: DashboardResultProps) => {
  console.log(data)

  /* =====================================================
   * NORMAL RENDER
   * ===================================================== */
  return (
    <div className="space-y-6">
      <DatasetContext
        scrapers={scrapers}
        activeDataset={activeDataset}
      />

      <CardInformation
        overallSentiment={data.overallSentiment}
        criticalAspect={data.criticalAspect}
        immediateAction={data.immediateAction}
      />

      {/* Row 2: Charts (Pass Raw Data) */}
      {/* 2. Gunakan 'as unknown' dulu sebelum ke 'Record' */}
      <MiniSnapshot
        sentimentDistribution={data.sentimentDistribution}
        aspects={data.aspectSentimentBreakdown as unknown as Record<string, SentimentValues>}
      />

      {/* Trend & Execution (Bottom Section - New!)*/}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        <div className="col-span-12 lg:col-span-8">
          <SentimentTrend data={data.sentimentTrend} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <PostingScheduleSection data={data.recommendationBestPostings} isOnlyOne={true} />
        </div>
      </div>
      <Insight datasetId={activeDataset.id} />
      <Chatbot datasetId={activeDataset.id} />
    </div>
  );
};

export default DashboardResult;
