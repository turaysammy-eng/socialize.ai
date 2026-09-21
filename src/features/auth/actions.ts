"use server";

import { createClient } from "@/lib/supabase/server";
import { signUpSchema, signInSchema, forgotPasswordSchema } from "./validation";

export async function signUpAction(formData: FormData): Promise<void> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
    displayName: formData.get("displayName"),
  };

  const validation = signUpSchema.safeParse(rawData);
  if (!validation.success) {
    return;
  }

  const { email, password, username, displayName } = validation.data;
  const supabase = await createClient();

  const { data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        display_name: displayName,
      },
    },
  });

  if (data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      username,
      display_name: displayName,
    } as never);
  }
}

export async function signInAction(formData: FormData): Promise<void> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validation = signInSchema.safeParse(rawData);
  if (!validation.success) {
    return;
  }

  const { email, password } = validation.data;
  const supabase = await createClient();

  await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function forgotPasswordAction(formData: FormData): Promise<void> {
  const rawData = { email: formData.get("email") };
  const validation = forgotPasswordSchema.safeParse(rawData);
  if (!validation.success) {
    return;
  }

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(validation.data.email);
}
