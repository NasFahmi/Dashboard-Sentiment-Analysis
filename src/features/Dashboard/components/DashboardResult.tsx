import DatasetContext from '@/components/DatasetContext';
import CardInformation from './CardInformation';
import MiniSnapshot from './MiniSpanshot';
import Insight from './Insight';

import { useDatasetContextSync } from '@/hooks/useDatasetContextSync';
import { useScrapers } from '@/hooks/useScraper';

import EmtpyStateData from '@/components/EmtpyStateData';
import { DashbaordSkeletonComponent } from '@/components/DashbaordSkeletonComponent';

const DashboardResult = () => {
  const { scrapers } = useScrapers();

  console.log(`dashboard scrapper data : ${scrapers}`);
  const { activeDataset, status } =
    useDatasetContextSync(scrapers);

  /* =====================================================
   * STATE: HYDRATING / RESOLVING
   * ===================================================== */
  if (status === "resolving") {
    console.log("Resolving");
    return <DashbaordSkeletonComponent />;
  }

  /* =====================================================
   * STATE: EMPTY (FINAL)
   * ===================================================== */
  if (status === "empty") {
    console.log("Empty");
    return <EmtpyStateData />;
  }

  /* =====================================================
   * STATE: READY (GUARDED)
   * ===================================================== */
  if (status !== "ready" || !activeDataset) {
    console.log("Not Ready");
    // defensive fallback – seharusnya jarang terjadi
    return <DashbaordSkeletonComponent />;
  }

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
        overallSentiment="positive"
        dominantAspect="Service"
      />

      <MiniSnapshot
        sentimentDistribution={{
          positive: 104,
          neutral: 155,
          negative: 28,
        }}
        topAspects={[
          {
            aspect: "Service",
            total: 287,
            dominantSentiment: "neutral",
          },
          {
            aspect: "Food Quality",
            total: 124,
            dominantSentiment: "positive",
          },
          {
            aspect: "Price",
            total: 98,
            dominantSentiment: "neutral",
          },
        ]}
      />

      <Insight />
    </div>
  );
};

export default DashboardResult;
