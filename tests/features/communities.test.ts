import { describe, it, expect } from "vitest";
import { createCommunitySchema, reportContentSchema } from "@/features/communities/validation";

describe("Community & Moderation Schemas", () => {
  it("validates community creation input", () => {
    const valid = createCommunitySchema.safeParse({
      name: "React & Next.js Developers",
      slug: "react-nextjs-devs",
      description: "A hub for React and Next.js developers to exchange ideas and best practices.",
      visibility: "public",
    });
    expect(valid.success).toBe(true);
  });

  it("validates content report input", () => {
    const valid = reportContentSchema.safeParse({
      targetType: "post",
      targetId: "11111111-1111-1111-1111-111111111111",
      reason: "This post contains spam content.",
    });
    expect(valid.success).toBe(true);
  });
});
