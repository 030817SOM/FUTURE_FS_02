import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { StatusBadge } from "./StatusBadge";
import type { Lead, LeadStatus } from "@/types/lead";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Mail, Phone, Building2, Trash2, Calendar, Send, Lock } from "lucide-react";
import { toast } from "sonner";
import { noteSchema } from "@/lib/validation";
import { useAuth } from "@/context/AuthContext";

const STATUSES: LeadStatus[] = ["new", "contacted", "converted", "lost"];

interface Props {
  leadId: string | null;
  onClose: () => void;
  onChange: () => void;
  canEdit?: boolean;
}

export function LeadDetailSheet({ leadId, onClose, onChange, canEdit = true }: Props) {
  const { user } = useAuth();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);
  const [noteBody, setNoteBody] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (!leadId) {
      setLead(null);
      return;
    }
    setLoading(true);
    api
      .getLead(leadId)
      .then(setLead)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [leadId]);

  const refresh = async () => {
    if (!leadId) return;
    const fresh = await api.getLead(leadId);
    setLead(fresh);
    onChange();
  };

  const updateStatus = async (status: LeadStatus) => {
    if (!lead || !canEdit) return;
    try {
      await api.updateLead(lead.id, { status });
      toast.success(`Marked as ${status}`);
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  };

  const updateFollowUp = async (value: string) => {
    if (!lead || !canEdit) return;
    const iso = value ? new Date(value).toISOString() : null;
    await api.updateLead(lead.id, { followUpAt: iso });
    await refresh();
  };

  const addNote = async () => {
    if (!lead) return;
    const parsed = noteSchema.safeParse({ body: noteBody });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSavingNote(true);
    try {
      await api.addNote(lead.id, parsed.data.body, user?.displayName ?? "You");
      setNoteBody("");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to add note");
    } finally {
      setSavingNote(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!lead) return;
    await api.deleteNote(lead.id, noteId);
    await refresh();
  };

  const deleteLead = async () => {
    if (!lead || !canEdit) return;
    if (!confirm(`Delete lead "${lead.name}"? This cannot be undone.`)) return;
    await api.deleteLead(lead.id);
    toast.success("Lead deleted");
    onChange();
    onClose();
  };

  return (
    <Sheet open={!!leadId} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        {loading && !lead && (
          <div className="py-12 text-center text-sm text-muted-foreground">Loading…</div>
        )}
        {lead && (
          <>
            <SheetHeader className="space-y-3 pb-2 text-left">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <SheetTitle className="font-display text-2xl leading-tight">
                    {lead.name}
                  </SheetTitle>
                  {lead.company && (
                    <p className="mt-1 text-sm text-muted-foreground">{lead.company}</p>
                  )}
                </div>
                <StatusBadge status={lead.status} />
              </div>
            </SheetHeader>

            <div className="space-y-6 pt-4">
              {/* Contact */}
              <div className="space-y-2 text-sm">
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-2.5 text-foreground hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {lead.email}
                </a>
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-2.5 text-foreground hover:text-primary"
                  >
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {lead.phone}
                  </a>
                )}
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  {lead.source}
                </div>
              </div>

              {lead.message && (
                <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                  <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Original message
                  </div>
                  <p className="text-sm leading-relaxed">{lead.message}</p>
                </div>
              )}

              {/* Status switcher */}
              <div>
                <Label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                  {!canEdit && <Lock className="h-3 w-3" />}
                </Label>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(s)}
                      disabled={!canEdit}
                      className={`rounded-md border px-2 py-1.5 text-xs font-medium capitalize transition-smooth disabled:cursor-not-allowed disabled:opacity-50 ${
                        lead.status === s
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {!canEdit && (
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Only admins can change lead status.
                  </p>
                )}
              </div>

              {/* Follow-up */}
              <div>
                <Label
                  htmlFor="followup"
                  className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  <Calendar className="h-3 w-3" />
                  Follow-up
                  {!canEdit && <Lock className="h-3 w-3" />}
                </Label>
                <Input
                  id="followup"
                  type="datetime-local"
                  className="mt-2"
                  disabled={!canEdit}
                  value={
                    lead.followUpAt
                      ? format(new Date(lead.followUpAt), "yyyy-MM-dd'T'HH:mm")
                      : ""
                  }
                  onChange={(e) => updateFollowUp(e.target.value)}
                />
              </div>

              {/* Notes */}
              <div>
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Notes
                </Label>
                <div className="mt-2 space-y-2">
                  <Textarea
                    rows={2}
                    maxLength={1000}
                    placeholder="Add a note or follow-up summary…"
                    value={noteBody}
                    onChange={(e) => setNoteBody(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button size="sm" onClick={addNote} disabled={savingNote || !noteBody.trim()}>
                      <Send className="mr-1.5 h-3.5 w-3.5" />
                      Add note
                    </Button>
                  </div>
                </div>
                <ul className="mt-3 space-y-2">
                  {lead.notes.length === 0 && (
                    <li className="rounded-md border border-dashed border-border/60 py-4 text-center text-xs text-muted-foreground">
                      No notes yet.
                    </li>
                  )}
                  {lead.notes.map((n) => (
                    <li
                      key={n.id}
                      className="group rounded-md border border-border/60 bg-card p-3 text-sm shadow-sm"
                    >
                      <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {n.author ?? "You"} ·{" "}
                          {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                        </span>
                        <button
                          onClick={() => deleteNote(n.id)}
                          className="opacity-0 transition-smooth hover:text-destructive group-hover:opacity-100"
                          aria-label="Delete note"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="leading-relaxed">{n.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
                <span>
                  Added {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                </span>
                {canEdit && (
                  <button
                    onClick={deleteLead}
                    className="inline-flex items-center gap-1 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete lead
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
