import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { Lead, LeadStatus } from "@/types/lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Users,
  Inbox,
  CheckCircle2,
  Flame,
  LogOut,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { StatCard } from "@/components/crm/StatCard";
import { LeadsTable } from "@/components/crm/LeadsTable";
import { NewLeadDialog } from "@/components/crm/NewLeadDialog";
import { LeadDetailSheet } from "@/components/crm/LeadDetailSheet";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

type Filter = "all" | LeadStatus;

const Index = () => {
  const { user, logout, isAdmin } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setLeads(await api.listLeads());
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Wanga's CRM — Lead Management";
    const meta = document.querySelector('meta[name="description"]');
    const description =
      "A focused dark-mode CRM for tracking website leads, statuses, follow-ups, and notes.";
    if (meta) meta.setAttribute("content", description);
    refresh();
  }, []);

  const stats = useMemo(() => {
    const by = (s: LeadStatus) => leads.filter((l) => l.status === s).length;
    return {
      total: leads.length,
      newCount: by("new"),
      contacted: by("contacted"),
      converted: by("converted"),
    };
  }, [leads]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (filter !== "all" && l.status !== filter) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.company ?? "").toLowerCase().includes(q) ||
        l.source.toLowerCase().includes(q)
      );
    });
  }, [leads, filter, query]);

  const handleCreate = async (values: Parameters<typeof api.createLead>[0]) => {
    await api.createLead(values);
    await refresh();
  };

  const initials = (user?.displayName ?? "")
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border/60 glass">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Flame className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <div className="font-display text-lg font-semibold tracking-tight">
              Wanga's <span className="text-muted-foreground">CRM</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <Button onClick={() => setDialogOpen(true)} className="gap-1.5 shadow-md">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New lead</span>
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-2 py-1.5 transition-smooth hover:bg-card"
                  aria-label="Account menu"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-primary text-[11px] font-semibold text-primary-foreground">
                    {initials || "?"}
                  </div>
                  <div className="hidden text-left sm:block">
                    <div className="text-xs font-medium leading-tight">
                      {user?.displayName}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {isAdmin ? (
                        <ShieldCheck className="h-3 w-3 text-primary" />
                      ) : (
                        <UserCog className="h-3 w-3 text-accent" />
                      )}
                      {user?.role}
                    </div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="text-sm font-medium">{user?.displayName}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container space-y-8 py-8 animate-fade-in">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-card p-8 md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-70" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
              Live pipeline · {leads.length} leads tracked
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Your pipeline,
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                {" "}in focus.
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Every lead from your website lands here. Track status, schedule
              follow-ups, and keep notes — all without losing momentum.
            </p>
            {!isAdmin && (
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-xs text-muted-foreground">
                <UserCog className="h-3.5 w-3.5 text-accent" />
                Agent view — read-only on lead records. You can still add notes.
              </p>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Total leads" value={stats.total} icon={Users} accent="muted" />
          <StatCard label="New" value={stats.newCount} icon={Inbox} accent="primary" />
          <StatCard
            label="Contacted"
            value={stats.contacted}
            icon={Flame}
            accent="warning"
          />
          <StatCard
            label="Converted"
            value={stats.converted}
            icon={CheckCircle2}
            accent="success"
          />
        </section>

        {/* Filters */}
        <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="contacted">Contacted</TabsTrigger>
              <TabsTrigger value="converted">Converted</TabsTrigger>
              <TabsTrigger value="lost">Lost</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, email, company…"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Leads */}
        <section>
          {loading ? (
            <div className="rounded-2xl border border-border/60 bg-card/40 py-16 text-center text-sm text-muted-foreground">
              Loading leads…
            </div>
          ) : (
            <LeadsTable leads={filtered} onSelect={setSelectedId} />
          )}
        </section>
      </main>

      {isAdmin && (
        <NewLeadDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleCreate}
        />
      )}
      <LeadDetailSheet
        leadId={selectedId}
        onClose={() => setSelectedId(null)}
        onChange={refresh}
        canEdit={isAdmin}
      />
    </div>
  );
};

export default Index;
