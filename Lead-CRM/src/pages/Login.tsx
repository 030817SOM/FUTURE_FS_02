import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { ArrowLeft, Flame, Loader2, ShieldCheck, UserCog } from "lucide-react";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Sign in — Wanga's CRM";
  }, []);

  useEffect(() => {
    if (user) {
      const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (kind: "admin" | "agent") => {
    if (kind === "admin") {
      setEmail("admin@wanga.crm");
      setPassword("admin123");
    } else {
      setEmail("agent@wanga.crm");
      setPassword("agent123");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(244_90%_66%/0.25),transparent_50%)]" />

      {/* Back to home */}
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="absolute left-4 top-4 gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <Link to="/">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </Button>

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="font-display text-2xl font-semibold tracking-tight">
            Wanga's <span className="text-muted-foreground">CRM</span>
          </div>
        </div>

        <div className="glass rounded-2xl border border-border/60 p-8 shadow-lg">
          <h1 className="font-display text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage your pipeline.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-foreground transition-smooth hover:text-primary"
            >
              Create one
            </Link>
          </p>

          <div className="mt-6 border-t border-border/60 pt-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Demo accounts
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemo("admin")}
                className="group flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-2.5 text-left transition-smooth hover:border-primary/60 hover:bg-card"
              >
                <ShieldCheck className="h-4 w-4 text-primary" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold">Admin</div>
                  <div className="truncate text-[10px] text-muted-foreground">
                    admin@wanga.crm
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => fillDemo("agent")}
                className="group flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 py-2.5 text-left transition-smooth hover:border-primary/60 hover:bg-card"
              >
                <UserCog className="h-4 w-4 text-accent" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold">Agent</div>
                  <div className="truncate text-[10px] text-muted-foreground">
                    agent@wanga.crm
                  </div>
                </div>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
