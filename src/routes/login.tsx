import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/brand/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Swift" }, { name: "description", content: "Sign in to your Swift account to book and track deliveries." }] }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to book and track deliveries." footer={<>Don't have an account? <Link to="/register" className="font-semibold text-brand">Sign up</Link></>}>
      <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 1200); }} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" className="h-11 rounded-xl">Google</Button>
          <Button type="button" variant="outline" className="h-11 rounded-xl">Apple</Button>
        </div>
        <div className="flex items-center gap-3 py-2 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" /> or continue with email <span className="h-px flex-1 bg-border" /></div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" className="mt-1.5 h-11 rounded-xl" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pw">Password</Label>
            <Link to="/forgot-password" className="text-xs font-semibold text-brand">Forgot?</Link>
          </div>
          <div className="relative mt-1.5">
            <Input id="pw" type={show ? "text" : "password"} placeholder="••••••••" className="h-11 rounded-xl pr-10" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground"><Checkbox /> Remember me for 30 days</label>
        <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
