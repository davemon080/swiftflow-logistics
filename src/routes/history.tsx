import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/components/layouts/UserLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, Search, ChevronLeft, ChevronRight, Receipt, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "Delivery history — Swift" }] }),
  component: History,
});

const rows = Array.from({ length: 8 }, (_, i) => ({
  id: `SW-${8241 - i}`, from: ["Yaba", "Ikeja", "Surulere", "Ikoyi", "Lekki", "Ajah", "VI", "Apapa"][i],
  to: ["Lekki", "VI", "Ajah", "Mainland", "Ibeju", "Yaba", "Ikeja", "Ikoyi"][i],
  date: `${17 - i} Nov 2026`, price: `₦${(2400 + i * 350).toLocaleString()}`,
  status: (["Delivered", "Delivered", "In transit", "Delivered", "Cancelled", "Delivered", "Delivered", "Refunded"] as const)[i],
}));
const statusColor: Record<string, string> = {
  "Delivered": "bg-success/10 text-success border-success/20",
  "In transit": "bg-info/10 text-info border-info/20",
  "Cancelled": "bg-destructive/10 text-destructive border-destructive/20",
  "Refunded": "bg-warning/15 text-warning border-warning/30",
};

function History() {
  return (
    <UserLayout title="Delivery history" subtitle="All your past and current shipments in one place.">
      <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by ID, location…" className="h-10 rounded-full pl-10" />
          </div>
          <Select><SelectTrigger className="h-10 w-40 rounded-full"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="del">Delivered</SelectItem><SelectItem value="tr">In transit</SelectItem><SelectItem value="ca">Cancelled</SelectItem></SelectContent>
          </Select>
          <Button variant="outline" className="rounded-full"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          <Button variant="outline" className="rounded-full"><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
        <div className="overflow-x-auto border-t border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="p-4 text-left font-semibold">Tracking</th>
                <th className="p-4 text-left font-semibold">Route</th>
                <th className="p-4 text-left font-semibold">Date</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-right font-semibold">Amount</th>
                <th className="p-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border transition hover:bg-muted/30">
                  <td className="p-4 font-mono text-xs font-semibold">{r.id}</td>
                  <td className="p-4">{r.from} <span className="text-muted-foreground">→</span> {r.to}</td>
                  <td className="p-4 text-muted-foreground">{r.date}</td>
                  <td className="p-4"><Badge variant="outline" className={statusColor[r.status]}>{r.status}</Badge></td>
                  <td className="p-4 text-right font-semibold">{r.price}</td>
                  <td className="p-4 text-right">
                    <Dialog>
                      <DialogTrigger asChild><Button size="sm" variant="ghost"><Eye className="mr-1 h-3.5 w-3.5" /> Receipt</Button></DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader><DialogTitle>Receipt · {r.id}</DialogTitle></DialogHeader>
                        <div className="mt-4 rounded-xl border border-dashed border-border p-6">
                          <div className="flex items-center justify-between border-b border-border pb-3">
                            <p className="font-display text-lg font-bold">Swift.</p>
                            <Receipt className="h-5 w-5 text-brand" />
                          </div>
                          <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-muted-foreground">From</span><span>{r.from}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">To</span><span>{r.to}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{r.date}</span></div>
                            <div className="flex justify-between border-t border-border pt-2 font-bold"><span>Total</span><span>{r.price}</span></div>
                          </div>
                          <Button className="mt-4 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90"><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border p-4 text-sm text-muted-foreground">
          <span>Showing 1–8 of 124</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 rounded-full p-0"><ChevronLeft className="h-4 w-4" /></Button>
            <Button size="sm" className="h-8 w-8 rounded-full p-0 bg-brand text-brand-foreground">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 rounded-full p-0">2</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 rounded-full p-0">3</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 rounded-full p-0"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
