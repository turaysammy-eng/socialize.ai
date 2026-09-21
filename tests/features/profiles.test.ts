import { describe, it, expect } from "vitest";
import { signUpSchema, signInSchema } from "@/features/auth/validation";
import { profileUpdateSchema } from "@/features/profiles/validation";

describe("Authentication & Profile Validation Schemas", () => {
  it("validates correct sign up input", () => {
    const valid = signUpSchema.safeParse({
      email: "test@example.com",
      password: "securepassword",
      username: "test_user",
      displayName: "Test User",
    });
    expect(valid.success).toBe(true);
  });

  it("rejects invalid username format", () => {
    const invalid = signUpSchema.safeParse({
      email: "test@example.com",
      password: "securepassword",
      username: "invalid username!",
      displayName: "Test User",
    });
    expect(invalid.success).toBe(false);
  });

  it("validates profile update data", () => {
    const valid = profileUpdateSchema.safeParse({
      displayName: "Updated Name",
      bio: "Developer bio",
      location: "New York, NY",
      websiteUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      skills: ["React", "TypeScript"],
      experienceLevel: "senior",
    });
    expect(valid.success).toBe(true);
  });
});
