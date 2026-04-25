import { z } from "zod";

export const createLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email")
    .max(255, "Email too long"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  source: z.string().trim().min(1, "Source is required").max(80),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const noteSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "Note cannot be empty")
    .max(1000, "Note must be under 1000 characters"),
});

export type CreateLeadValues = z.infer<typeof createLeadSchema>;
export type NoteValues = z.infer<typeof noteSchema>;
