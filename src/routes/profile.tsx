import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/components/layouts/UserLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, MapPin, Plus, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Swift" }] }),
  component: Profile,
});

function Profile() {
  return (
    <UserLayout title="Profile" subtitle="Manage your identity, addresses, and security.">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-brand/10 via-card to-info/10 p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-center gap-5">
          <div className="relative">
            <Avatar className="h-20 w-20 ring-4 ring-background"><AvatarFallback className="bg-brand text-brand-foreground text-xl font-bold">AK</AvatarFallback></Avatar>
            <button className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-md"><Camera className="h-3.5 w-3.5" /></button>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-2xl font-bold">Ada Kelechi</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success"><ShieldCheck className="h-3 w-3" /> Verified</span>
            </div>
            <p className="text-sm text-muted-foreground">ada@swift.co · +234 800 000 0000</p>
            <p className="mt-1 text-xs text-muted-foreground">Member since Nov 2024 · 124 deliveries</p>
          </div>
          <Button variant="outline" className="rounded-full">Edit profile</Button>
        </div>
      </div>

      <Tabs defaultValue="personal" className="mt-6">
        <TabsList className="rounded-full bg-muted/50 p-1">
          <TabsTrigger value="personal" className="rounded-full">Personal</TabsTrigger>
          <TabsTrigger value="addresses" className="rounded-full">Addresses</TabsTrigger>
          <TabsTrigger value="security" className="rounded-full">Security</TabsTrigger>
          <TabsTrigger value="prefs" className="rounded-full">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="mt-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label>First name</Label><Input defaultValue="Ada" className="mt-1.5 h-11 rounded-xl" /></div>
              <div><Label>Last name</Label><Input defaultValue="Kelechi" className="mt-1.5 h-11 rounded-xl" /></div>
              <div><Label>Email</Label><Input defaultValue="ada@swift.co" className="mt-1.5 h-11 rounded-xl" /></div>
              <div><Label>Phone</Label><Input defaultValue="+234 800 000 0000" className="mt-1.5 h-11 rounded-xl" /></div>
              <div className="sm:col-span-2"><Label>Company (optional)</Label><Input placeholder="Add company" className="mt-1.5 h-11 rounded-xl" /></div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" className="rounded-full">Cancel</Button>
              <Button className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90">Save changes</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="addresses" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Home", addr: "12 Herbert Macaulay Way, Yaba, Lagos" },
              { label: "Office", addr: "5A Adeola Odeku, Victoria Island, Lagos" },
            ].map((a) => (
              <div key={a.label} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-brand"><MapPin className="h-4 w-4" /></div>
                  <div className="flex-1"><p className="font-semibold">{a.label}</p><p className="text-sm text-muted-foreground">{a.addr}</p></div>
                </div>
                <div className="mt-4 flex gap-2"><Button size="sm" variant="outline" className="rounded-full">Edit</Button><Button size="sm" variant="ghost" className="rounded-full text-destructive">Delete</Button></div>
              </div>
            ))}
            <button className="rounded-2xl border-2 border-dashed border-border p-5 text-left transition hover:border-brand hover:bg-accent">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-muted"><Plus className="h-4 w-4" /></div>
              <p className="mt-3 font-semibold">Add address</p>
              <p className="text-sm text-muted-foreground">Save locations you use often.</p>
            </button>
          </div>
        </TabsContent>
        <TabsContent value="security" className="mt-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-4">
            {[{ t: "Password", d: "Last changed 3 months ago" }, { t: "Two-factor authentication", d: "SMS enabled" }, { t: "Active sessions", d: "3 devices signed in" }].map((r) => (
              <div key={r.t} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div><p className="font-semibold">{r.t}</p><p className="text-sm text-muted-foreground">{r.d}</p></div>
                <Button variant="outline" className="rounded-full">Manage</Button>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="prefs" className="mt-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <p className="text-sm text-muted-foreground">Manage language, currency, and notification preferences in <a href="/settings" className="font-semibold text-brand">Settings</a>.</p>
          </div>
        </TabsContent>
      </Tabs>
    </UserLayout>
  );
}
