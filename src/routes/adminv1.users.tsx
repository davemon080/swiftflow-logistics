import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Filter, Search, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/adminv1/users")({
  head: () => ({ meta: [{ title: "Users — Admin" }] }),
  component: U,
});
const users = Array.from({ length: 8 }, (_, i) => ({
  name: ["Ada Kelechi","Chidi Obi","Amaka Nwosu","Tunde Ade","Bola Okoye","Zainab Musa","Ola Kim","Uche Eze"][i],
  email: `user${i}@swift.co`, phone: `+234 800 000 000${i}`,
  status: (["Active","Active","Suspended","Active","Active","Pending","Active","Active"] as const)[i],
  spent: `₦${(24000 + i * 4200).toLocaleString()}`, orders: 12 + i * 3,
}));

function U() {
  return (
    <AdminLayout title="Users" subtitle="14,320 registered customers" action={<Button className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90">Export CSV</Button>}>
      <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative flex-1 min-w-[220px]"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search users…" className="h-10 rounded-full pl-10" /></div>
          <Button variant="outline" className="rounded-full"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
        </div>
        <div className="overflow-x-auto border-t border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground"><tr><th className="p-4 text-left">User</th><th className="p-4 text-left">Contact</th><th className="p-4 text-left">Orders</th><th className="p-4 text-left">Spent</th><th className="p-4 text-left">Status</th><th className="p-4"></th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-t border-border hover:bg-muted/30">
                  <td className="p-4"><div className="flex items-center gap-3"><Avatar className="h-9 w-9"><AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">{u.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar><div><p className="font-semibold">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div></div></td>
                  <td className="p-4 text-muted-foreground">{u.phone}</td>
                  <td className="p-4 font-semibold">{u.orders}</td>
                  <td className="p-4 font-semibold">{u.spent}</td>
                  <td className="p-4"><Badge variant="outline" className={u.status === "Active" ? "border-success/20 bg-success/10 text-success" : u.status === "Pending" ? "border-warning/30 bg-warning/15 text-warning" : "border-destructive/20 bg-destructive/10 text-destructive"}>{u.status}</Badge></td>
                  <td className="p-4">
                    <Sheet>
                      <SheetTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></SheetTrigger>
                      <SheetContent className="w-96"><SheetHeader><SheetTitle>{u.name}</SheetTitle></SheetHeader>
                        <div className="mt-6 space-y-4">
                          <div className="rounded-xl border border-border bg-muted/30 p-4"><p className="text-xs text-muted-foreground">Email</p><p className="font-semibold">{u.email}</p></div>
                          <div className="rounded-xl border border-border bg-muted/30 p-4"><p className="text-xs text-muted-foreground">Phone</p><p className="font-semibold">{u.phone}</p></div>
                          <div className="grid grid-cols-2 gap-3"><div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Orders</p><p className="font-display text-xl font-bold">{u.orders}</p></div><div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Spent</p><p className="font-display text-xl font-bold">{u.spent}</p></div></div>
                          <div className="flex gap-2"><Button variant="outline" className="flex-1 rounded-full">Suspend</Button><Button className="flex-1 rounded-full bg-brand text-brand-foreground">Message</Button></div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
