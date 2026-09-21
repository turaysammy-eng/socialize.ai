import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Users, Plus } from "lucide-react";

export default async function CommunitiesPage() {
  const supabase = await createClient();

  const { data: communitiesData } = await supabase
    .from("communities")
    .select("*")
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  const communities = (communitiesData || []) as Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    created_at: string;
  }>;

  return (
    <main className="flex-1 p-6 md:p-10 space-y-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Developer Communities</h1>
          <p className="text-gray-400 text-sm">Join technical communities and participate in focused developer discussions.</p>
        </div>
        <Link href="/communities/new" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-500 transition-colors text-sm">
          <Plus className="h-4 w-4" /> New Community
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {communities.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-dashed border-gray-800 rounded-2xl text-gray-400 space-y-3">
            <Users className="h-10 w-10 text-gray-600 mx-auto" />
            <p className="text-base font-medium text-gray-300">No public communities found</p>
            <p className="text-sm">Create the first developer community on SOCIALIZE!</p>
          </div>
        ) : (
          communities.map((community) => (
            <Link key={community.id} href={`/communities/${community.slug}`} className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors space-y-3 block">
              <h2 className="text-xl font-bold text-white hover:text-purple-400 transition-colors">{community.name}</h2>
              <p className="text-sm text-gray-300 line-clamp-2">{community.description}</p>
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-800">
                Created {new Date(community.created_at).toLocaleDateString()}
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
