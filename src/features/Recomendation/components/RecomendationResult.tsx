import CaptionAccordionSection from "./CaptionAccordionSection";
import HashtagSection from "./HashtagSection";
import PostingScheduleSection from "./PostingScheduleSection";
import { AspectSentimentChart } from "./AspectSentimentChart";
import { ContentStrategyOverview } from "./ContentStrategyOverview";
import { useDatasetContextSync } from "@/hooks/useDatasetContextSync";
import DatasetContext from "@/components/DatasetContext";
import EmtpyStateData from "@/components/EmtpyStateData";
import { useScrapers } from "@/hooks/useScraper";
import { DashbaordSkeletonComponent } from "@/components/DashbaordSkeletonComponent";

type ContentStrategy = {
  focusAreas: string[];
  tone: string;
  contentMix: {
    label: string;
    percentage: number;
  }[];
};


type AspectSentiment = {
  aspect: string;
  sentiment: "positive" | "neutral" | "negative";
  score: number;
};

type CaptionItem = {
  id: string;
  tone: string;
  text: string;
};

type PostingTime = {
  time: string;
  label: string;
  description: string;
  best?: boolean;
}


const mockAspectSentiment: AspectSentiment[] = [
  {
    aspect: "Food Quality",
    sentiment: "positive",
    score: 92,
  },
  {
    aspect: "Service",
    sentiment: "neutral",
    score: 65,
  },
  {
    aspect: "Price",
    sentiment: "negative",
    score: 78,
  },
];


const mockContentStrategy: ContentStrategy = {
  focusAreas: [
    "Highlight kualitas makanan yang excellent",
    "Address harga dengan pendekatan 'worth it'",
    "Tambahkan testimoni untuk build trust",
  ],
  tone: "Honest & Enthusiastic",
  contentMix: [
    { label: "Product Showcase", percentage: 60 },
    { label: "Customer Testimonial", percentage: 30 },
    { label: "Behind The Scenes", percentage: 10 },
  ],
};
const mockCaptions: CaptionItem[] = [
  {
    id: "1",
    tone: "Enthusiastic",
    text: "Yang penting rasanya juara! 🍽️✨\nMeskipun harganya agak tinggi,\nkualitas makanan di sini worth it.",
  },
  {
    id: "2",
    tone: "Honest",
    text: "Nikmatnya makanan ini ga bisa ditolak.\nCocok buat yang cari kualitas tanpa kompromi.",
  },
];

const mockHashtags = [
  "kulinerenak",
  "makananenak",
  "kulinerlokal",
  "worthitfood",
  "jajanenak",
];

const mockPostingSchedule: PostingTime[] = [
  {
    time: "07:00 – 09:00 (Weekdays)",
    label: "High Engagement",
    description: "Waktu sarapan, audiens aktif",
  },
  {
    time: "11:30 – 13:30 (All days)",
    label: "Very High Engagement",
    description: "Peak lunch time",
    best: true,
  },
  {
    time: "18:00 – 20:00 (All days)",
    label: "High Engagement",
    description: "Dinner time",
  },
];

const RecomendationResult = () => {

  const { scrapers } = useScrapers();

  console.log(`recomendation scrapper data : ${scrapers}`);
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

  return (
    <div className="space-y-6">
      {/* ================= DATASET CONTEXT ================= */}
      <DatasetContext
        scrapers={scrapers}
        activeDataset={activeDataset}
      />

      <div className="grid gap-6 md:grid-cols-12 mt-5">
        <div className="md:col-span-4">
          <AspectSentimentChart data={mockAspectSentiment} />

        </div>
        <div className="md:col-span-8">

          <ContentStrategyOverview data={mockContentStrategy} />
        </div>

      </div>

      {/* Tab section */}
      <div className="space-y-10">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT: CAPTIONS (PRIMARY) */}
          <div className="col-span-12 lg:col-span-7 ">
            <CaptionAccordionSection captions={mockCaptions} />
          </div>

          {/* RIGHT: SUPPORTING SECTIONS */}
          <div className="col-span-12 lg:col-span-5  space-y-6">
            <HashtagSection hastags={mockHashtags} />
            <PostingScheduleSection postingTIme={mockPostingSchedule} />
          </div>
        </div>
      </div>



    </div>
  );
};

export default RecomendationResult;
