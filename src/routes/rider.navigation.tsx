import { createFileRoute } from "@tanstack/react-router";
import { RiderLayout } from "@/components/layouts/RiderLayout";
import { MapPlaceholder } from "@/components/brand/MapPlaceholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera, CheckCircle2, MessageCircle, Navigation2, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export const Route = createFileRoute("/rider/navigation")({
  head: () => ({ meta: [{ title: "Navigation — Swift Rider" }] }),
  component: Nav,
});

function Nav() {
  const [complete, setComplete] = useState(false);
  return (
    <RiderLayout>
      <div className="grid gap-4 lg:grid-cols-[1fr,380px] lg:gap-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <MapPlaceholder className="h-[420px] rounded-none border-0 lg:h-[560px]" label="Turn-by-turn" />
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-primary p-5 text-primary-foreground shadow-[var(--shadow-elegant)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">Next turn</p>
            <p className="mt-2 font-display text-3xl font-bold">Turn right</p>
            <p className="text-sm text-primary-foreground/70">onto Herbert Macaulay Way · 240m</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Customer</p>
            <div className="mt-3 flex items-center gap-3">
              <Avatar className="h-11 w-11"><AvatarFallback className="bg-brand text-brand-foreground font-bold">AK</AvatarFallback></Avatar>
              <div className="min-w-0 flex-1"><p className="truncate font-semibold">Ada Kelechi</p><p className="text-xs text-muted-foreground">+234 800 000 0000</p></div>
              <Button size="icon" variant="outline" className="rounded-full"><Phone className="h-4 w-4" /></Button>
              <Button size="icon" variant="outline" className="rounded-full"><MessageCircle className="h-4 w-4" /></Button>
            </div>
            <div className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
              <div><p className="text-[10px] font-semibold uppercase text-muted-foreground">Pickup</p><p className="font-semibold">12 Herbert Macaulay Way, Yaba</p></div>
              <div><p className="text-[10px] font-semibold uppercase text-muted-foreground">Drop-off</p><p className="font-semibold">5A Adeola Odeku, Lekki Phase 1</p></div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <Button className="w-full rounded-xl bg-info text-info-foreground hover:bg-info/90">Arrived at pickup</Button>
            <Dialog>
              <DialogTrigger asChild><Button className="w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90"><Camera className="mr-2 h-4 w-4" /> Package received — photo</Button></DialogTrigger>
              <DialogContent><DialogHeader><DialogTitle>Photo of package</DialogTitle></DialogHeader>
                <div className="mt-4 grid h-56 place-items-center rounded-xl border-2 border-dashed border-border bg-muted"><Camera className="h-8 w-8 text-muted-foreground" /></div>
                <Button className="mt-4 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90">Confirm & continue</Button>
              </DialogContent>
            </Dialog>
            <Dialog open={complete} onOpenChange={setComplete}>
              <DialogTrigger asChild><Button variant="outline" className="w-full rounded-xl"><Navigation2 className="mr-2 h-4 w-4" /> Delivered — verify code</Button></DialogTrigger>
              <DialogContent><DialogHeader><DialogTitle>Enter customer's code</DialogTitle></DialogHeader>
                <div className="mt-4 flex gap-2 justify-center">
                  {[0,1,2,3].map((i) => <Input key={i} maxLength={1} className="h-14 w-14 rounded-xl text-center text-2xl font-bold" />)}
                </div>
                <Button className="mt-4 rounded-xl bg-success text-success-foreground hover:bg-success/90"><CheckCircle2 className="mr-2 h-4 w-4" /> Verify & complete</Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </RiderLayout>
  );
}
