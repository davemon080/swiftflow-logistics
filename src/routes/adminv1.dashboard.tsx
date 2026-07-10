import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { StatCard } from "@/components/brand/StatCard";
import { MapPlaceholder } from "@/components/brand/MapPlaceholder";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Package, Bike, Users, Activity, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/adminv1/dashboard")({
  head: () => ({ meta: [{ title: "Admin dashboard — Swift" }] }),
  component: A,
});

function A() {
  return (
    <AdminLayout title="Overview" subtitle="Real-time operations across all cities.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenue (today)" value="₦8.4M" icon={DollarSign} delta="14%" accent="success" />
        <StatCard label="Orders (today)" value="2,847" icon={Package} delta="9%" accent="brand" />
        <StatCard label="Online riders" value="1,204" icon={Bike} delta="+82" accent="info" />
        <StatCard label="Active users" value="14,320" icon={Users} delta="3%" accent="warning" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div><h3 className="font-display text-lg font-bold">Revenue</h3><p className="text-xs text-muted-foreground">Last 30 days</p></div>
            <Badge variant="outline" className="border-success/20 bg-success/10 text-success">+14.2%</Badge>
          </div>
          <svg viewBox="0 0 600 200" className="mt-6 h-56 w-full">
            <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--brand)" stopOpacity="0.4" /><stop offset="1" stopColor="var(--brand)" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 160 L50 140 L100 130 L150 100 L200 120 L250 90 L300 80 L350 60 L400 70 L450 50 L500 30 L550 40 L600 20 L600 200 L0 200 Z" fill="url(#g)" />
            <path d="M0 160 L50 140 L100 130 L150 100 L200 120 L250 90 L300 80 L350 60 L400 70 L450 50 L500 30 L550 40 L600 20" fill="none" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-display text-lg font-bold">Order status</h3>
          <div className="mt-6 space-y-3">
            {[
              { l: "Delivered", v: 68, c: "bg-success" }, { l: "In transit", v: 22, c: "bg-info" }, { l: "Pending", v: 7, c: "bg-warning" }, { l: "Cancelled", v: 3, c: "bg-destructive" },
            ].map((r) => (
              <div key={r.l}><div className="flex justify-between text-xs font-medium"><span>{r.l}</span><span className="text-muted-foreground">{r.v}%</span></div><div className="mt-1 h-2 rounded-full bg-muted"><div className={`h-full rounded-full ${r.c}`} style={{ width: `${r.v}%` }} /></div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h3 className="font-display text-lg font-bold">Live deliveries</h3>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-success"><span className="h-2 w-2 animate-pulse rounded-full bg-success" /> 428 active</span>
          </div>
          <MapPlaceholder className="h-72 rounded-none border-0" label="Lagos · Real-time fleet" />
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h3 className="font-display text-lg font-bold">Recent activity</h3>
          <ul className="mt-4 space-y-4">
            {[
              { i: Activity, t: "Rider R-4082 completed SW-8241", ago: "2m" },
              { i: TrendingUp, t: "Peak hour surge (+30% orders)", ago: "12m" },
              { i: Users, t: "12 new user signups", ago: "1h" },
              { i: Bike, t: "8 new riders approved", ago: "2h" },
            ].map((a, i) => (
              <li key={i} className="flex gap-3"><a.i className="mt-0.5 h-4 w-4 text-brand" /><div className="flex-1"><p className="text-sm">{a.t}</p><p className="text-xs text-muted-foreground">{a.ago} ago</p></div></li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
