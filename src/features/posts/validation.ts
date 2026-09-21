import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(150),
  body: z.string().min(5, "Body must be at least 5 characters.").max(10000),
  postType: z.enum(["discussion", "announcement", "question", "showcase"]).default("discussion"),
  communityId: z.string().uuid().nullable().optional(),
  projectId: z.string().uuid().nullable().optional(),
  visibility: z.enum(["public", "private"]).default("public"),
});

export const createCommentSchema = z.object({
  postId: z.string().uuid(),
  parentCommentId: z.string().uuid().nullable().optional(),
  body: z.string().min(1, "Comment body cannot be empty.").max(2000),
});

export const toggleReactionSchema = z.object({
  targetType: z.enum(["post", "comment"]),
  targetId: z.string().uuid(),
  reactionType: z.enum(["like", "heart", "rocket", "fire"]).default("like"),
});

export const toggleBookmarkSchema = z.object({
  targetType: z.enum(["post", "project"]),
  targetId: z.string().uuid(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type ToggleReactionInput = z.infer<typeof toggleReactionSchema>;
export type ToggleBookmarkInput = z.infer<typeof toggleBookmarkSchema>;
