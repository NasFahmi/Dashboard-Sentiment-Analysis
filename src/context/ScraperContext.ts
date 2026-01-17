import type { Scraper } from '@/features/Scraper/types/scraper';
import { createContext } from 'react';


type ScraperContextValue = {
  scrapers: Scraper[];
  isLoading: boolean;
  isError: boolean;
};

export const ScraperContext = createContext<ScraperContextValue | null>(null);