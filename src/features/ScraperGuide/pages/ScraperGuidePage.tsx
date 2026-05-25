import InstruksiComponent from '@/features/Scraper/components/InstruksiComponent';
import { usePageHeader } from '@/hooks/usePageHeader';
import { scraperGuideBreadcrumbs } from '@/shared/breadcumb-config';
import React from 'react';

const ScraperGuidePage: React.FC = () => {
  usePageHeader(scraperGuideBreadcrumbs);
  return (
    <InstruksiComponent />
  );
};

export default ScraperGuidePage;
