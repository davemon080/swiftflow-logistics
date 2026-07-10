import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileText, MapPin, XCircle, Star } from "lucide-react";
import { MapPlaceholder } from "@/components/brand/MapPlaceholder";

export const Route = createFileRoute("/adminv1/riders")({
  head: () => ({ meta: [{ title: "Riders — Admin" }] }),
  component: R,
});

const pending = [
  { name: "Ibrahim Musa", city: "Lagos", vehicle: "Motorbike", docs: 4 },
  { name: "Grace Etim", city: "Abuja", vehicle: "Car", docs: 4 },
  { name: "Segun Oke", city: "Ibadan", vehicle: "Motorbike", docs: 3 },
];
const active = Array.from({ length: 6 }, (_, i) => ({
  name: ["Tunde Balogun","Ngozi Eze","Femi Adio","Kunle Sanni","Chika Onu","Rasheed Bello"][i],
  id: `R-40${82 + i}`, city: "Lagos", trips: 100 + i * 40, rating: (4.7 + i * 0.05).toFixed(2), status: i % 4 === 3 ? "Suspended" : "Online",
}));

function R() {
  return (
    <AdminLayout title="Riders" subtitle="Manage the fleet, verifications, and live status.">
      <Tabs defaultValue="active">
        <TabsList className="rounded-full bg-muted/50 p-1"><TabsTrigger value="active" className="rounded-full">Active</TabsTrigger><TabsTrigger value="approval" className="rounded-full">Pending approval</TabsTrigger><TabsTrigger value="map" className="rounded-full">Live map</TabsTrigger></TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase text-muted-foreground"><tr><th className="p-4 text-left">Rider</th><th className="p-4 text-left">City</th><th className="p-4 text-left">Trips</th><th className="p-4 text-left">Rating</th><th className="p-4 text-left">Status</th><th className="p-4 text-right">Actions</th></tr></thead>
              <tbody>
                {active.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                    <td className="p-4"><div className="flex items-center gap-3"><Avatar className="h-9 w-9"><AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">{r.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar><div><p className="font-semibold">{r.name}</p><p className="text-xs font-mono text-muted-foreground">{r.id}</p></div></div></td>
                    <td className="p-4 text-muted-foreground">{r.city}</td>
                    <td className="p-4 font-semibold">{r.trips}</td>
                    <td className="p-4"><span className="inline-flex items-center gap-1 font-semibold"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {r.rating}</span></td>
                    <td className="p-4"><Badge variant="outline" className={r.status === "Online" ? "border-success/20 bg-success/10 text-success" : "border-destructive/20 bg-destructive/10 text-destructive"}><span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${r.status === "Online" ? "bg-success animate-pulse" : "bg-destructive"}`} /> {r.status}</Badge></td>
                    <td className="p-4 text-right"><Button variant="ghost" size="sm">{r.status === "Online" ? "Suspend" : "Activate"}</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="approval" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pending.map((p) => (
              <div key={p.name} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3"><Avatar className="h-11 w-11"><AvatarFallback className="bg-brand text-brand-foreground text-xs font-bold">{p.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar><div><p className="font-semibold">{p.name}</p><p className="text-xs text-muted-foreground">{p.city} · {p.vehicle}</p></div></div>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3 text-xs"><span className="flex items-center gap-1.5 text-muted-foreground"><FileText className="h-3.5 w-3.5" /> Documents</span><span className="font-semibold">{p.docs}/4 uploaded</span></div>
                <div className="mt-4 flex gap-2"><Button variant="outline" className="flex-1 rounded-full"><XCircle className="mr-1 h-4 w-4" /> Reject</Button><Button className="flex-1 rounded-full bg-success text-success-foreground hover:bg-success/90"><CheckCircle2 className="mr-1 h-4 w-4" /> Approve</Button></div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="map" className="mt-4">
          <MapPlaceholder className="h-[560px]" label="Fleet locations · Lagos" />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
