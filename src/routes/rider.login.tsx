import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/brand/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/rider/login")({
  head: () => ({ meta: [{ title: "Rider login — Swift" }] }),
  component: RiderLogin,
});

function RiderLogin() {
  return (
    <AuthShell tone="rider" title="Rider portal" subtitle="Sign in to accept jobs and earn." footer={<>New rider? <a href="#" className="font-semibold text-brand">Apply now</a></>}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div><Label>Rider ID or phone</Label><Input className="mt-1.5 h-11 rounded-xl" placeholder="e.g. R-4082 or phone" /></div>
        <div><Label>PIN</Label><Input type="password" className="mt-1.5 h-11 rounded-xl" placeholder="•••• ••" /></div>
        <Button asChild className="h-11 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90"><Link to="/rider/dashboard">Sign in</Link></Button>
        <a href="#" className="block text-center text-xs font-semibold text-brand">Forgot PIN?</a>
      </form>
    </AuthShell>
  );
}
