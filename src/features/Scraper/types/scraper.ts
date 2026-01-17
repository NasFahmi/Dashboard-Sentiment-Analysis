export interface ScraperResponse {
  message: string;
  data: Datum[];
}

export interface Datum {
  id: string;
  username: string;
  fullname: string;
  bio: string;
  post_count: number;
  is_analyzed: boolean;
  createdAt: string; // string dari API
}

export interface Scraper {
  id: string;
  username: string;
  fullname: string;
  bio: string;
  post_count: number;
  is_analyzed: boolean;
}

export const mapToScraper = (data: Datum[]): Scraper[] => {
  return data.map((item) => ({
    id: item.id,
    username: item.username,
    fullname: item.fullname,
    bio: item.bio,
    post_count: item.post_count,
    is_analyzed: item.is_analyzed,
  }));
};


export interface ScraperDeleteResponse {
  message: string;
}