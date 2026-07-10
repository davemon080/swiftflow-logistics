import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  trend = "up",
  accent = "brand",
  className,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  delta?: string;
  trend?: "up" | "down";
  accent?: "brand" | "info" | "success" | "warning";
  className?: string;
}) {
  const accentMap = {
    brand: "bg-accent text-brand",
    info: "bg-info/10 text-info",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning",
  };
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className={cn("grid h-10 w-10 place-items-center rounded-xl", accentMap[accent])}>
          <Icon className="h-5 w-5" />
        </span>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              trend === "up" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
            )}
          >
            {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">{value}</p>
      </div>
    </div>
  );
}
