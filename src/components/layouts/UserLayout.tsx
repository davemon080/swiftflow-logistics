import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import {
  LayoutDashboard,
  PackagePlus,
  Navigation2,
  History,
  Wallet,
  Bell,
  User,
  Settings,
  LifeBuoy,
  Menu,
  Sun,
  Moon,
  Search,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/book", label: "Book Delivery", icon: PackagePlus },
  { to: "/track", label: "Track Delivery", icon: Navigation2 },
  { to: "/history", label: "History", icon: History },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/support", label: "Support", icon: LifeBuoy },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1 px-3">
      {nav.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icon className={cn("h-4 w-4", active ? "" : "group-hover:text-brand")} />
            {label}
            {label === "Notifications" && (
              <span className="ml-auto rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-brand-foreground">3</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function UserLayout({ children, title, subtitle, action }: { children: ReactNode; title?: string; subtitle?: string; action?: ReactNode }) {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <NavItems />
        </div>
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-xl bg-accent/50 p-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-brand text-brand-foreground text-xs font-semibold">AK</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">Ada Kelechi</p>
              <p className="truncate text-xs text-muted-foreground">ada@swift.co</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex h-16 items-center border-b border-border px-6"><Logo /></div>
              <div className="py-4"><NavItems /></div>
            </SheetContent>
          </Sheet>

          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search deliveries, tracking numbers…"
              className="h-10 w-full rounded-full border border-border bg-muted/50 pl-10 pr-4 text-sm outline-none transition focus:border-brand focus:bg-background focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand" />
            </Button>
            <Avatar className="h-9 w-9 ring-2 ring-border">
              <AvatarFallback className="bg-brand text-brand-foreground text-xs font-semibold">AK</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 pb-24 pt-6 lg:px-8 lg:pb-10">
          {(title || action) && (
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                {title && <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">{title}</h1>}
                {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
              </div>
              {action}
            </div>
          )}
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-background/95 py-2 backdrop-blur lg:hidden">
        {nav.slice(0, 5).map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className="flex flex-1 flex-col items-center gap-1 px-2 py-1 text-[10px] font-medium text-muted-foreground [&.active]:text-brand" activeProps={{ className: "active" }}>
            <Icon className="h-5 w-5" />
            {label.split(" ")[0]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
