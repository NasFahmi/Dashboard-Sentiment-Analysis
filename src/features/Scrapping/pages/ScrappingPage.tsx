import React from 'react';
// import InstruksiComponent from '../components/InstruksiComponent';
import { BookOpen } from 'lucide-react';

const ScrappingPage: React.FC = () => {
  return (

    <div>
      <div className="flex justify-between items-center">

        <div className='flex flex-col'>
          <h1 className="text-2xl font-semibold text-slate-900">
            Data Scraper
          </h1>
          <p className="mt-2 text-slate-500 text-sm">
            Scrape Instagram data easily with our Data Scraper tool.
          </p>
        </div>
        <div className="flex justify-center items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white hover:bg-blue-50 transition-all duration-300 cursor-pointer">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-(--color-logo-1)">
            <BookOpen className="h-5 w-5" />

          </div>
          <h1 className="ml-2 text-sm font-medium text-slate-700 hover:text-blue-600 cursor-pointer">
            Guide
          </h1>
        </div>

      </div>

      {/* <InstruksiComponent /> */}
    </div>

  );
};

export default ScrappingPage;
