import { createFileRoute, Link } from "@tanstack/react-router";
import { UserLayout } from "@/components/layouts/UserLayout";
import { StatCard } from "@/components/brand/StatCard";
import { MapPlaceholder } from "@/components/brand/MapPlaceholder";
import { Button } from "@/components/ui/button";
import { Package, Wallet, Clock, TrendingUp, ArrowRight, PackagePlus, MapPin, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Swift" }] }),
  component: Dashboard,
});

const recent = [
  { id: "SW-8241", from: "Yaba", to: "Lekki Phase 1", status: "In transit", amount: "₦2,400" },
  { id: "SW-8237", from: "Ikeja", to: "Victoria Island", status: "Delivered", amount: "₦3,200" },
  { id: "SW-8231", from: "Surulere", to: "Ajah", status: "Delivered", amount: "₦4,100" },
  { id: "SW-8228", from: "Ikoyi", to: "Mainland", status: "Cancelled", amount: "₦0" },
];
const statusColor: Record<string, string> = {
  "In transit": "bg-info/10 text-info border-info/20",
  "Delivered": "bg-success/10 text-success border-success/20",
  "Cancelled": "bg-destructive/10 text-destructive border-destructive/20",
};

function Dashboard() {
  return (
    <UserLayout
      title="Welcome back, Ada 👋"
      subtitle="Here's what's moving today"
      action={<Button asChild className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/book"><PackagePlus className="mr-2 h-4 w-4" /> Book delivery</Link></Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active deliveries" value="2" icon={Truck} delta="+1" accent="brand" />
        <StatCard label="This month" value="₦48,200" icon={Wallet} delta="12%" accent="success" />
        <StatCard label="Total deliveries" value="124" icon={Package} delta="8%" accent="info" />
        <StatCard label="Avg. delivery time" value="34 min" icon={Clock} delta="4 min" trend="down" accent="warning" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Active delivery */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">Active delivery</p>
              <p className="mt-1 font-display text-xl font-bold">#SW-8241</p>
            </div>
            <Button asChild variant="outline" className="rounded-full"><Link to="/track">Track live <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
          <MapPlaceholder className="h-64 rounded-none border-0" label="Rider en route" />
          <div className="grid gap-4 p-5 sm:grid-cols-3">
            <div><p className="text-xs text-muted-foreground">ETA</p><p className="mt-1 font-display text-xl font-bold">14 min</p></div>
            <div><p className="text-xs text-muted-foreground">Distance</p><p className="mt-1 font-display text-xl font-bold">4.2 km</p></div>
            <div><p className="text-xs text-muted-foreground">Rider</p><p className="mt-1 font-display text-xl font-bold">Tunde B.</p></div>
          </div>
        </div>

        {/* Quick book */}
        <div className="rounded-2xl border border-border bg-gradient-to-br from-brand/10 via-card to-info/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Quick book</p>
          <h3 className="mt-2 font-display text-2xl font-bold">New delivery</h3>
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-info/15 text-info"><MapPin className="h-4 w-4" /></div>
              <input placeholder="Pickup location" className="flex-1 bg-transparent text-sm outline-none" />
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-brand/15 text-brand"><MapPin className="h-4 w-4" /></div>
              <input placeholder="Drop-off location" className="flex-1 bg-transparent text-sm outline-none" />
            </div>
          </div>
          <Button asChild className="mt-5 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/book">Continue <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Est. price</span><span className="font-semibold text-foreground">₦2,400</span>
          </div>
        </div>
      </div>

      {/* Recent */}
      <div className="mt-6 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between p-5">
          <div>
            <h3 className="font-display text-lg font-bold">Recent deliveries</h3>
            <p className="text-xs text-muted-foreground">Your last 4 shipments</p>
          </div>
          <Button asChild variant="ghost" className="text-brand"><Link to="/history">View all →</Link></Button>
        </div>
        <div className="overflow-x-auto border-t border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr><th className="p-4 text-left font-semibold">ID</th><th className="p-4 text-left font-semibold">Route</th><th className="p-4 text-left font-semibold">Status</th><th className="p-4 text-right font-semibold">Amount</th></tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id} className="border-t border-border transition hover:bg-muted/40">
                  <td className="p-4 font-mono text-xs font-semibold">{r.id}</td>
                  <td className="p-4"><span className="text-foreground">{r.from}</span> <span className="text-muted-foreground">→</span> <span className="text-foreground">{r.to}</span></td>
                  <td className="p-4"><Badge variant="outline" className={statusColor[r.status]}>{r.status}</Badge></td>
                  <td className="p-4 text-right font-semibold">{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </UserLayout>
  );
}
