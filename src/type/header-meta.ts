export type HeaderMeta = {
  title: string;
  breadcrumbs: {
    title: string;
    href?: string;
  }[];
  showBack?: boolean;
}