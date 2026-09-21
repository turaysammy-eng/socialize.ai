import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MapPin, Globe, Github, Calendar } from "lucide-react";

export default async function ProfilePage({
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
    username: string;
    display_name: string;
    bio: string;
    location: string;
    website_url: string;
    github_url: string;
    skills: string[];
    experience_level: string;
    created_at: string;
  };

  return (
    <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto space-y-8 w-full">
      <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">{profile.display_name}</h1>
            <p className="text-gray-400">@{profile.username}</p>
          </div>
          <span className="px-3 py-1 bg-blue-950 text-blue-400 text-xs font-semibold rounded-full border border-blue-800 uppercase tracking-wider">
            {profile.experience_level}
          </span>
        </div>

        {profile.bio && (
          <p className="text-gray-300 text-base">{profile.bio}</p>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-gray-400 pt-2 border-t border-gray-800">
          {profile.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.website_url && (
            <a href={profile.website_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white">
              <Globe className="h-4 w-4 text-gray-500" />
              <span>Website</span>
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

        {profile.skills && profile.skills.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-gray-800">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill: string) => (
                <span key={skill} className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs rounded-md border border-gray-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
