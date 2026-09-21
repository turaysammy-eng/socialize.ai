import { createClient } from "@/lib/supabase/server";

export async function searchPlatform(query: string) {
  if (!query || query.trim().length === 0) {
    return {
      profiles: [],
      projects: [],
      communities: [],
      posts: [],
    };
  }

  const supabase = await createClient();
  const pattern = `%${query.trim()}%`;

  const [{ data: profiles }, { data: projects }, { data: communities }, { data: posts }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, username, display_name, bio")
      .or(`username.ilike.${pattern},display_name.ilike.${pattern},bio.ilike.${pattern}`)
      .limit(10),

    supabase
      .from("projects")
      .select("id, name, slug, description, primary_language")
      .eq("visibility", "public")
      .or(`name.ilike.${pattern},slug.ilike.${pattern},description.ilike.${pattern}`)
      .limit(10),

    supabase
      .from("communities")
      .select("id, name, slug, description")
      .eq("visibility", "public")
      .or(`name.ilike.${pattern},slug.ilike.${pattern},description.ilike.${pattern}`)
      .limit(10),

    supabase
      .from("posts")
      .select("id, title, body, post_type")
      .eq("visibility", "public")
      .or(`title.ilike.${pattern},body.ilike.${pattern}`)
      .limit(10),
  ]);

  return {
    profiles: profiles || [],
    projects: projects || [],
    communities: communities || [],
    posts: posts || [],
  };
}
