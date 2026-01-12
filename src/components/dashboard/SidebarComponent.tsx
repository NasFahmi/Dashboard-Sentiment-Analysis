// src/components/Sidebar.tsx
import { useEffect } from 'react';
import {
  X,
  LayoutDashboard,
  LogOut,
  Brain,
  Telescope,
  Lightbulb,
} from 'lucide-react';
import { assets } from '@/assets/assets';
import { Link, useLocation } from 'react-router';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useAuth } from "@/hooks/useAuth";

const SidebarComponent = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const close = useSidebarStore((state) => state.close);
  const authContext = useAuth();

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);
  const location = useLocation();

  // ✅ Prefix matching untuk nested routes
  const isActive = (basePath: string) => {
    const { pathname } = location;

    if (basePath === '/dashboard') {
      // Hanya aktif jika EXACT match
      return pathname === '/dashboard';
    }

    // Untuk semua menu lain: aktif jika prefix match
    return pathname === basePath || pathname.startsWith(`${basePath}/`);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <aside
      id="sidebar"
      className={`flex flex-col w-[280px] shrink-0 h-screen fixed inset-y-0 left-0 z-50 bg-white border-r border-border transform transition-transform duration-300 overflow-hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border h-[90px] px-5 gap-3">
        <div className="flex items-center gap-2">
          <img src={assets.Logo} className="w-7" alt="Logo" />
          <h1 className="font-semibold text-xl">Sentinela</h1>

        </div>
        <div className="flex gap-2">
          <button
            onClick={close}
            aria-label="Close sidebar"
            className="lg:hidden size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-border hover:ring-primary transition-all duration-300 cursor-pointer"
          >
            <X className="size-6 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col p-5 pb-28 gap-6 overflow-y-auto flex-1">
        {/* Main Menu */}
        <div className="flex flex-col gap-4">
          <h3 className="font-medium text-sm text-slate-500">Main Menu</h3>
          <div className="flex flex-col gap-1">
            <Link
              to="/dashboard"
              className={`group flex cursor-pointer ${isActive('/dashboard') ? 'active' : ''}`}
            >
              <div className="flex items-center w-full rounded-xl p-4 gap-3 bg-white group-[.active]:bg-muted group-hover:bg-muted transition-all duration-300">
                <LayoutDashboard
                  className="size-6 text-slate-500 group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300"
                />
                <span className="font-medium text-slate-500 group-[.active]:font-semibold group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300">
                  Dashboard
                </span>
              </div>
            </Link>

            <Link
              to="/dashboard/sentiments"
              className={`group flex cursor-pointer ${isActive('/dashboard/sentiments') ? 'active' : ''}`}
            >
              <div className="flex w-full items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-muted group-hover:bg-muted transition-all duration-300">
                <Brain
                  className="size-6 text-slate-500 group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300"
                />
                <span className="font-medium text-slate-500 group-[.active]:font-semibold group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300">
                  Sentiments
                </span>
              </div>
            </Link>

            <Link
              to="/dashboard/recommendation-content"
              className={`group flex cursor-pointer ${isActive('/dashboard/recommendation-content') ? 'active' : ''}`}
            >
              <div className="flex w-full items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-muted group-hover:bg-muted transition-all duration-300">
                <Lightbulb
                  className="size-6 text-slate-500 group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300"
                />
                <span className="font-medium text-slate-500 group-[.active]:font-semibold group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300">
                  Recommendation Content
                </span>
              </div>
            </Link>


            <Link
              to="/dashboard/scrapes"
              className={`group flex cursor-pointer ${isActive('/dashboard/scrapes') ? 'active' : ''}`}
            >
              <div className="flex w-full items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-muted group-hover:bg-muted transition-all duration-300">
                <Telescope
                  className="size-6 text-slate-500 group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300"
                />
                <span className="font-medium text-slate-500 group-[.active]:font-semibold group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300">
                  Data Scraper
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Management */}
        <div className="flex flex-col gap-4">
          <h3 className="font-medium text-sm text-slate-500">Management</h3>
          <div className="flex flex-col gap-1">
            <button onClick={authContext.logout} className="group flex cursor-pointer">
              <div className="flex w-full items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-muted group-hover:bg-muted transition-all duration-300">
                <LogOut
                  className="size-6  text-slate-500 group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300"
                />
                <span className="font-medium text-slate-500 group-[.active]:font-semibold group-[.active]:text-foreground group-hover:text-foreground transition-all duration-300">
                  Logout
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Help Card */}

    </aside>
  );
};

export default SidebarComponent;