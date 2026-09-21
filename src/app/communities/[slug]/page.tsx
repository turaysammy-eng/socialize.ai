import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Users, Calendar, MessageSquare } from "lucide-react";

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: communityData } = await supabase
    .from("communities")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!communityData) {
    notFound();
  }

  const community = communityData as {
    id: string;
    name: string;
    slug: string;
    description: string;
    created_at: string;
  };

  return (
    <main className="flex-1 p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
      <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">{community.name}</h1>
            <p className="text-gray-400 text-sm">c/{community.slug}</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm rounded-xl transition-colors">
            Join Community
          </button>
        </div>

        <p className="text-gray-300 text-base leading-relaxed">{community.description}</p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 pt-4 border-t border-gray-800">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Created {new Date(community.created_at).toLocaleDateString()}</span>
          </div>
          <Link href={`/communities/${community.slug}/members`} className="flex items-center gap-1.5 hover:text-white">
            <Users className="h-4 w-4 text-gray-500" />
            <span>Roster</span>
          </Link>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4 text-gray-500" />
            <span>Discussions</span>
          </div>
        </div>
      </div>
    </main>
  );
}
