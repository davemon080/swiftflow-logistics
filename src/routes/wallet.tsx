import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/components/layouts/UserLayout";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/brand/StatCard";
import { ArrowDownRight, ArrowUpRight, CreditCard, Plus, TrendingUp, Wallet as WalletIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/wallet")({
  head: () => ({ meta: [{ title: "Wallet — Swift" }] }),
  component: Wallet,
});

const tx = [
  { id: 1, label: "Delivery SW-8241", type: "debit", amount: "₦2,400", date: "Today · 10:24", status: "Completed" },
  { id: 2, label: "Wallet top-up · Card", type: "credit", amount: "₦20,000", date: "Yesterday", status: "Completed" },
  { id: 3, label: "Delivery SW-8237", type: "debit", amount: "₦3,200", date: "17 Nov", status: "Completed" },
  { id: 4, label: "Refund SW-8228", type: "credit", amount: "₦1,800", date: "15 Nov", status: "Completed" },
];

function Wallet() {
  return (
    <UserLayout title="Wallet" subtitle="Manage your balance, transactions, and payment methods.">
      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-6 text-primary-foreground shadow-[var(--shadow-elegant)]">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">Wallet balance</p>
              <p className="mt-3 font-display text-5xl font-bold">₦24,380<span className="text-2xl font-medium text-primary-foreground/60">.50</span></p>
            </div>
            <WalletIcon className="h-8 w-8 text-brand" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"><Plus className="mr-2 h-4 w-4" /> Top up</Button>
            <Button variant="outline" className="rounded-full border-white/20 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground">Transfer</Button>
            <Button variant="outline" className="rounded-full border-white/20 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground">Withdraw</Button>
          </div>
        </div>
        <div className="grid gap-4">
          <StatCard label="Spent this month" value="₦48,200" icon={ArrowUpRight} delta="12%" accent="info" />
          <StatCard label="Refunds received" value="₦1,800" icon={ArrowDownRight} delta="2" accent="success" />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h3 className="font-display text-lg font-bold">Transactions</h3>
            <Button variant="ghost" className="text-brand">View all →</Button>
          </div>
          <ul className="divide-y divide-border">
            {tx.map((t) => (
              <li key={t.id} className="flex items-center gap-4 p-4">
                <div className={`grid h-10 w-10 place-items-center rounded-xl ${t.type === "credit" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                  {t.type === "credit" ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-display text-sm font-bold ${t.type === "credit" ? "text-success" : "text-foreground"}`}>{t.type === "credit" ? "+" : "−"} {t.amount}</p>
                  <Badge variant="outline" className="mt-1 border-success/20 bg-success/10 text-[10px] text-success">{t.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h3 className="font-display text-lg font-bold">Payment methods</h3>
          <div className="mt-4 space-y-3">
            {[
              { brand: "Visa", last: "4242", exp: "12/28" },
              { brand: "Mastercard", last: "8891", exp: "09/27" },
            ].map((c) => (
              <div key={c.last} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
                <div className="grid h-9 w-12 place-items-center rounded-md bg-primary text-primary-foreground text-[10px] font-bold">{c.brand}</div>
                <div className="flex-1"><p className="text-sm font-semibold">•••• {c.last}</p><p className="text-xs text-muted-foreground">Exp {c.exp}</p></div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-xl"><Plus className="mr-2 h-4 w-4" /> Add payment method</Button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
