import { useHeaderStore } from "@/store/useHeaderStore";
import { Menu, ChevronLeft } from "lucide-react";
import { useSidebarStore } from "@/store/useSidebarStore";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";

const TopHeaderBarComponent = () => {
  const toggle = useSidebarStore((s) => s.toggle);
  const { username } = useAuth();
  const { title, breadcrumbs, showBack } = useHeaderStore(
    (s) => s.meta
  );

  return (
    <div className="flex items-center justify-between h-[90px] border-b border-border bg-white px-5 md:px-8">
      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        <button
          onClick={toggle}
          className="lg:hidden size-11 flex items-center justify-center rounded-xl ring-1 ring-border"
        >
          <Menu className="size-6" />
        </button>

        {/* Mobile back */}
        {showBack && (
          <button
            onClick={() => window.history.back()}
            className="lg:hidden size-9 flex items-center justify-center rounded-lg ring-1 ring-border"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

        {/* Mobile title */}
        <span className="lg:hidden font-medium text-foreground truncate">
          {title}
        </span>

        {/* Desktop breadcrumb */}
        <nav className="hidden lg:flex items-center text-xs text-slate-500 gap-2">
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;

            return (
              <span key={item.title + idx} className="flex items-center gap-2">
                {idx !== 0 && <span>/</span>}

                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className="hover:text-(--color-logo-1) transition-colors"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? "text-slate-900 font-medium"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold text-sm">{username}</p>
          <p className="text-xs text-slate-600">User</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
          className="size-11 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default TopHeaderBarComponent;
