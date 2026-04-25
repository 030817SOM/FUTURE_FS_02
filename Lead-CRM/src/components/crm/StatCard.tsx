import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Accent = "muted" | "primary" | "warning" | "success" | "accent";

interface Props {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: Accent;
  hint?: string;
}

const ACCENTS: Record<Accent, string> = {
  muted: "text-muted-foreground bg-muted/60",
  primary: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  accent: "text-accent bg-accent/10",
};

export function StatCard({ label, value, icon: Icon, accent = "primary", hint }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-card p-5 shadow-sm transition-smooth hover:border-border hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          <div className="mt-2 font-display text-3xl font-semibold tabular-nums tracking-tight">
            {value}
          </div>
          {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", ACCENTS[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
    </div>
  );
}
