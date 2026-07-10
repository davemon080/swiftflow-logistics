import { createFileRoute } from "@tanstack/react-router";
import { RiderLayout } from "@/components/layouts/RiderLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/brand/StatCard";
import { Wallet, TrendingUp, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/rider/history")({
  head: () => ({ meta: [{ title: "History — Swift Rider" }] }),
  component: RHist,
});
const rows = Array.from({ length: 6 }, (_, i) => ({
  id: `SW-${8240 - i}`, from: ["Yaba","Ikeja","VI","Ajah","Ikoyi","Surulere"][i], to: ["Lekki","VI","Yaba","Ikeja","Ajah","Ikoyi"][i], date: `${17 - i} Nov`, amount: `₦${(2400 + i * 300).toLocaleString()}`,
  status: (["Delivered","Delivered","Cancelled","Delivered","Delivered","Delivered"] as const)[i],
}));

function RHist() {
  return (
    <RiderLayout>
      <h1 className="mb-6 font-display text-3xl font-bold">History & Earnings</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="This week" value="₦84,200" icon={Wallet} delta="18%" accent="success" />
        <StatCard label="This month" value="₦318,900" icon={TrendingUp} delta="24%" accent="brand" />
        <StatCard label="Available payout" value="₦52,400" icon={ArrowUpRight} accent="info" />
      </div>
      <Tabs defaultValue="completed">
        <TabsList className="rounded-full bg-muted/50 p-1">
          <TabsTrigger value="completed" className="rounded-full">Completed</TabsTrigger>
          <TabsTrigger value="cancelled" className="rounded-full">Cancelled</TabsTrigger>
          <TabsTrigger value="earnings" className="rounded-full">Earnings</TabsTrigger>
        </TabsList>
        <TabsContent value="completed" className="mt-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase text-muted-foreground"><tr><th className="p-4 text-left">ID</th><th className="p-4 text-left">Route</th><th className="p-4 text-left">Date</th><th className="p-4 text-left">Status</th><th className="p-4 text-right">You earned</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-muted/30"><td className="p-4 font-mono text-xs font-semibold">{r.id}</td><td className="p-4">{r.from} → {r.to}</td><td className="p-4 text-muted-foreground">{r.date}</td><td className="p-4"><Badge variant="outline" className={r.status === "Delivered" ? "border-success/20 bg-success/10 text-success" : "border-destructive/20 bg-destructive/10 text-destructive"}>{r.status}</Badge></td><td className="p-4 text-right font-semibold">{r.amount}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="cancelled" className="mt-4">
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">No cancellations this week. Keep it up! 🎉</div>
        </TabsContent>
        <TabsContent value="earnings" className="mt-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-end gap-2 h-40">
              {[45, 60, 55, 80, 65, 90, 70, 85, 95, 60, 75, 80].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-brand to-brand/60" style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">Last 12 weeks</p>
            <Button className="mt-4 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90">Withdraw ₦52,400</Button>
          </div>
        </TabsContent>
      </Tabs>
    </RiderLayout>
  );
}
