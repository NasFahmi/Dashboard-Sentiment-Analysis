import AspectSentiment from "./AspectSentiment";
import DatasetContext from "@/components/DatasetContext";
import ExecutiveSummary from "./ExecutiveSummary";
import RelevanNoiceAnalysis from "./RelevanNoiceAnalysis";
import SentimentTrend from "./SentimentTrend";
import AllComments from "./AllComments";
import type { Scraper } from "@/features/Scraper/types/scraper";
import type { Sentiment } from "../types/sentiment";

type SentimentResultProps = {
  scrapers: Scraper[];
  activeDataset: Scraper;
  data: Sentiment;
};



const SentimentResult = ({
  scrapers,
  activeDataset,
  data,
}: SentimentResultProps) => {
  return (
    <div className="space-y-6">
      <DatasetContext scrapers={scrapers} activeDataset={activeDataset} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExecutiveSummary data={data.summary} />
        <AspectSentiment data={data.summary} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <RelevanNoiceAnalysis data={data.summary.relevance_analysis} />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <SentimentTrend data={data.sentiment_trend} />
        </div>
      </div>

      <AllComments data={data.sentimentComments} />
    </div>
  );
};

export default SentimentResult;
