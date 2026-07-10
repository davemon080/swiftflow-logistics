import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/components/layouts/UserLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LifeBuoy, Mail, MessageCircle, Phone, Search, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Support — Swift" }] }),
  component: Support,
});

const topics = [
  "How do I cancel a delivery?",
  "Package damaged — what do I do?",
  "Refund policy",
  "Rider didn't arrive",
  "Update payment method",
  "Business API access",
];

function Support() {
  return (
    <UserLayout title="Help & Support" subtitle="We're here 24/7 — get answers fast.">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: MessageCircle, title: "Live chat", desc: "Avg response 2 min", accent: "bg-brand/15 text-brand" },
          { icon: Phone, title: "Call us", desc: "+234 800 SWIFT 24", accent: "bg-info/15 text-info" },
          { icon: Mail, title: "Email", desc: "help@swift.co", accent: "bg-success/15 text-success" },
        ].map((c) => (
          <button key={c.title} className="group rounded-2xl border border-border bg-card p-5 text-left shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className={`grid h-11 w-11 place-items-center rounded-xl ${c.accent}`}><c.icon className="h-5 w-5" /></div>
            <p className="mt-4 font-display text-lg font-bold">{c.title}</p>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
            <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">Start <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></p>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-display text-lg font-bold">Browse help topics</h3>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search articles…" className="h-11 rounded-full pl-10" />
          </div>
          <ul className="mt-4 divide-y divide-border">
            {topics.map((t) => (
              <li key={t} className="flex cursor-pointer items-center justify-between py-3 transition hover:text-brand">
                <span className="text-sm font-medium">{t}</span><ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2"><LifeBuoy className="h-5 w-5 text-brand" /><h3 className="font-display text-lg font-bold">Open a ticket</h3></div>
          <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div><Label>Subject</Label><Input placeholder="What's this about?" className="mt-1.5 h-11 rounded-xl" /></div>
            <div><Label>Description</Label><Textarea placeholder="Describe the issue" className="mt-1.5 min-h-32 rounded-xl" /></div>
            <Button className="w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90">Submit ticket</Button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
