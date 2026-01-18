//shared/query_keys.ts
export const scraperKeys = {
  all: ["scraper"] as const,
  list: () => [...scraperKeys.all, "list"] as const,
  detail: (id: string) => [...scraperKeys.all, "detail", id] as const,
};


export const recomendationKeys = {
  all: ["recomendation"] as const,
  list: () => [...recomendationKeys.all, "list"] as const,
  detail: (id: string) => [...recomendationKeys.all, "detail", id] as const,
};

export const sentimentKeys = {
  all: ["sentiment"] as const,
  list: () => [...sentimentKeys.all, "list"] as const,
  detail: (id: string) => [...sentimentKeys.all, "detail", id] as const,
};

export const dashboardKeys = {
  all: ["dashboard"] as const,

  // satu dashboard per dataset
  detail: (datasetId: string) =>
    [...dashboardKeys.all, "detail", datasetId] as const,

  // ===== SUB QUERIES (INTERNAL) =====

  absa: (datasetId: string) =>
    [...dashboardKeys.all, "detail", datasetId, "absa"] as const,

  recommendation: (datasetId: string) =>
    [...dashboardKeys.all, "detail", datasetId, "recommendation"] as const,
};