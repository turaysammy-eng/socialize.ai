import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Github, Globe, MapPin, Calendar } from "lucide-react";

export async function generateStaticParams() {
  return [{ username: "demo" }];
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profileData) {
    notFound();
  }

  const profile = profileData as {
    id: string;
    username: string;
    display_name: string;
    bio?: string;
    location?: string;
    website?: string;
    github_url?: string;
    created_at: string;
  };

  return (
    <main className="flex-1 p-6 md:p-10 space-y-8 max-w-4xl mx-auto w-full">
      <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-purple-600/20 text-purple-400 font-bold text-3xl flex items-center justify-center border border-purple-500/30">
            {profile.display_name[0]?.toUpperCase() || profile.username[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{profile.display_name}</h1>
            <p className="text-purple-400 text-sm">@{profile.username}</p>
          </div>
        </div>

        {profile.bio && <p className="text-gray-300 text-sm leading-relaxed">{profile.bio}</p>}

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 pt-4 border-t border-gray-800">
          {profile.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white">
              <Globe className="h-4 w-4 text-gray-500" />
              <span>{profile.website}</span>
            </a>
          )}
          {profile.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white">
              <Github className="h-4 w-4 text-gray-500" />
              <span>GitHub</span>
            </a>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
