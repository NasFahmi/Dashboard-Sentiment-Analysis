import { useSidebarStore } from "@/store/useSidebarStore";

const MobileOverlay = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const close = useSidebarStore((state) => state.close);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-40 lg:hidden"
      onClick={close}
    />
  );
};

export default MobileOverlay;
