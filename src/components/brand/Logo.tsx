import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, to = "/", variant = "default" }: { className?: string; to?: string; variant?: "default" | "light" }) {
  return (
    <Link to={to} className={cn("group inline-flex items-center gap-2", className)}>
      <span
        className="grid h-9 w-9 place-items-center rounded-xl text-brand-foreground shadow-[var(--shadow-glow)] transition-transform group-hover:scale-105"
        style={{ background: "var(--gradient-brand)" }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h13l-3-3m3 3l-3 3" />
          <path d="M20 6v12" />
        </svg>
      </span>
      <span className={cn("font-display text-xl font-bold tracking-tight", variant === "light" ? "text-white" : "text-foreground")}>
        Swift<span className="text-brand">.</span>
      </span>
    </Link>
  );
}
