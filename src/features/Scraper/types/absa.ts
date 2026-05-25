// type for analyze absa 
export interface AnalyzeABSAResponse {
  message: string;
  data: Data;
}

export interface Data {
  sentimentResult: string;
  recommendationResult: string;
}

export interface AnalyzeABSAPayload {
  scraperId: string;
}

