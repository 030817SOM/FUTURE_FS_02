import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { createLeadSchema, type CreateLeadValues } from "@/lib/validation";
import { toast } from "sonner";

const SOURCES = [
  "Website Contact Form",
  "Landing Page",
  "Referral",
  "Newsletter",
  "Cold Outreach",
  "Social Media",
  "Other",
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CreateLeadValues) => Promise<void>;
}

const empty: CreateLeadValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "Website Contact Form",
  message: "",
};

export function NewLeadDialog({ open, onOpenChange, onSubmit }: Props) {
  const [values, setValues] = useState<CreateLeadValues>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateLeadValues, string>>>({});
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof CreateLeadValues>(k: K, v: CreateLeadValues[K]) =>
    setValues((p: CreateLeadValues) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = createLeadSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Partial<Record<keyof CreateLeadValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof CreateLeadValues;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSaving(true);
    try {
      await onSubmit(parsed.data);
      toast.success("Lead added");
      setValues(empty);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add lead");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">New lead</DialogTitle>
          <DialogDescription>
            Capture a contact from any source. You can always edit later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="John Doe"
                maxLength={100}
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="col-span-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="john@company.com"
                maxLength={255}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+27 73 555 0000"
                maxLength={40}
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={values.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="John Inc."
                maxLength={120}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="source">Source *</Label>
              <Select value={values.source} onValueChange={(v) => set("source", v)}>
                <SelectTrigger id="source">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SOURCES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                rows={3}
                maxLength={2000}
                placeholder="What did they ask for?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Add lead"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
