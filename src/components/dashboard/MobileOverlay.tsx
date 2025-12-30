import { useSidebar } from '@/hooks/useSidebar';


const MobileOverlay = () => {
  const { close } = useSidebar();

  return (
    <div
      id="sidebar-overlay"
      className="fixed inset-0 bg-black/80 z-40 lg:hidden transition-opacity duration-200"
      // Gunakan onClick, bukan atribut 'on'
      onClick={close}
      role="presentation"
      aria-hidden="true"
    />
  );
};

export default MobileOverlay;