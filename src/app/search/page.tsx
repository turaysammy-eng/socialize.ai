import Link from "next/link";
import { searchPlatform } from "@/features/search/search-service";
import { Search, User, FolderGit2, Users, MessageSquare } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await searchPlatform(q);

  return (
    <main className="flex-1 p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
      <div className="space-y-4 border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Search className="h-8 w-8 text-cyan-400" /> Platform Search
        </h1>
        <p className="text-gray-400 text-sm">Search developers, open-source projects, communities, and discussions.</p>

        <form method="GET" action="/search" className="flex gap-2 max-w-xl">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search keywords, technologies, names..."
            className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-sm"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm rounded-xl transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {q.trim().length > 0 && (
        <div className="space-y-8">
          {/* Profiles */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="h-5 w-5 text-blue-400" /> Developers ({results.profiles.length})
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {results.profiles.length === 0 ? (
                <p className="text-sm text-gray-500 col-span-full">No matching developers found.</p>
              ) : (
                results.profiles.map((p: { id: string; username: string; display_name: string; bio: string }) => (
                  <Link key={p.id} href={`/people/${p.username}`} className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 block">
                    <p className="font-semibold text-white">{p.display_name}</p>
                    <p className="text-xs text-gray-400">@{p.username}</p>
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* Projects */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-green-400" /> Projects ({results.projects.length})
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {results.projects.length === 0 ? (
                <p className="text-sm text-gray-500 col-span-full">No matching projects found.</p>
              ) : (
                results.projects.map((p: { id: string; name: string; slug: string; description: string }) => (
                  <Link key={p.id} href={`/projects/${p.slug}`} className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 block">
                    <p className="font-semibold text-white">{p.name}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{p.description}</p>
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* Communities */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" /> Communities ({results.communities.length})
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {results.communities.length === 0 ? (
                <p className="text-sm text-gray-500 col-span-full">No matching communities found.</p>
              ) : (
                results.communities.map((c: { id: string; name: string; slug: string; description: string }) => (
                  <Link key={c.id} href={`/communities/${c.slug}`} className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 block">
                    <p className="font-semibold text-white">{c.name}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{c.description}</p>
                  </Link>
                ))
              )}
            </div>
          </section>

          {/* Posts */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-orange-400" /> Discussions ({results.posts.length})
            </h2>
            <div className="space-y-3">
              {results.posts.length === 0 ? (
                <p className="text-sm text-gray-500">No matching discussions found.</p>
              ) : (
                results.posts.map((post: { id: string; title: string; body: string }) => (
                  <div key={post.id} className="p-4 rounded-xl bg-gray-900 border border-gray-800">
                    <p className="font-semibold text-white">{post.title}</p>
                    <p className="text-xs text-gray-400 line-clamp-2">{post.body}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
