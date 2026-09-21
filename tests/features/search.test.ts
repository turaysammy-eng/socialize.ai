import { describe, it, expect } from "vitest";
import { searchPlatform } from "@/features/search/search-service";

describe("Search Service", () => {
  it("returns empty result objects for empty queries", async () => {
    const results = await searchPlatform("");
    expect(results).toEqual({
      profiles: [],
      projects: [],
      communities: [],
      posts: [],
    });
  });
});
