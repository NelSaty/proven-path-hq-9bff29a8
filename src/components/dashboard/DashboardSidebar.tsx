import { Link, useLocation } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export function DashboardSidebar({
  items,
  brand,
  subtitle,
}: {
  items: SidebarItem[];
  brand: string;
  subtitle: string;
}) {
  const location = useLocation();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card/40 lg:block">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col">
        <div className="flex items-center gap-3 border-b border-border px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-button text-primary-foreground">
            <Zap className="h-5 w-5" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">{brand}</div>
            <div className="text-[11px] text-coral">{subtitle}</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-button" />
                )}
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
