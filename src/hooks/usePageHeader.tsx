import { useHeaderStore } from "@/store/useHeaderStore";
import { useEffect } from "react";
import type { HeaderMeta } from "@/type/header-meta";

export const usePageHeader = (meta: HeaderMeta) => {
  const setHeaderMeta = useHeaderStore((s) => s.setHeaderMeta);
  const resetHeaderMeta = useHeaderStore((s) => s.resetHeaderMeta);
  useEffect(() => {
    setHeaderMeta(meta);
    return () => {
      resetHeaderMeta();
    };
  }, [setHeaderMeta, meta, resetHeaderMeta]);


};