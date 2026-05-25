import type { HeaderMeta } from "@/type/header-meta";
import { create } from "zustand";



type HeaderStore = {
  meta: HeaderMeta;
  setHeaderMeta: (meta: HeaderMeta) => void;
  resetHeaderMeta: () => void;
}
export const useHeaderStore = create<HeaderStore>((set) => ({
  meta: {
    title: "",
    breadcrumbs: [],
    showBack: false,
  },
  setHeaderMeta: (meta) => set({ meta }),
  resetHeaderMeta: () => set({ meta: { title: "", breadcrumbs: [], showBack: false } }),
}));