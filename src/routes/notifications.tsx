import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/components/layouts/UserLayout";
import { Bell, CheckCircle2, Package, Truck, Wallet, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Swift" }] }),
  component: Notifications,
});

const items = [
  { icon: Truck, iconBg: "bg-info/10 text-info", title: "Your rider is arriving", body: "Tunde is 2 min away from your pickup location.", time: "2m ago", unread: true },
  { icon: CheckCircle2, iconBg: "bg-success/10 text-success", title: "Delivery completed", body: "SW-8237 delivered to Victoria Island. Rate your experience.", time: "3h ago", unread: true },
  { icon: Wallet, iconBg: "bg-warning/15 text-warning", title: "Wallet top-up successful", body: "₦20,000 added to your Swift wallet.", time: "Yesterday", unread: true },
  { icon: Package, iconBg: "bg-brand/15 text-brand", title: "Delivery scheduled", body: "SW-8231 scheduled for pickup tomorrow at 09:00.", time: "2d ago", unread: false },
  { icon: AlertCircle, iconBg: "bg-destructive/10 text-destructive", title: "Payment failed", body: "Card ending 4242 was declined. Please try another.", time: "3d ago", unread: false },
];

function Notifications() {
  return (
    <UserLayout title="Notifications" subtitle="Stay in the loop on every delivery.">
      <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center gap-3 p-4">
          <Input placeholder="Search notifications" className="h-10 flex-1 min-w-[220px] rounded-full" />
          <Button variant="outline" className="rounded-full">Mark all read</Button>
        </div>
        <ul className="divide-y divide-border border-t border-border">
          {items.map((n, i) => (
            <li key={i} className={`flex gap-4 p-5 transition hover:bg-muted/30 ${n.unread ? "bg-brand/5" : ""}`}>
              <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${n.iconBg}`}><n.icon className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-foreground">{n.title}</p>
                  {n.unread && <span className="h-2 w-2 rounded-full bg-brand" />}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                <p className="mt-2 text-xs text-muted-foreground">{n.time}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-5 text-center text-sm text-muted-foreground">
          <Bell className="mx-auto mb-2 h-4 w-4" /> You're all caught up.
        </div>
      </div>
    </UserLayout>
  );
}
