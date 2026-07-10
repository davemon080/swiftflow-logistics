import { cn } from "@/lib/utils";
import { MapPin, Navigation } from "lucide-react";
import type { ReactNode } from "react";

export function MapPlaceholder({
  className,
  showRoute = true,
  children,
  label = "Live Map",
}: {
  className?: string;
  showRoute?: boolean;
  children?: ReactNode;
  label?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border map-grid", className)}>
      {/* Route line */}
      {showRoute && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <path
            d="M 60 240 Q 120 180, 180 200 T 340 60"
            stroke="var(--brand)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        </svg>
      )}
      {/* Pickup pin */}
      <div className="absolute left-[12%] bottom-[18%] flex flex-col items-center">
        <div className="relative">
          <span className="absolute inset-0 animate-ping rounded-full bg-info/40" />
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-info text-info-foreground shadow-lg">
            <MapPin className="h-4 w-4" />
          </span>
        </div>
        <span className="mt-1 rounded-full bg-card px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-sm">Pickup</span>
      </div>
      {/* Drop pin */}
      <div className="absolute right-[10%] top-[14%] flex flex-col items-center">
        <div className="relative">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-brand text-brand-foreground shadow-lg">
            <Navigation className="h-4 w-4" />
          </span>
        </div>
        <span className="mt-1 rounded-full bg-card px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-sm">Drop-off</span>
      </div>
      {/* Rider marker */}
      <div className="absolute left-[48%] top-[52%]">
        <div className="grid h-10 w-10 place-items-center rounded-full border-4 border-white bg-primary text-primary-foreground shadow-xl">
          🛵
        </div>
      </div>

      <div className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
        {label}
      </div>
      {children}
    </div>
  );
}
