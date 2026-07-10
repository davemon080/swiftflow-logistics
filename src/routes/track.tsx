import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/components/layouts/UserLayout";
import { MapPlaceholder } from "@/components/brand/MapPlaceholder";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Copy, Share2, Phone, MessageCircle, CheckCircle2, Circle, Clock, MapPin, Package } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track delivery — Swift" }] }),
  component: Track,
});

const timeline = [
  { label: "Order placed", time: "10:24", done: true },
  { label: "Rider assigned", time: "10:26", done: true },
  { label: "Picked up", time: "10:41", done: true },
  { label: "In transit", time: "Now", done: true, current: true },
  { label: "Delivered", time: "—", done: false },
];

function Track() {
  return (
    <UserLayout title="Track delivery" subtitle="Real-time location and status of your package">
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-brand"><Package className="h-4 w-4" /></div>
        <Input placeholder="Enter tracking number (e.g. SW-8241)" className="h-10 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0" defaultValue="SW-8241" />
        <Button className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90">Track</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <MapPlaceholder className="h-[500px] rounded-none border-0" label="#SW-8241 · Live" />
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 ring-2 ring-brand/30"><AvatarFallback className="bg-primary text-primary-foreground font-bold">TB</AvatarFallback></Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Your rider</p>
                <p className="truncate font-display text-lg font-bold">Tunde Balogun</p>
                <p className="text-xs text-muted-foreground">Motorbike · KJA-234-XY · 4.9 ★</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" className="rounded-xl"><Phone className="mr-2 h-4 w-4" /> Call</Button>
              <Button variant="outline" className="rounded-xl"><MessageCircle className="mr-2 h-4 w-4" /> Chat</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-muted-foreground">ETA</p><p className="mt-1 font-display text-2xl font-bold text-brand">14 min</p></div>
              <div><p className="text-xs text-muted-foreground">Distance left</p><p className="mt-1 font-display text-2xl font-bold">4.2 km</p></div>
            </div>
          </div>

          <div className="rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/10 to-accent p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Verification code</p>
            <p className="mt-2 font-display text-4xl font-bold tracking-[0.4em] text-foreground">4·2·8·1</p>
            <p className="mt-1 text-xs text-muted-foreground">Share only with your rider on arrival.</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1 rounded-xl"><Copy className="mr-2 h-4 w-4" /> Copy</Button>
              <Button variant="outline" className="flex-1 rounded-xl"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="font-display text-sm font-bold">Progress</p>
            <div className="mt-4 space-y-4">
              {timeline.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <div className="relative flex flex-col items-center">
                    {s.done ? <CheckCircle2 className={`h-5 w-5 ${s.current ? "text-brand animate-pulse" : "text-success"}`} /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                    {i < timeline.length - 1 && <div className={`mt-1 h-8 w-0.5 ${s.done ? "bg-success" : "bg-border"}`} />}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className={`text-sm font-semibold ${s.done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="font-display text-sm font-bold">Delivery info</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">From</span><span className="font-medium">Yaba, Lagos</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">To</span><span className="font-medium">Lekki Phase 1</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Package</span><span className="font-medium">Documents · 0.5kg</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-semibold text-brand">₦2,400</span></div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
