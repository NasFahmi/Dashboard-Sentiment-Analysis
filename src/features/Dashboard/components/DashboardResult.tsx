import DatasetContext from '@/components/DatasetContext'
import CardInformation from './CardInformation';
import MiniSnapshot from './MiniSpanshot';
import Insight from './Insight';
type ScrapeDataset = {
  id: string;
  targetAccount: string;
  scrapedAt: string;
  totalPosts: number;
  totalComments: number;
};

const dummyDatasetContext: ScrapeDataset = {
  id: "1",
  targetAccount: "poliwangi_jinggo",
  scrapedAt: "2026-01-02T22:59:00",
  totalPosts: 10,
  totalComments: 1234,
};
const DashboardResult = () => {
  return (
    <div className='space-y-6'>
      <DatasetContext activeDataset={dummyDatasetContext} />
      {/* card */}
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
  )
}

export default DashboardResult