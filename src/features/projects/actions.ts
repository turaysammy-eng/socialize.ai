"use server";


import { createClient } from "@/lib/supabase/server";
import { createProjectSchema, collaborationRequestSchema, CreateProjectInput, CollaborationRequestInput } from "./validation";

export async function createProjectAction(input: CreateProjectInput) {
  const validation = createProjectSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { name, slug, description, repositoryUrl, websiteUrl, license, visibility, status, primaryLanguage, topics } = validation.data;

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      owner_id: user.id,
      name,
      slug,
      description,
      repository_url: repositoryUrl,
      website_url: websiteUrl,
      license,
      visibility,
      status,
      primary_language: primaryLanguage,
      topics,
    } as never)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  const projectRecord = project as { id: string };

  await supabase.from("project_members").insert({
    project_id: projectRecord.id,
    user_id: user.id,
    role: "owner",
  } as never);

  return { success: true, project };
}

export async function submitCollaborationRequestAction(input: CollaborationRequestInput) {
  const validation = collaborationRequestSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  const { projectId, requestType, message } = validation.data;

  const { data: project } = await supabase
    .from("projects")
    .select("owner_id")
    .eq("id", projectId)
    .single();

  if (!project) {
    return { error: "Project not found." };
  }

  const projectOwner = project as { owner_id: string };

  const { error } = await supabase.from("project_collaboration_requests").insert({
    project_id: projectId,
    requester_id: user.id,
    recipient_id: projectOwner.owner_id,
    request_type: requestType,
    message,
    status: "pending",
  } as never);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
