"use server";

import { createClient } from "@/lib/supabase/server";
import { createCommunitySchema, reportContentSchema, CreateCommunityInput, ReportContentInput } from "./validation";

export async function createCommunityAction(input: CreateCommunityInput) {
  const validation = createCommunitySchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { name, slug, description, visibility } = validation.data;

  const { data: community, error } = await supabase
    .from("communities")
    .insert({
      owner_id: user.id,
      name,
      slug,
      description,
      visibility,
    } as never)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  const communityRecord = community as { id: string };

  await supabase.from("community_members").insert({
    community_id: communityRecord.id,
    user_id: user.id,
    role: "owner",
  } as never);

  return { success: true, community };
}

export async function joinCommunityAction(communityId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { error } = await supabase.from("community_members").insert({
    community_id: communityId,
    user_id: user.id,
    role: "member",
  } as never);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function submitReportAction(input: ReportContentInput) {
  const validation = reportContentSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { targetType, targetId, reason } = validation.data;

  const { error } = await supabase.from("reports").insert({
    reporter_id: user.id,
    target_type: targetType,
    target_id: targetId,
    reason,
    status: "pending",
  } as never);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
