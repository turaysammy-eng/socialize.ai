import { describe, it, expect } from "vitest";
import { createProjectSchema, collaborationRequestSchema } from "@/features/projects/validation";

describe("Project Domain Schemas", () => {
  it("validates project creation payload", () => {
    const valid = createProjectSchema.safeParse({
      name: "Socialize Platform",
      slug: "socialize-platform",
      description: "A production-grade social platform for open source developers.",
      repositoryUrl: "https://github.com/example/socialize",
      websiteUrl: "https://socialize.dev",
      license: "MIT",
      visibility: "public",
      status: "looking_for_contributors",
      primaryLanguage: "TypeScript",
      topics: ["nextjs", "supabase"],
    });
    expect(valid.success).toBe(true);
  });

  it("rejects invalid project slug", () => {
    const invalid = createProjectSchema.safeParse({
      name: "Invalid Slug",
      slug: "Invalid Slug Name!",
      description: "A valid description for testing.",
      repositoryUrl: "https://github.com/example/repo",
    });
    expect(invalid.success).toBe(false);
  });

  it("validates collaboration request payload", () => {
    const valid = collaborationRequestSchema.safeParse({
      projectId: "11111111-1111-1111-1111-111111111111",
      requestType: "contributor",
      message: "I would love to help build frontend components!",
    });
    expect(valid.success).toBe(true);
  });
});
