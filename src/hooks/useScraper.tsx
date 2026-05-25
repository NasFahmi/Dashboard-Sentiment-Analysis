import { useContext } from "react";
import { ScraperContext } from "../context/ScraperContext";

export const useScrapers = () => {
  const ctx = useContext(ScraperContext);
  if (!ctx) {
    throw new Error("useScrapers must be used inside ScraperProvider");
  }
  return ctx;
};