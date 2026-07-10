import { createFileRoute, Link } from "@tanstack/react-router";
import { RiderLayout } from "@/components/layouts/RiderLayout";
import { StatCard } from "@/components/brand/StatCard";
import { MapPlaceholder } from "@/components/brand/MapPlaceholder";
import { Button } from "@/components/ui/button";
import { Wallet, Package, Star, TrendingUp, ArrowRight, Navigation2, MapPin } from "lucide-react";

export const Route = createFileRoute("/rider/dashboard")({
  head: () => ({ meta: [{ title: "Rider dashboard — Swift" }] }),
  component: RDash,
});

function RDash() {
  return (
    <RiderLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Hey, Tunde 👋</h1>
          <p className="text-sm text-muted-foreground">Ready to earn today?</p>
        </div>
        <Button asChild className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/rider/jobs">See open jobs <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's earnings" value="₦18,400" icon={Wallet} delta="24%" accent="success" />
        <StatCard label="Jobs completed" value="12" icon={Package} delta="+3" accent="brand" />
        <StatCard label="Rating" value="4.92" icon={Star} accent="warning" />
        <StatCard label="Hours online" value="6h 42m" icon={TrendingUp} accent="info" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">Current job</p>
              <p className="mt-1 font-display text-xl font-bold">#SW-8241 · ₦2,400</p>
            </div>
            <Button asChild variant="outline" className="rounded-full"><Link to="/rider/navigation"><Navigation2 className="mr-2 h-4 w-4" /> Navigate</Link></Button>
          </div>
          <MapPlaceholder className="h-64 rounded-none border-0" label="Heading to pickup" />
          <div className="grid gap-4 p-5 sm:grid-cols-3">
            <div><p className="text-xs text-muted-foreground">Pickup</p><p className="mt-1 text-sm font-semibold">Yaba, Lagos</p></div>
            <div><p className="text-xs text-muted-foreground">Drop-off</p><p className="mt-1 text-sm font-semibold">Lekki Phase 1</p></div>
            <div><p className="text-xs text-muted-foreground">Distance</p><p className="mt-1 text-sm font-semibold">6.4 km</p></div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-gradient-to-br from-success/15 to-card p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-success">Weekly earnings</p>
          <p className="mt-3 font-display text-4xl font-bold">₦84,200</p>
          <p className="text-sm text-muted-foreground">42 jobs · Mon–Sun</p>
          <div className="mt-5 flex items-end gap-1.5 h-24">
            {[40, 60, 45, 80, 65, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-brand/80" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>
          <Button className="mt-5 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90">Withdraw</Button>
        </div>
      </div>
    </RiderLayout>
  );
}
