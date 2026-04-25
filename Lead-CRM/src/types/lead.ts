export type LeadStatus = "new" | "contacted" | "converted" | "lost";

export interface LeadNote {
  id: string;
  body: string;
  createdAt: string; 
  author?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string; 
  status: LeadStatus;
  message?: string;
  createdAt: string; 
  updatedAt: string; 
  followUpAt?: string | null; 
  notes: LeadNote[];
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  message?: string;
}

export interface UpdateLeadInput {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  status?: LeadStatus;
  followUpAt?: string | null;
}
