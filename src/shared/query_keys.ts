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
};


export const insightKeys = {
  all: ["insight"] as const,
  list: () => [...insightKeys.all, "list"] as const,
  detail: (id: string) => [...insightKeys.all, "detail", id] as const,
};


export const chatbotKeys = {
  all: ["chatbot"] as const,
  list: () => [...chatbotKeys.all, "list"] as const,
  detail: (id: string) => [...chatbotKeys.all, "detail", id] as const,
};