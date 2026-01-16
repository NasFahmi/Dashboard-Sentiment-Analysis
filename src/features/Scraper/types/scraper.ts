export interface ScraperResponse {
  message: string;
  data: Datum[];
}

export interface Datum {
  id: string;
  username: string;
  fullname: string;
  bio: string;
  postCount: number;
  is_analyzed: boolean;
  createdAt: string; // string dari API
}

export interface Scraper {
  id: string;
  username: string;
  fullname: string;
  bio: string;
  postCount: number;
  is_analyzed: boolean;
  createdAt: Date; // Date object di frontend
}

export const mapToScraper = (data: Datum[]): Scraper[] => {
  return data.map((item) => ({
    id: item.id,
    username: item.username,
    fullname: item.fullname,
    bio: item.bio,
    postCount: item.postCount,
    is_analyzed: item.is_analyzed,
    createdAt: new Date(item.createdAt), // Konversi string ke Date
  }));
};