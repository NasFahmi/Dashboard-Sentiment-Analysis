import type { HeaderMeta } from "@/type/header-meta";

export const dashboardBreadcrumbs: HeaderMeta = {
  title: "Dashboard",
  breadcrumbs: [ { title: "Dashboard" } ],
  showBack: false,
};

export const sentimentBreadcrumbs: HeaderMeta = {
  title: "Sentiment Analysis",
  breadcrumbs: [
    { title: "Dashboard" },
    { title: "Sentiment Analysis" },
  ],
  showBack: false,
};
export const scrapesBreadcrumbs: HeaderMeta = {
  title: "Data Scraper",
  breadcrumbs: [
    { title: "Dashboard" },
    { title: "Data Scraper" },
  ],
  showBack: false,
};
export const scraperGuideBreadcrumbs: HeaderMeta = {
  title: "Guide",
  breadcrumbs: [
    { title: "Dashboard" },
    { title: "Data Scraper", href: "/dashboard/scrapes" },
    { title: "Guide" },
  ],
  showBack: true,
}

export const recomendationBreadcrumbs: HeaderMeta = {
  title: "Recomendation Content",
  breadcrumbs: [
    { title: "Dashboard" },
    { title: "Recomendation Content" },
  ],
  showBack: false,
}
