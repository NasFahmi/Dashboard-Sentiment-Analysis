import { usePageHeader } from "@/hooks/usePageHeader";
import { recomendationBreadcrumbs } from "@/shared/breadcumb-config";
import EmtpyStateData from "@/components/EmtpyStateData";
import RecomendationResult from "../components/RecomendationResult";
import { useRecomandationQuery } from "../hooks/useRecomandationQuery";
import ErrorStateData from "@/components/ErrorStateData";
import { useScrapers } from "@/hooks/useScraper";
import { useDatasetContextSync } from "@/hooks/useDatasetContextSync";
import { DashbaordSkeletonComponent } from "@/components/DashbaordSkeletonComponent";

const RecomendationPage: React.FC = () => {
  usePageHeader(recomendationBreadcrumbs);

  // 1. Get All Scrapers (Master Data)
  const { scrapers, isLoading: isScrapersLoading } = useScrapers();

  // 2. Sync URL <-> Active Dataset
  const { activeDataset, status } = useDatasetContextSync(scrapers);

  // 3. Fetch Recommendation Data (Only if we have an active dataset)
  //    Jika activeDataset null, query tidak akan jalan (enabled: false secara implisit jika id undefined/null)
  //    Tapi karena query key memerlukan ID string, kita kasih fallback string kosong atau handle di query-nya
  const {
    data: recommendationData,
    isLoading: isRecommendationLoading,
    isError,
  } = useRecomandationQuery(activeDataset?.id ?? "");

  // =====================================================
  // LOADING STATE
  // Gabungan loading scrapers, resolving status, dan query actual
  // =====================================================
  if (
    isScrapersLoading ||
    status === "resolving" ||
    (status === "ready" && isRecommendationLoading)
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
  // Jika tidak ada dataset sama sekali, atau data rekomendasi kosong
  // =====================================================
  if (
    status === "empty" ||
    (status === "ready" && !activeDataset) ||
    !recommendationData
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
      <RecomendationResult
        scrapers={scrapers}
        activeDataset={activeDataset!}
        data={recommendationData}
      />
    </div>
  );
};

// Extracted Header for reusability within loading/error states
const Header = () => (
  <div className="mb-6">
    <h1 className="text-normal sm:text-2xl font-semibold text-slate-900">
      Recommendation Content
    </h1>
    <p className="mt-2 text-xs sm:text-sm text-slate-500">
      Recommended content based on sentiment analysis results.
    </p>
  </div>
);

export default RecomendationPage;
