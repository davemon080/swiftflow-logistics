import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/components/layouts/UserLayout";
import { MapPlaceholder } from "@/components/brand/MapPlaceholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bike, Car, Truck, MapPin, Package, Clock, DollarSign, Navigation2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  head: () => ({ meta: [{ title: "Book delivery — Swift" }] }),
  component: Book,
});

const vehicles = [
  { id: "bike", label: "Motorbike", icon: Bike, cap: "≤ 20kg", price: "₦1,500", eta: "20 min" },
  { id: "car", label: "Car", icon: Car, cap: "≤ 300kg", price: "₦3,800", eta: "30 min" },
  { id: "van", label: "Van", icon: Truck, cap: "≤ 1,500kg", price: "₦12,000", eta: "45 min" },
];

function Book() {
  const [vehicle, setVehicle] = useState("bike");
  return (
    <UserLayout title="Book a delivery" subtitle="Set up your pickup and drop-off in seconds.">
      <div className="grid gap-6 lg:grid-cols-[1fr,420px]">
        <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
          <MapPlaceholder className="h-[420px] rounded-none border-0" label="Choose locations" />
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Route</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-info text-info-foreground"><MapPin className="h-4 w-4" /></div>
                <div className="flex-1"><p className="text-[10px] font-semibold uppercase text-muted-foreground">Pickup</p><input placeholder="Search pickup address" className="w-full bg-transparent text-sm outline-none" /></div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-brand text-brand-foreground"><Navigation2 className="h-4 w-4" /></div>
                <div className="flex-1"><p className="text-[10px] font-semibold uppercase text-muted-foreground">Drop-off</p><input placeholder="Search drop-off address" className="w-full bg-transparent text-sm outline-none" /></div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Vehicle</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {vehicles.map((v) => (
                <button key={v.id} onClick={() => setVehicle(v.id)} className={cn("rounded-xl border p-3 text-left transition", vehicle === v.id ? "border-brand bg-accent shadow-sm" : "border-border hover:border-brand/40")}>
                  <v.icon className={cn("h-5 w-5", vehicle === v.id ? "text-brand" : "text-muted-foreground")} />
                  <p className="mt-2 text-sm font-semibold">{v.label}</p>
                  <p className="text-[10px] text-muted-foreground">{v.cap}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Package</p>
            <div className="mt-3 grid gap-3">
              <div>
                <Label>Package type</Label>
                <Select><SelectTrigger className="mt-1.5 h-11 rounded-xl"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent><SelectItem value="doc">Documents</SelectItem><SelectItem value="food">Food</SelectItem><SelectItem value="ecomm">E-commerce</SelectItem><SelectItem value="fragile">Fragile</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label>Weight (kg)</Label><Input className="mt-1.5 h-11 rounded-xl" placeholder="e.g. 2.5" /></div>
              <div><Label>Description</Label><Textarea placeholder="Anything the rider should know?" className="mt-1.5 rounded-xl" /></div>
            </div>
          </div>

          <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-accent p-5">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div><DollarSign className="mx-auto h-4 w-4 text-brand" /><p className="mt-1 text-[10px] uppercase text-muted-foreground">Price</p><p className="font-display text-lg font-bold">₦2,400</p></div>
              <div><Clock className="mx-auto h-4 w-4 text-brand" /><p className="mt-1 text-[10px] uppercase text-muted-foreground">ETA</p><p className="font-display text-lg font-bold">28 min</p></div>
              <div><Package className="mx-auto h-4 w-4 text-brand" /><p className="mt-1 text-[10px] uppercase text-muted-foreground">Distance</p><p className="font-display text-lg font-bold">6.4 km</p></div>
            </div>
            <Button className="mt-4 h-12 w-full rounded-xl bg-brand text-brand-foreground text-base font-semibold hover:bg-brand/90 shadow-[var(--shadow-glow)]">Book delivery</Button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
