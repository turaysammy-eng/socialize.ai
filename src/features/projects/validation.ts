import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters.").max(100),
  slug: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(2000),
  repositoryUrl: z.string().url("Must be a valid repository URL"),
  websiteUrl: z.string().url("Must be a valid URL").or(z.literal("")).default(""),
  license: z.string().default("MIT"),
  visibility: z.enum(["public", "private"]).default("public"),
  status: z.enum(["active", "archived", "maintenance", "looking_for_contributors"]).default("active"),
  primaryLanguage: z.string().default("TypeScript"),
  topics: z.array(z.string()).default([]),
});

export const collaborationRequestSchema = z.object({
  projectId: z.string().uuid(),
  requestType: z.enum(["contributor", "maintainer", "support"]),
  message: z.string().min(5, "Message must be at least 5 characters.").max(1000),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type CollaborationRequestInput = z.infer<typeof collaborationRequestSchema>;
