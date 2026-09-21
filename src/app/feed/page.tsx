import { createClient } from "@/lib/supabase/server";
import { MessageSquare, Heart, Bookmark, Sparkles } from "lucide-react";

export default async function FeedPage() {
  const supabase = await createClient();

  const { data: postsData } = await supabase
    .from("posts")
    .select("*")
    .eq("visibility", "public")
    .order("created_at", { ascending: false })
    .limit(20);

  const posts = (postsData || []) as Array<{
    id: string;
    title: string;
    body: string;
    post_type: string;
    created_at: string;
  }>;

  return (
    <main className="flex-1 p-6 md:p-10 space-y-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
        <Sparkles className="h-8 w-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-extrabold text-white">Developer Home Feed</h1>
          <p className="text-gray-400 text-sm">Discussions, showcases, and activity across projects and communities.</p>
        </div>
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-gray-800 rounded-2xl text-gray-400 space-y-3">
            <MessageSquare className="h-10 w-10 text-gray-600 mx-auto" />
            <p className="text-base font-medium text-gray-300">No discussions yet</p>
            <p className="text-sm">Start a new discussion or project showcase!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-950 text-blue-400 border border-blue-800 uppercase">
                  {post.post_type}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white hover:text-blue-400 transition-colors">{post.title}</h2>
              <p className="text-sm text-gray-300 line-clamp-3">{post.body}</p>

              <div className="flex items-center gap-6 text-xs text-gray-400 pt-3 border-t border-gray-800">
                <button className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
                  <Heart className="h-4 w-4" /> React
                </button>
                <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                  <MessageSquare className="h-4 w-4" /> Comment
                </button>
                <button className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
                  <Bookmark className="h-4 w-4" /> Bookmark
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
