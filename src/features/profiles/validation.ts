import { z } from "zod";

export const profileUpdateSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters.").max(50),
  bio: z.string().max(500, "Bio must be 500 characters or fewer.").default(""),
  location: z.string().max(100).default(""),
  websiteUrl: z.string().url("Must be a valid URL").or(z.literal("")).default(""),
  githubUrl: z.string().url("Must be a valid URL").or(z.literal("")).default(""),
  skills: z.array(z.string()).default([]),
  experienceLevel: z.enum(["beginner", "intermediate", "senior", "lead"]).default("intermediate"),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
