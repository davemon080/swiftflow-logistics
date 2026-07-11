import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/brand/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { roleHomePath, useAuth, type AppRole } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Swift" }, { name: "description", content: "Sign in to your Swift account to book and track deliveries." }] }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauth, setOauth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, primaryRole, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user && primaryRole) {
      void navigate({ to: roleHomePath(primaryRole), replace: true });
    }
  }, [authLoading, user, primaryRole, navigate]);

  const finishLogin = async (userId: string) => {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    const rs = ((data ?? []) as { role: AppRole }[]).map((r) => r.role);
    const role: AppRole | null = rs.includes("admin") ? "admin" : rs.includes("rider") ? "rider" : rs.includes("user") ? "user" : null;
    if (role === "rider") {
      toast.error("Riders must sign in at the rider portal.");
      await supabase.auth.signOut();
      void navigate({ to: "/rider/login", replace: true });
      return;
    }
    if (role === "admin") {
      toast.error("Admins must sign in at the admin portal.");
      await supabase.auth.signOut();
      void navigate({ to: "/adminv1/login", replace: true });
      return;
    }
    void navigate({ to: "/dashboard", replace: true });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.user) await finishLogin(data.user.id);
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
    const { data } = await supabase.auth.getUser();
    if (data.user) await finishLogin(data.user.id);
    setOauth(false);
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to book and track deliveries."
      footer={<>Don't have an account? <Link to="/register" className="font-semibold text-brand">Sign up</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Button type="button" onClick={onGoogle} disabled={oauth} variant="outline" className="h-11 w-full rounded-xl">
          {oauth ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue with Google"}
        </Button>
        <div className="flex items-center gap-3 py-2 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or continue with email <span className="h-px flex-1 bg-border" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="mt-1.5 h-11 rounded-xl" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pw">Password</Label>
            <Link to="/forgot-password" className="text-xs font-semibold text-brand">Forgot?</Link>
          </div>
          <div className="relative mt-1.5">
            <Input id="pw" type={show ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-11 rounded-xl pr-10" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
