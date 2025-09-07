// types/Analysis.d.ts
export interface Analysis {
  ringkasan_keseluruhan: RingkasanKeseluruhan;
  sentimen_per_kategori: { [key: string]: SentimenKategori };
  sentimen_per_brand: { [key: string]: SentimenBrand };
  engagement_per_sentimen: EngagementPerSentimen;
  faktor_positif_top10: Keyword[];
  faktor_negatif_top10: Keyword[];
}

export interface RingkasanKeseluruhan {
  Netral: SentimenSummary;
  Positif: SentimenSummary;
  Negatif: SentimenSummary;
}

export interface SentimenSummary {
  jumlah: number;
  persentase: number;
}

export interface SentimenKategori {
  positif: number;
  negatif: number;
  netral: number;
  total: number;
  rasio_positif: number;
}

export interface SentimenBrand {
  positif: number;
  negatif: number;
  netral: number;
  total: number;
  rasio_positif: number;
  rasio_negatif: number;
  rasio_netral: number;
}

export interface EngagementPerSentimen {
  Negatif: EngagementMetrics;
  Netral: EngagementMetrics;
  Positif: EngagementMetrics;
}

export interface EngagementMetrics {
  avg_engagement: number;
  avg_likes: number;
  avg_shares: number;
}

export interface Keyword {
  kata: string;
  jumlah: number;
}