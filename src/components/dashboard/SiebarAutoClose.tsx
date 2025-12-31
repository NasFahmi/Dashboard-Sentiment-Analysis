import { useEffect } from "react";
import { useLocation } from "react-router";
import { useSidebarStore } from "@/store/useSidebarStore";

const SidebarAutoClose = () => {
  const location = useLocation();
  const close = useSidebarStore((state) => state.close);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  return null;
};

export default SidebarAutoClose;
