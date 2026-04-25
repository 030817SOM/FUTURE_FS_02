import type {
  CreateLeadInput,
  Lead,
  LeadNote,
  UpdateLeadInput,
} from "@/types/lead";

const USE_MOCK = true;
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

/* --------------------------------- Mock DB -------------------------------- */

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const STORAGE_KEY = "crm.leads.v1";

const seedLeads = (): Lead[] => {
  const now = Date.now();
  const mk = (i: number, partial: Partial<Lead>): Lead => ({
    id: uid(),
    name: "",
    email: "",
    source: "Website Contact Form",
    status: "new",
    createdAt: new Date(now - i * 86400000).toISOString(),
    updatedAt: new Date(now - i * 86400000).toISOString(),
    notes: [],
    ...partial,
  } as Lead);

  return [
    mk(0, {
      name: "Wanga Somhlaba",
      email: "Wanga@gmail.com",
      phone: "+27 73 940 7755",
      company: "Frontend Developer",
      source: "Website Contact Form",
      status: "new",
      message: "Looking for a brand refresh — interested in your retainer plans.",
    }),
    mk(1, {
      name: "Njivas Samkelo",
      email: "Njivas@gmail.com",
      phone: "+27 78 743 3222",
      company: "Njivas Labs",
      source: "Landing Page",
      status: "contacted",
      message: "Wants a demo next week.",
      notes: [
        {
          id: uid(),
          body: "Sent intro deck. Follow up Friday.",
          createdAt: new Date(now - 3600_000).toISOString(),
          author: "You",
        },
      ],
    }),
    mk(2, {
      name: "Keem Sobele",
      email: "Keem@gmail.com",
      phone: "+27 71 966 7902",
      company: "Fisheries Co-op",
      source: "Referral",
      status: "converted",
      message: "Signed annual plan ✨",
    }),
    mk(3, {
      name: "Zondi Njabulo",
      email: "Zondi@gmail.com",
      phone: "+27 73 725 0473",
      company: "Zondi Technologies",
      source: "Website Contact Form",
      status: "contacted",
    }),
    mk(5, {
      name: "Chridayday Masulasi",
      email: "Chris@gmail.com",
      phone: "+27 81 004 6215",
      company: "Masulasi Inc.",
      source: "Newsletter",
      status: "new",
    }),
    mk(8, {
      name: "CheeseBoy Vakalisa",
      email: "Cheesboy@gmailcom",
      phone: "+27 83 852 0782",
      company: "Data Annotations.",
      source: "Cold Outreach",
      status: "lost",
    }),
  ];
};

const loadMock = (): Lead[] => {
  if (typeof localStorage === "undefined") return seedLeads();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedLeads();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    return JSON.parse(raw) as Lead[];
  } catch {
    return seedLeads();
  }
};

const saveMock = (leads: Lead[]) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }
};

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------ Real fetcher ------------------------------ */

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/* --------------------------------- API ------------------------------------ */

export const api = {
  async listLeads(): Promise<Lead[]> {
    if (!USE_MOCK) return http<Lead[]>("/leads");
    await delay();
    return loadMock().sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );
  },

  async getLead(id: string): Promise<Lead> {
    if (!USE_MOCK) return http<Lead>(`/leads/${id}`);
    await delay(150);
    const lead = loadMock().find((l) => l.id === id);
    if (!lead) throw new Error("Lead not found");
    return lead;
  },

  async createLead(input: CreateLeadInput): Promise<Lead> {
    if (!USE_MOCK)
      return http<Lead>("/leads", {
        method: "POST",
        body: JSON.stringify(input),
      });
    await delay();
    const now = new Date().toISOString();
    const lead: Lead = {
      id: uid(),
      ...input,
      status: "new",
      createdAt: now,
      updatedAt: now,
      notes: [],
    };
    const all = [lead, ...loadMock()];
    saveMock(all);
    return lead;
  },

  async updateLead(id: string, patch: UpdateLeadInput): Promise<Lead> {
    if (!USE_MOCK)
      return http<Lead>(`/leads/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      });
    await delay(150);
    const all = loadMock();
    const idx = all.findIndex((l) => l.id === id);
    if (idx === -1) throw new Error("Lead not found");
    all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
    saveMock(all);
    return all[idx];
  },

  async deleteLead(id: string): Promise<void> {
    if (!USE_MOCK)
      return http<void>(`/leads/${id}`, { method: "DELETE" });
    await delay(150);
    saveMock(loadMock().filter((l) => l.id !== id));
  },

  async addNote(leadId: string, body: string, author = "You"): Promise<LeadNote> {
    if (!USE_MOCK)
      return http<LeadNote>(`/leads/${leadId}/notes`, {
        method: "POST",
        body: JSON.stringify({ body, author }),
      });
    await delay(150);
    const all = loadMock();
    const idx = all.findIndex((l) => l.id === leadId);
    if (idx === -1) throw new Error("Lead not found");
    const note: LeadNote = {
      id: uid(),
      body,
      author,
      createdAt: new Date().toISOString(),
    };
    all[idx] = {
      ...all[idx],
      notes: [note, ...all[idx].notes],
      updatedAt: new Date().toISOString(),
    };
    saveMock(all);
    return note;
  },

  async deleteNote(leadId: string, noteId: string): Promise<void> {
    if (!USE_MOCK)
      return http<void>(`/leads/${leadId}/notes/${noteId}`, {
        method: "DELETE",
      });
    await delay(120);
    const all = loadMock();
    const idx = all.findIndex((l) => l.id === leadId);
    if (idx === -1) return;
    all[idx] = {
      ...all[idx],
      notes: all[idx].notes.filter((n) => n.id !== noteId),
      updatedAt: new Date().toISOString(),
    };
    saveMock(all);
  },
};
