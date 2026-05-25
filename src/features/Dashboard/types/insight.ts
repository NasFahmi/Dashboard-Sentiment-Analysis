export interface InsightResponse {
  message: string;
  data: string;
}

export interface CachedInsight {
  data: InsightResponse;
  timestamp: number;
  expiresAt: number;
}