import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/brand/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/adminv1/login")({
  head: () => ({ meta: [{ title: "Admin login — Swift" }, { name: "robots", content: "noindex" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      setLoading(false);
      toast.error(error?.message ?? "Sign in failed");
      return;
    }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
    const isAdmin = ((roles ?? []) as { role: string }[]).some((r) => r.role === "admin");
    if (!isAdmin) {
      await supabase.auth.signOut();
      setLoading(false);
      toast.error("This account does not have admin access.");
      return;
    }
    setLoading(false);
    void navigate({ to: "/adminv1/dashboard", replace: true });
  };

  return (
    <AuthShell tone="admin" title="Admin console" subtitle="Restricted access. Authorized personnel only." footer={<span className="flex items-center justify-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Encrypted session</span>}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <Label>Email</Label>
          <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 h-11 rounded-xl" />
        </div>
        <div>
          <Label>Password</Label>
          <Input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 h-11 rounded-xl" />
        </div>
        <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
