import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/brand/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Set new password — Swift" }, { name: "robots", content: "noindex" }] }),
  component: Reset,
});

function Reset() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase auto-consumes the recovery hash and emits PASSWORD_RECOVERY / SIGNED_IN
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    void supabase.auth.getSession().then(({ data: s }) => { if (s.session) setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    if (password !== confirm) return toast.error("Passwords don't match");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated");
    void navigate({ to: "/login", replace: true });
  };

  return (
    <AuthShell title="Set a new password" subtitle="Choose a strong password you don't use elsewhere.">
      {!ready ? (
        <div className="rounded-2xl border border-border bg-card p-5 text-center text-sm text-muted-foreground">
          Waiting for a valid reset link…
        </div>
      ) : (
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <Label>New password</Label>
            <Input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 h-11 rounded-xl" />
          </div>
          <div>
            <Label>Confirm password</Label>
            <Input required type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1.5 h-11 rounded-xl" />
          </div>
          <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl bg-brand text-brand-foreground hover:bg-brand/90">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update password"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
