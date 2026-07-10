import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/components/layouts/UserLayout";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Swift" }] }),
  component: Settings,
});

function Settings() {
  const { theme, setTheme } = useTheme();
  return (
    <UserLayout title="Settings" subtitle="Preferences that follow you across devices.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Appearance" desc="Choose how Swift looks on this device.">
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "light", icon: Sun, label: "Light" },
              { id: "dark", icon: Moon, label: "Dark" },
              { id: "system", icon: Monitor, label: "System" },
            ].map((o) => (
              <button key={o.id} onClick={() => o.id !== "system" && setTheme(o.id as "light" | "dark")} className={cn("rounded-xl border p-3 text-center transition", (theme === o.id) ? "border-brand bg-accent" : "border-border hover:border-brand/40")}>
                <o.icon className="mx-auto h-4 w-4" />
                <p className="mt-2 text-xs font-semibold">{o.label}</p>
              </button>
            ))}
          </div>
        </Section>

        <Section title="Language & region">
          <div className="space-y-3">
            <div><Label>Language</Label>
              <Select defaultValue="en"><SelectTrigger className="mt-1.5 h-11 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="fr">Français</SelectItem><SelectItem value="pt">Português</SelectItem><SelectItem value="sw">Kiswahili</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label>Currency</Label>
              <Select defaultValue="ngn"><SelectTrigger className="mt-1.5 h-11 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="ngn">₦ Nigerian Naira</SelectItem><SelectItem value="usd">$ US Dollar</SelectItem><SelectItem value="ghs">₵ Ghana Cedi</SelectItem><SelectItem value="kes">KSh Kenyan Shilling</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </Section>

        <Section title="Notifications">
          {[
            { label: "Delivery updates", desc: "Push + email when status changes", on: true },
            { label: "Promotions & offers", desc: "Deals and discounts", on: false },
            { label: "Weekly summary", desc: "A recap of your shipments", on: true },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between border-b border-border py-3 last:border-0">
              <div><p className="font-semibold">{n.label}</p><p className="text-sm text-muted-foreground">{n.desc}</p></div>
              <Switch defaultChecked={n.on} />
            </div>
          ))}
        </Section>

        <Section title="Password" desc="Update your password regularly.">
          <div className="space-y-3">
            <div><Label>Current password</Label><Input type="password" className="mt-1.5 h-11 rounded-xl" /></div>
            <div><Label>New password</Label><Input type="password" className="mt-1.5 h-11 rounded-xl" /></div>
            <div><Label>Confirm password</Label><Input type="password" className="mt-1.5 h-11 rounded-xl" /></div>
            <Button className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90">Update password</Button>
          </div>
        </Section>
      </div>
    </UserLayout>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}
