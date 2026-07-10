import { createFileRoute } from "@tanstack/react-router";
import { RiderLayout } from "@/components/layouts/RiderLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bike, ShieldCheck, FileText, CheckCircle2, Star } from "lucide-react";

export const Route = createFileRoute("/rider/profile")({
  head: () => ({ meta: [{ title: "Rider profile — Swift" }] }),
  component: RProfile,
});

function RProfile() {
  return (
    <RiderLayout>
      <div className="mb-6 flex flex-wrap items-center gap-5 rounded-2xl border border-border bg-gradient-to-br from-brand/10 via-card to-success/10 p-6">
        <Avatar className="h-20 w-20 ring-4 ring-background"><AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">TB</AvatarFallback></Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2"><h1 className="font-display text-2xl font-bold">Tunde Balogun</h1><Badge className="bg-success text-success-foreground">Verified</Badge></div>
          <p className="text-sm text-muted-foreground">Rider ID R-4082 · Lagos · Motorbike</p>
          <div className="mt-2 flex gap-4 text-sm">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" /> 4.92</span>
            <span className="text-muted-foreground">3,842 trips</span><span className="text-muted-foreground">3 yrs on Swift</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Vehicle" icon={Bike}>
          <Row label="Type" value="Motorbike" />
          <Row label="Model" value="Bajaj Boxer 150" />
          <Row label="Plate" value="KJA-234-XY" />
          <Row label="Color" value="Red" />
        </Card>
        <Card title="License & documents" icon={FileText}>
          {[
            { l: "Driver's license", s: "Verified" }, { l: "Insurance", s: "Verified" }, { l: "Vehicle papers", s: "Verified" }, { l: "Guarantor ID", s: "Verified" },
          ].map((d) => (
            <div key={d.l} className="flex items-center justify-between border-b border-border py-3 last:border-0">
              <div className="flex items-center gap-3"><FileText className="h-4 w-4 text-muted-foreground" /><p className="text-sm font-medium">{d.l}</p></div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-success"><CheckCircle2 className="h-3.5 w-3.5" /> {d.s}</span>
            </div>
          ))}
        </Card>
        <Card title="Availability" icon={ShieldCheck}>
          {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d, i) => (
            <div key={d} className="flex items-center justify-between border-b border-border py-2.5 last:border-0"><p className="text-sm font-medium">{d}</p><Switch defaultChecked={i < 6} /></div>
          ))}
        </Card>
        <Card title="Payout" icon={ShieldCheck}>
          <Row label="Bank" value="GTBank" /><Row label="Account" value="•••• 4821" /><Row label="Frequency" value="Weekly (Mondays)" />
          <Button variant="outline" className="mt-3 w-full rounded-xl">Update payout</Button>
        </Card>
      </div>
    </RiderLayout>
  );
}

function Card({ title, icon: Icon, children }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-center gap-2"><Icon className="h-4 w-4 text-brand" /><h3 className="font-display text-lg font-bold">{title}</h3></div>
      <div>{children}</div>
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between border-b border-border py-2.5 last:border-0 text-sm"><span className="text-muted-foreground">{label}</span><span className="font-semibold">{value}</span></div>;
}
