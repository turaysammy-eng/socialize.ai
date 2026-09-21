"use server";


import { createClient } from "@/lib/supabase/server";
import { profileUpdateSchema, ProfileUpdateInput } from "./validation";

export async function updateProfileAction(input: ProfileUpdateInput) {
  const validation = profileUpdateSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { displayName, bio, location, websiteUrl, githubUrl, skills, experienceLevel } = validation.data;

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName,
      bio,
      location,
      website_url: websiteUrl,
      github_url: githubUrl,
      skills,
      experience_level: experienceLevel,
      updated_at: new Date().toISOString(),
    } as never)
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function followUserAction(targetUserId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  if (user.id === targetUserId) {
    return { error: "You cannot follow yourself." };
  }

  const { error } = await supabase.from("user_follows").insert({
    follower_id: user.id,
    following_id: targetUserId,
  } as never);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function unfollowUserAction(targetUserId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { error } = await supabase
    .from("user_follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("following_id", targetUserId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
