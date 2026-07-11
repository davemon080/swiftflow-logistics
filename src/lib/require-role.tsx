import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useAuth, type AppRole } from "@/lib/auth";

export function RequireRole({ role, children }: { role: AppRole; children: ReactNode }) {
  const { loading, user, hasRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      const to = role === "rider" ? "/rider/login" : role === "admin" ? "/adminv1/login" : "/login";
      void navigate({ to, replace: true });
      return;
    }
    if (!hasRole(role)) {
      void navigate({ to: "/", replace: true });
    }
  }, [loading, user, hasRole, role, navigate]);

  if (loading || !user || !hasRole(role)) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return <>{children}</>;
}
