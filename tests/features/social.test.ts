import { describe, it, expect } from "vitest";
import { createPostSchema, createCommentSchema, toggleReactionSchema, toggleBookmarkSchema } from "@/features/posts/validation";

describe("Social Interaction Schemas", () => {
  it("validates post creation input", () => {
    const valid = createPostSchema.safeParse({
      title: "Building Scalable Next.js Applications with Supabase",
      body: "Here are some best practices for structuring App Router and RLS policies.",
      postType: "discussion",
      visibility: "public",
    });
    expect(valid.success).toBe(true);
  });

  it("validates comment creation input", () => {
    const valid = createCommentSchema.safeParse({
      postId: "11111111-1111-1111-1111-111111111111",
      body: "Great article! Thanks for sharing this breakdown.",
    });
    expect(valid.success).toBe(true);
  });

  it("validates reaction toggle input", () => {
    const valid = toggleReactionSchema.safeParse({
      targetType: "post",
      targetId: "11111111-1111-1111-1111-111111111111",
      reactionType: "rocket",
    });
    expect(valid.success).toBe(true);
  });

  it("validates bookmark toggle input", () => {
    const valid = toggleBookmarkSchema.safeParse({
      targetType: "project",
      targetId: "11111111-1111-1111-1111-111111111111",
    });
    expect(valid.success).toBe(true);
  });
});
