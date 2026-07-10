import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/brand/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useMemo } from "react";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — Swift" }] }),
  component: Register,
});

function Register() {
  const [pw, setPw] = useState("");
  const strength = useMemo(() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  }, [pw]);
  const strengthLabel = ["Weak", "Fair", "Good", "Strong", "Excellent"][strength];
  const strengthColor = ["bg-destructive", "bg-warning", "bg-info", "bg-success", "bg-success"][strength];

  return (
    <AuthShell title="Create your account" subtitle="Start shipping in under a minute." footer={<>Already have an account? <Link to="/login" className="font-semibold text-brand">Sign in</Link></>}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>First name</Label><Input className="mt-1.5 h-11 rounded-xl" placeholder="Ada" /></div>
          <div><Label>Last name</Label><Input className="mt-1.5 h-11 rounded-xl" placeholder="Kelechi" /></div>
        </div>
        <div><Label>Email</Label><Input type="email" className="mt-1.5 h-11 rounded-xl" placeholder="you@company.com" /></div>
        <div><Label>Phone</Label><Input type="tel" className="mt-1.5 h-11 rounded-xl" placeholder="+234 800 000 0000" /></div>
        <div>
          <Label>Password</Label>
          <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="mt-1.5 h-11 rounded-xl" placeholder="Choose a strong password" />
          <div className="mt-2 flex gap-1">
            {[0, 1, 2, 3].map((i) => <div key={i} className={`h-1 flex-1 rounded-full ${i < strength ? strengthColor : "bg-muted"}`} />)}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-muted-foreground">
            {[
              { ok: pw.length >= 8, l: "8+ characters" },
              { ok: /[A-Z]/.test(pw), l: "Uppercase" },
              { ok: /[0-9]/.test(pw), l: "Number" },
              { ok: /[^A-Za-z0-9]/.test(pw), l: "Symbol" },
            ].map((r) => (
              <div key={r.l} className="flex items-center gap-1.5">{r.ok ? <Check className="h-3 w-3 text-success" /> : <X className="h-3 w-3" />} {r.l}</div>
            ))}
          </div>
          {pw && <p className="mt-1 text-xs font-semibold text-foreground">Strength: {strengthLabel}</p>}
        </div>
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="mt-0.5" /> I agree to Swift's <a className="underline">Terms</a> and <a className="underline">Privacy Policy</a>.
        </label>
        <Button className="h-11 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90">Create account</Button>
      </form>
    </AuthShell>
  );
}
