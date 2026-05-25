import HashtagSection from "./HashtagSection";
import PostingScheduleSection from "./PostingScheduleSection";
import { ContentStrategyOverview } from "./ContentStrategyOverview";
import DatasetContext from "@/components/DatasetContext";
import type { Recomendation } from "../types/recomendation";
import type { Scraper } from "@/features/Scraper/types/scraper";
import CaptionSection from "./CaptionSection";

type RecomendationResultProps = {
  scrapers: Scraper[];
  activeDataset: Scraper;
  data: Recomendation;
};

const RecomendationResult = ({
  scrapers,
  activeDataset,
  data,
}: RecomendationResultProps) => {

  // 1. Prepare Data
  const contentStrategyData = {
    content_strategy: data.content_strategy,
  };

  const hashtagsData = data.recommendationHastags.map((item) => item.hashtag);

  return (
    <div className="space-y-6 pb-10">
      {/* ================= 1. HEADER CONTEXT ================= */}
      {/* Tetap di paling atas sebagai konteks global */}
      <DatasetContext scrapers={scrapers} activeDataset={activeDataset} />

      {/* ================= 2. MAIN CONTENT LAYOUT ================= */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">

        {/* --- LEFT COLUMN: CONTENT FLOW (Strategi -> Caption -> Hashtag) --- */}
        <div className="space-y-6 lg:col-span-8">

          {/* A. Strategy & Tone */}
          <ContentStrategyOverview data={contentStrategyData} />

          {/* B. Hashtags */}
          <HashtagSection hastags={hashtagsData} />

          {/* C. Captions (Card List) */}
          {/* Ini adalah inti aktivitas user (memilih copy) */}
          <CaptionSection captions={data.recommendationCaptions} />




        </div>

        {/* --- RIGHT COLUMN: REFERENCE (Posting Schedule) --- */}
        <div className="lg:col-span-4">
          {/* 'sticky top-6' membuat jadwal tetap terlihat saat user scroll caption panjang */}
          <div className="sticky top-6 space-y-6">
            <PostingScheduleSection data={data.recommendationBestPostings} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecomendationResult;