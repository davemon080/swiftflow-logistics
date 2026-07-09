import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

export function AuthShell({
  children,
  title,
  subtitle,
  footer,
  tone = "user",
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  tone?: "user" | "rider" | "admin";
}) {
  const gradients = {
    user: "from-brand/20 via-background to-info/10",
    rider: "from-success/15 via-background to-brand/15",
    admin: "from-primary/20 via-background to-primary/5",
  };
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className={cn("relative hidden overflow-hidden bg-gradient-to-br p-10 lg:flex lg:flex-col", gradients[tone])}>
        <Logo />
        <div className="relative z-10 mt-auto max-w-md">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Swift Logistics</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground">
            Move anything, anywhere, in minutes.
          </h2>
          <p className="mt-4 text-muted-foreground">
            One platform for on-demand pickup, live tracking, and fleet operations across cities.
          </p>
          <div className="mt-8 flex gap-6 text-sm">
            <div><p className="font-display text-2xl font-bold">2.4M+</p><p className="text-muted-foreground">Deliveries</p></div>
            <div><p className="font-display text-2xl font-bold">18k</p><p className="text-muted-foreground">Riders</p></div>
            <div><p className="font-display text-2xl font-bold">42</p><p className="text-muted-foreground">Cities</p></div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/2 h-64 w-64 rounded-full bg-info/20 blur-3xl" />
      </div>

      <div className="flex flex-col justify-center px-6 py-10 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
          <p className="mt-10 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
