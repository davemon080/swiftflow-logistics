import { createFileRoute } from "@tanstack/react-router";
import { RiderLayout } from "@/components/layouts/RiderLayout";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation2, Clock, DollarSign, Package } from "lucide-react";

export const Route = createFileRoute("/rider/jobs")({
  head: () => ({ meta: [{ title: "Jobs — Swift Rider" }] }),
  component: Jobs,
});

const jobs = [
  { id: "SW-8242", from: "Ikeja City Mall", to: "Magodo Phase 2", price: "₦2,800", dist: "5.1 km", eta: "26 min", pkg: "Documents" },
  { id: "SW-8243", from: "Yaba Market", to: "Surulere", price: "₦1,900", dist: "3.4 km", eta: "18 min", pkg: "Food" },
  { id: "SW-8244", from: "Lekki Phase 1", to: "Ajah", price: "₦3,500", dist: "8.7 km", eta: "35 min", pkg: "E-commerce" },
];

function Jobs() {
  return (
    <RiderLayout>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold">Incoming jobs</h1>
        <p className="text-sm text-muted-foreground">Accept quickly — jobs expire in 30 seconds.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {jobs.map((j, i) => (
          <div key={j.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between border-b border-border bg-brand/5 p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-brand-foreground text-xs font-bold">#{i + 1}</span>
                <p className="font-mono text-sm font-semibold">{j.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <svg className="h-8 w-8 -rotate-90" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" strokeWidth="3" fill="none" stroke="var(--border)" /><circle cx="16" cy="16" r="14" strokeWidth="3" fill="none" stroke="var(--brand)" strokeDasharray={88} strokeDashoffset={88 * (1 - (30 - 15 + i * 3) / 30)} strokeLinecap="round" /></svg>
                  <span className="absolute inset-0 grid place-items-center text-[10px] font-bold">{30 - 15 + i * 3}s</span>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <Row icon={MapPin} accent="bg-info/15 text-info" label="Pickup" value={j.from} />
              <Row icon={Navigation2} accent="bg-brand/15 text-brand" label="Drop-off" value={j.to} />
              <div className="grid grid-cols-4 gap-2 border-t border-border pt-3">
                <Stat icon={DollarSign} value={j.price} label="Fare" />
                <Stat icon={MapPin} value={j.dist} label="Distance" />
                <Stat icon={Clock} value={j.eta} label="ETA" />
                <Stat icon={Package} value={j.pkg} label="Type" />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 rounded-xl">Decline</Button>
                <Button className="flex-1 rounded-xl bg-success text-success-foreground hover:bg-success/90">Accept</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </RiderLayout>
  );
}

function Row({ icon: Icon, accent, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${accent}`}><Icon className="h-4 w-4" /></div>
      <div className="min-w-0"><p className="text-[10px] font-semibold uppercase text-muted-foreground">{label}</p><p className="truncate text-sm font-semibold">{value}</p></div>
    </div>
  );
}
function Stat({ icon: Icon, value, label }: any) {
  return <div className="text-center"><Icon className="mx-auto h-3.5 w-3.5 text-muted-foreground" /><p className="mt-1 text-xs font-bold">{value}</p><p className="text-[10px] text-muted-foreground">{label}</p></div>;
}
