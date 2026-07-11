import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/brand/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone").max(20),
  password: z.string().min(8, "At least 8 characters").max(72),
});

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Sign up — Swift" }, { name: "description", content: "Create a Swift account to book on-demand deliveries." }] }),
  component: Register,
});

function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0..4
}

function Register() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauth, setOauth] = useState(false);
  const [values, setValues] = useState({ full_name: "", email: "", phone: "", password: "" });
  const navigate = useNavigate();

  const strength = useMemo(() => passwordStrength(values.password), [values.password]);
  const strengthLabel = ["Too short", "Weak", "Okay", "Good", "Strong"][strength];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: window.location.origin + "/login",
        data: {
          full_name: parsed.data.full_name,
          phone: parsed.data.phone,
          role: "user",
        },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.session) {
      toast.success("Account created!");
      void navigate({ to: "/dashboard", replace: true });
    } else {
      toast.success("Check your email to confirm your account.");
      void navigate({ to: "/login", replace: true });
    }
  };

  const onGoogle = async () => {
    setOauth(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) {
      setOauth(false);
      toast.error(result.error.message ?? "Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/dashboard", replace: true });
    setOauth(false);
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start booking deliveries in minutes."
      footer={<>Already have an account? <Link to="/login" className="font-semibold text-brand">Sign in</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Button type="button" onClick={onGoogle} disabled={oauth} variant="outline" className="h-11 w-full rounded-xl">
          {oauth ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue with Google"}
        </Button>
        <div className="flex items-center gap-3 py-2 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or sign up with email <span className="h-px flex-1 bg-border" />
        </div>
        <div>
          <Label>Full name</Label>
          <Input required value={values.full_name} onChange={(e) => setValues({ ...values, full_name: e.target.value })} className="mt-1.5 h-11 rounded-xl" />
        </div>
        <div>
          <Label>Email</Label>
          <Input required type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} className="mt-1.5 h-11 rounded-xl" />
        </div>
        <div>
          <Label>Phone</Label>
          <Input required value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} className="mt-1.5 h-11 rounded-xl" placeholder="+234…" />
        </div>
        <div>
          <Label>Password</Label>
          <div className="relative mt-1.5">
            <Input required type={show ? "text" : "password"} value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} className="h-11 rounded-xl pr-10" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {values.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className={`h-full transition-all ${["w-1/5 bg-destructive","w-2/5 bg-destructive","w-3/5 bg-warning","w-4/5 bg-info","w-full bg-success"][strength]}`} />
              </div>
              <span className="text-xs text-muted-foreground">{strengthLabel}</span>
            </div>
          )}
        </div>
        <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
