"use server";

import { createClient } from "@/lib/supabase/server";
import {
  createPostSchema,
  createCommentSchema,
  toggleReactionSchema,
  toggleBookmarkSchema,
  CreatePostInput,
  CreateCommentInput,
  ToggleReactionInput,
  ToggleBookmarkInput,
} from "./validation";

export async function createPostAction(input: CreatePostInput) {
  const validation = createPostSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { title, body, postType, communityId, projectId, visibility } = validation.data;

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      author_id: user.id,
      title,
      body,
      post_type: postType,
      community_id: communityId || null,
      project_id: projectId || null,
      visibility,
    } as never)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { success: true, post };
}

export async function createCommentAction(input: CreateCommentInput) {
  const validation = createCommentSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { postId, parentCommentId, body } = validation.data;

  const { data: comment, error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      author_id: user.id,
      parent_comment_id: parentCommentId || null,
      body,
    } as never)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { success: true, comment };
}

export async function toggleReactionAction(input: ToggleReactionInput) {
  const validation = toggleReactionSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { targetType, targetId, reactionType } = validation.data;

  const { data: existingData } = await supabase
    .from("reactions")
    .select("id")
    .eq("user_id", user.id)
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .eq("reaction_type", reactionType)
    .maybeSingle();

  const existing = existingData as { id: string } | null;

  if (existing) {
    await supabase.from("reactions").delete().eq("id", existing.id);
    return { success: true, action: "removed" };
  } else {
    await supabase.from("reactions").insert({
      user_id: user.id,
      target_type: targetType,
      target_id: targetId,
      reaction_type: reactionType,
    } as never);
    return { success: true, action: "added" };
  }
}

export async function toggleBookmarkAction(input: ToggleBookmarkInput) {
  const validation = toggleBookmarkSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { targetType, targetId } = validation.data;

  const { data: existingData } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .maybeSingle();

  const existing = existingData as { id: string } | null;

  if (existing) {
    await supabase.from("bookmarks").delete().eq("id", existing.id);
    return { success: true, action: "removed" };
  } else {
    await supabase.from("bookmarks").insert({
      user_id: user.id,
      target_type: targetType,
      target_id: targetId,
    } as never);
    return { success: true, action: "added" };
  }
}
