import { useSidebar } from '@/hooks/useSidebar'; // Pastikan path sesuai
import {Menu, Bell, } from 'lucide-react'
const TopHeaderBarComponent = () => {
  const { toggle } = useSidebar(); // Ambil fungsi toggle dari hook

  return (
    <div>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between w-full h-[90px] shrink-0 border-b border-border bg-white px-5 md:px-8">
        {/* Mobile hamburger */}
        <button
          onClick={toggle} // ✅ 
          aria-label="Open menu"
          className="lg:hidden size-11 flex items-center justify-center rounded-xl ring-1 ring-border hover:ring-primary transition-all duration-300 cursor-pointer"
        >
          <Menu className="size-6 text-foreground" />
        </button>

        {/* Page title (shown on desktop) */}
        <h2 className="hidden lg:block font-bold text-2xl text-foreground">
          Dashboard
        </h2>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            className="size-11 flex items-center justify-center rounded-xl ring-1 ring-border hover:ring-primary transition-all duration-300 cursor-pointer relative"
            aria-label="Notifications"
          >
            <Bell className="size-6 text-secondary" />
            <span className="absolute -top-1 -right-1 h-5 px-1.5 rounded-full bg-error text-white text-xs font-medium flex items-center justify-center">
              3
            </span>
          </button>

          <div className="hidden md:flex items-center gap-3 pl-3 border-l border-border">
            <div className="text-right">
              <p className="font-semibold text-foreground text-sm">Admin User</p>
              <p className="text-secondary text-xs">Administrator</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Profile"
              className="size-11 rounded-full object-cover ring-2 ring-border"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeaderBarComponent;