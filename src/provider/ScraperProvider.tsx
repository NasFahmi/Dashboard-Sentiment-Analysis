// providers/ScraperProvider.tsx
import { ScraperContext } from "@/context/ScraperContext";
import { useScraperQuery } from "@/features/Scraper/hooks/useScraperQuery";

export const ScraperProvider = ({ children }: { children: React.ReactNode }) => {
  const { data = [], isLoading, isError } = useScraperQuery();

  return (
    <ScraperContext.Provider
      value={{ scrapers: data, isLoading, isError }}
    >
      {children}
    </ScraperContext.Provider>
  );
};
