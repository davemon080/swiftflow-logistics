import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/brand/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Swift" }] }),
  component: Forgot,
});

function Forgot() {
  const [sent, setSent] = useState(false);
  return (
    <AuthShell title="Forgot password?" subtitle="We'll send you a reset link." footer={<>Remember it? <Link to="/login" className="font-semibold text-brand">Sign in</Link></>}>
      {sent ? (
        <div className="rounded-2xl border border-success/30 bg-success/10 p-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success text-success-foreground"><Mail className="h-5 w-5" /></div>
          <p className="mt-4 font-semibold">Check your inbox</p>
          <p className="mt-1 text-sm text-muted-foreground">We've sent password reset instructions to your email.</p>
          <Button className="mt-4 rounded-full" variant="outline" onClick={() => setSent(false)}>Try another email</Button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <div><Label>Email</Label><Input type="email" placeholder="you@company.com" className="mt-1.5 h-11 rounded-xl" /></div>
          <Button className="h-11 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90">Send reset link</Button>
        </form>
      )}
    </AuthShell>
  );
}
