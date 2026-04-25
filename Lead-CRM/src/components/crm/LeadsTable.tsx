import { StatusBadge } from "./StatusBadge";
import type { Lead } from "@/types/lead";
import { formatDistanceToNow } from "date-fns";
import { Mail, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  leads: Lead[];
  onSelect: (id: string) => void;
}

export function LeadsTable({ leads, onSelect }: Props) {
  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-card p-12 text-center">
        <p className="font-display text-lg">No leads match your filters</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try a different status or clear the search.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Header — desktop only */}
      <div className="hidden border-b bg-muted/40 px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid md:grid-cols-[2fr_1.5fr_1fr_120px_120px_50px] md:items-center md:gap-4">
        <div>Lead</div>
        <div>Email</div>
        <div>Source</div>
        <div>Status</div>
        <div>Updated</div>
        <div className="text-right">Notes</div>
      </div>

      <ul className="divide-y">
        {leads.map((lead) => (
          <li key={lead.id}>
            <button
              onClick={() => onSelect(lead.id)}
              className={cn(
                "group block w-full px-5 py-4 text-left transition-smooth hover:bg-muted/40",
                "md:grid md:grid-cols-[2fr_1.5fr_1fr_120px_120px_50px] md:items-center md:gap-4",
              )}
            >
              {/* Name + company */}
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <Avatar name={lead.name} />
                  <div className="min-w-0">
                    <div className="truncate font-medium">{lead.name}</div>
                    {lead.company && (
                      <div className="truncate text-xs text-muted-foreground">
                        {lead.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mt-2 flex items-center gap-1.5 truncate text-sm text-muted-foreground md:mt-0">
                <Mail className="h-3.5 w-3.5 shrink-0 md:hidden" />
                <span className="truncate">{lead.email}</span>
              </div>

              {/* Source */}
              <div className="mt-1 truncate text-xs text-muted-foreground md:mt-0 md:text-sm">
                {lead.source}
              </div>

              {/* Status */}
              <div className="mt-2 md:mt-0">
                <StatusBadge status={lead.status} />
              </div>

              {/* Updated */}
              <div className="mt-2 text-xs text-muted-foreground md:mt-0">
                {formatDistanceToNow(new Date(lead.updatedAt), { addSuffix: true })}
              </div>

              {/* Notes count */}
              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground md:mt-0 md:justify-end">
                <MessageSquare className="h-3.5 w-3.5" />
                {lead.notes.length}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground shadow-sm">
      {initials}
    </div>
  );
}
