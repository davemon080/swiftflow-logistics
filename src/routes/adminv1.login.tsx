import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/brand/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/adminv1/login")({
  head: () => ({ meta: [{ title: "Admin login — Swift" }] }),
  component: AL,
});
function AL() {
  return (
    <AuthShell tone="admin" title="Ops Console" subtitle="Restricted access — admins only.">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div><Label>Email</Label><Input className="mt-1.5 h-11 rounded-xl" placeholder="admin@swift.co" /></div>
        <div><Label>Password</Label><Input type="password" className="mt-1.5 h-11 rounded-xl" placeholder="••••••••" /></div>
        <div><Label>2FA code</Label><Input className="mt-1.5 h-11 rounded-xl tracking-widest" placeholder="123 456" /></div>
        <Button asChild className="h-11 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/adminv1/dashboard">Sign in</Link></Button>
      </form>
    </AuthShell>
  );
}
