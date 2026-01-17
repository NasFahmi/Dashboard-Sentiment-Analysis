import { usePageHeader } from "@/hooks/usePageHeader";
import { recomendationBreadcrumbs } from "@/shared/breadcumb-config";
import { isFirstime } from "@/lib/constant";
import EmtpyStateData from "@/components/EmtpyStateData";
import RecomendationResult from "../components/RecomendationResult";






const RecomendationPage: React.FC = () => {
  usePageHeader(recomendationBreadcrumbs);

  // // null = belum memilih dataset
  // const [activeDataset, setActiveDataset] =
  //   useState<ScrapeDataset | null>(null);



  // true = user belum punya data scraping sama sekali
  const isEmpty = isFirstime;

  return (
    <div >
      {/* Header */}
      <div>
        <h1 className="text-normal sm:text-2xl font-semibold text-slate-900">
          Recommendation Content
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          Recommended content based on sentiment analysis results.
        </p>
      </div>

      {/* Main Content */}
      {isEmpty ? (
        <EmtpyStateData />
      ) : (
        <RecomendationResult />
      )}
    </div>
  );
};

export default RecomendationPage;
