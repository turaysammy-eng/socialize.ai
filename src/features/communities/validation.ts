import { z } from "zod";

export const createCommunitySchema = z.object({
  name: z.string().min(2, "Community name must be at least 2 characters.").max(100),
  slug: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(1000),
  visibility: z.enum(["public", "private"]).default("public"),
});

export const reportContentSchema = z.object({
  targetType: z.enum(["post", "comment", "user", "project", "community"]),
  targetId: z.string().uuid(),
  reason: z.string().min(5, "Reason must be at least 5 characters.").max(500),
});

export type CreateCommunityInput = z.infer<typeof createCommunitySchema>;
export type ReportContentInput = z.infer<typeof reportContentSchema>;
