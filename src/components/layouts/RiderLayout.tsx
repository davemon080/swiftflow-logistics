import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useState, type ReactNode } from "react";
import { LayoutDashboard, Inbox, Navigation2, History, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/rider/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/rider/jobs", label: "Jobs", icon: Inbox },
  { to: "/rider/navigation", label: "Navigation", icon: Navigation2 },
  { to: "/rider/history", label: "History", icon: History },
  { to: "/rider/profile", label: "Profile", icon: User },
];

function RiderNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex flex-col gap-1 p-3">
      {nav.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
              active ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-accent",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export function RiderLayout({ children }: { children: ReactNode }) {
  const [online, setOnline] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-border px-5"><Logo /></div>
        <div className="flex-1 overflow-y-auto"><RiderNav /></div>
        <div className="border-t border-border p-4">
          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className={cn("text-sm font-bold", online ? "text-success" : "text-muted-foreground")}>
                  {online ? "Online" : "Offline"}
                </p>
              </div>
              <Switch checked={online} onCheckedChange={setOnline} />
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-xl">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex h-16 items-center border-b border-border px-5"><Logo /></div>
              <RiderNav />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2 lg:hidden"><Logo /></div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 sm:flex">
              <span className={cn("h-2 w-2 rounded-full", online ? "bg-success animate-pulse" : "bg-muted-foreground")} />
              <span className="text-xs font-semibold text-foreground">{online ? "Online" : "Offline"}</span>
              <Switch checked={online} onCheckedChange={setOnline} className="ml-1 scale-75" />
            </div>
            <Avatar className="h-9 w-9 ring-2 ring-brand/30">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">TM</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="px-4 pb-24 pt-5 lg:pb-10 lg:px-8">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-background/95 py-1 backdrop-blur lg:hidden">
        {nav.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className="flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium text-muted-foreground [&.active]:text-brand" activeProps={{ className: "active" }}>
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
