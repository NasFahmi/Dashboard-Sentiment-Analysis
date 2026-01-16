import React from 'react';
// import InstruksiComponent from '../components/InstruksiComponent';
import { BookOpen } from 'lucide-react';
import InstruksiComponent from '../components/InstruksiComponent';
import { Link } from 'react-router';
import { usePageHeader } from '@/hooks/usePageHeader';
import { scrapesBreadcrumbs } from '@/lib/breadcumb-config';
import { DataComponents } from '../components/DataCard';
import { useScraperQuery } from '../hooks/useScraperQuery';
const ScraperPage: React.FC = () => {
  usePageHeader(scrapesBreadcrumbs);

  const { data, isLoading, isError } = useScraperQuery();

  if (isLoading) {
    return <div>Memuat data scraping...</div>;
  }

  if (isError) {
    return <div>Gagal memuat data scraping</div>;
  }




  return (

    <div>
      <div className="flex justify-between gap-4 items-center mb-5">

        <div className='flex flex-col'>
          <h1 className="text-2xl font-semibold text-slate-900">
            Data Scraper
          </h1>
          <p className="mt-2 text-slate-500 text-sm">
            Scrape Instagram data easily with our Data Scraper tool.
          </p>
        </div>
        <Link to={'/dashboard/scrapes/guide'} className="group flex justify-center items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white hover:bg-blue-50 transition-all duration-300 cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
            <BookOpen className="h-5 w-5 text-(--color-logo-1)" />
          </div>
          <h1 className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors duration-300">
            Guide
          </h1>
        </Link>

      </div>

      {(data ?? []).length === 0 ? <InstruksiComponent /> : <DataComponents data={(data ?? [])} />}



      {/* <InstruksiComponent /> */}
    </div>

  );
};

export default ScraperPage;
