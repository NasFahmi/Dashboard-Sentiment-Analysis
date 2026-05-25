import { useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "react-router";

import type { Scraper } from "@/features/Scraper/types/scraper";
import { useDatasetContextStore } from "@/store/useDatasetContextStore";

type DatasetContextStatus =
  | "resolving"
  | "ready"
  | "empty";

export const useDatasetContextSync = (scrapers: Scraper[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeDatasetId = useDatasetContextStore(
    (s) => s.activeDatasetId
  );
  const setActiveDatasetId = useDatasetContextStore(
    (s) => s.setActiveDatasetId
  );
  const clearActiveDatasetId = useDatasetContextStore(
    (s) => s.clearActiveDatasetId
  );

  const datasetFromUrl = searchParams.get("dataset");
  const hasHydratedFromUrl = useRef(false);

  /* =====================================================
   * 1. URL → STORE (HANYA SEKALI)
   * ===================================================== */
  useEffect(() => {
    if (hasHydratedFromUrl.current) return;

    if (datasetFromUrl) {
      setActiveDatasetId(datasetFromUrl);
    }

    hasHydratedFromUrl.current = true;
  }, [datasetFromUrl, setActiveDatasetId]);

  /* =====================================================
   * 2. AUTO SELECT DEFAULT
   * ===================================================== */
  useEffect(() => {
    if (!hasHydratedFromUrl.current) return;
    if (activeDatasetId) return;

    const firstAnalyzed = scrapers.find(
      (s) => s.is_analyzed
    );

    if (firstAnalyzed) {
      setActiveDatasetId(firstAnalyzed.id);
    }
  }, [activeDatasetId, scrapers, setActiveDatasetId]);

  /* =====================================================
   * 3. STORE → URL (MIRROR)
   * ===================================================== */
  useEffect(() => {
    if (!activeDatasetId) return;

    const current = searchParams.get("dataset");

    if (current !== activeDatasetId) {
      setSearchParams(
        { dataset: activeDatasetId },
        { replace: true }
      );
    }
  }, [activeDatasetId, searchParams, setSearchParams]);

  /* =====================================================
   * 4. RESOLVE ACTIVE DATASET
   * ===================================================== */
  const activeDataset = useMemo(
    () =>
      scrapers.find(
        (s) => s.id === activeDatasetId && s.is_analyzed
      ),
    [scrapers, activeDatasetId]
  );

  useEffect(() => {
    if (activeDatasetId && !activeDataset) {
      clearActiveDatasetId();
    }
  }, [activeDatasetId, activeDataset, clearActiveDatasetId]);

  /* =====================================================
   * 5. STATUS RESOLUTION (BERDASARKAN FAKTA DATA)
   * ===================================================== */
  const status: DatasetContextStatus = useMemo(() => {
    if (activeDataset) {
      return "ready";
    }

    const hasCandidate = scrapers.some(
      (s) => s.is_analyzed
    );

    if (!hasCandidate) {
      return "empty";
    }

    return "resolving";
  }, [activeDataset, scrapers]);

  return {
    activeDataset,
    activeDatasetId,
    status,
  };
};
