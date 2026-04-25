import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/types/lead";

const LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  converted: "Converted",
  lost: "Lost",
};

const STYLES: Record<LeadStatus, string> = {
  new: "bg-status-new-bg text-status-new ring-status-new/20",
  contacted: "bg-status-contacted-bg text-status-contacted ring-status-contacted/20",
  converted: "bg-status-converted-bg text-status-converted ring-status-converted/20",
  lost: "bg-status-lost-bg text-status-lost ring-status-lost/20",
};

interface Props {
  status: LeadStatus;
  className?: string;
  dot?: boolean;
}

export function StatusBadge({ status, className, dot = true }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        STYLES[status],
        className,
      )}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: `hsl(var(--status-${status}))` }}
        />
      )}
      {LABELS[status]}
    </span>
  );
}
