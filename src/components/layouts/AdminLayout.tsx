import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import {
  LayoutDashboard,
  Users,
  Bike,
  Package,
  Map,
  CreditCard,
  Settings,
  ScrollText,
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/adminv1/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/adminv1/users", label: "Users", icon: Users },
  { to: "/adminv1/riders", label: "Riders", icon: Bike },
  { to: "/adminv1/deliveries", label: "Deliveries", icon: Package },
  { to: "/adminv1/live-map", label: "Live Map", icon: Map },
  { to: "/adminv1/payments", label: "Payments", icon: CreditCard },
  { to: "/adminv1/settings", label: "Settings", icon: Settings },
  { to: "/adminv1/logs", label: "Activity Logs", icon: ScrollText },
];

function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-0.5 px-3">
      <p className="px-3 pb-2 pt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Operations</p>
      {nav.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
              active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminLayout({ children, title, subtitle, action }: { children: ReactNode; title?: string; subtitle?: string; action?: ReactNode }) {
  const { theme, toggle } = useTheme();
  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-6"><Logo /></div>
        <div className="flex-1 overflow-y-auto py-3"><AdminNav /></div>
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-xl bg-sidebar-accent/60 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Admin</p>
            <p className="mt-1 text-sm font-semibold">Ops Console v1.0</p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-xl lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground">
              <div className="flex h-16 items-center border-b border-sidebar-border px-6"><Logo /></div>
              <div className="py-3"><AdminNav /></div>
            </SheetContent>
          </Sheet>
          <div className="relative hidden max-w-sm flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search orders, users, riders…" className="h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden gap-2 sm:inline-flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" /> System healthy
            </Button>
            <Button variant="ghost" size="icon" onClick={toggle}>{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            <Avatar className="h-9 w-9 ring-2 ring-border"><AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">OP</AvatarFallback></Avatar>
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8">
          {(title || action) && (
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                {title && <h1 className="font-display text-2xl font-bold tracking-tight text-foreground lg:text-3xl">{title}</h1>}
                {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
              </div>
              {action}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
