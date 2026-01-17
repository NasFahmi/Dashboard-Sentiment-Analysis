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