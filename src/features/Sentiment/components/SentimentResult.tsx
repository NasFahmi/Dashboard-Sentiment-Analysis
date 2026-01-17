
import AspectSentiment from "./AspectSentiment";
import DatasetContext from "@/components/DatasetContext";
import ExecutiveSummary from "./ExecutiveSummary";
import RelevanNoiceAnalysis from "./RelevanNoiceAnalysis";
import SentimentTrend from "./SentimentTrend";
import AllComments from "./AllComments";

import { useDatasetContextSync } from "@/hooks/useDatasetContextSync";

import EmtpyStateData from "@/components/EmtpyStateData";
import { useScrapers } from "@/hooks/useScraper";
import { DashbaordSkeletonComponent } from "@/components/DashbaordSkeletonComponent";

/* ================= DUMMY DATA (sementara) ================= */

const dummyExecutiveSummary = {
  overallSentiment: "positive" as const,
  dominantAspect: "Food Quality",
  insight:
    "The restaurant offers high-quality food with a focus on fresh ingredients and authentic flavors.",
  relevantComments: 123,
  totalComments: 456,
};

const aspectSentimentData = [
  { aspect: "Food Quality", positive: 4.18, neutral: 94.78, negative: 1.04 },
  { aspect: "Service", positive: 34.15, neutral: 58.54, negative: 7.31 },
  { aspect: "Price", positive: 5.23, neutral: 92.33, negative: 2.44 },
];

/* ================= COMPONENT ================= */

const SentimentResult = () => {

  const { scrapers } = useScrapers();

  console.log(`sentiment scrapper data : ${scrapers}`);
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExecutiveSummary {...dummyExecutiveSummary} />
        <AspectSentiment data={aspectSentimentData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="col-span-7">
          <RelevanNoiceAnalysis
            relevantComments={113}
            nonRelevantComments={174}
            relevanceRatio={39.37}
          />
        </div>
        <div className="col-span-5">
          <SentimentTrend
            data={[
              { date: "2026-11-18", positive: 45, neutral: 90, negative: 12 },
              { date: "2026-11-19", positive: 38, neutral: 70, negative: 8 },
              { date: "2026-11-20", positive: 22, neutral: 55, negative: 6 },
              { date: "2026-11-21", positive: 35, neutral: 60, negative: 10 },
              { date: "2026-11-22", positive: 50, neutral: 45, negative: 15 },
              { date: "2026-11-23", positive: 42, neutral: 78, negative: 5 },
              { date: "2026-11-24", positive: 28, neutral: 95, negative: 12 },
            ]}
          />
        </div>
      </div>

      <AllComments />
    </div>
  );
};

export default SentimentResult;
