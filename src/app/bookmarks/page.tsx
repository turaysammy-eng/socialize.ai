import { createClient } from "@/lib/supabase/server";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default async function BookmarksPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: bookmarksData } = user
    ? await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  const bookmarks = (bookmarksData || []) as Array<{
    id: string;
    target_type: string;
    created_at: string;
  }>;

  return (
    <main className="flex-1 p-6 md:p-10 space-y-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
        <Bookmark className="h-8 w-8 text-pink-400" />
        <div>
          <h1 className="text-3xl font-extrabold text-white">Saved Bookmarks</h1>
          <p className="text-gray-400 text-sm">Your collection of bookmarked discussions and open source projects.</p>
        </div>
      </div>

      <div className="space-y-4">
        {bookmarks.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-gray-800 rounded-2xl text-gray-400 space-y-3">
            <BookmarkCheck className="h-10 w-10 text-gray-600 mx-auto" />
            <p className="text-base font-medium text-gray-300">No bookmarks saved yet</p>
            <p className="text-sm">Save interesting discussions and projects to access them quickly later.</p>
          </div>
        ) : (
          bookmarks.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-200 uppercase tracking-wider">{item.target_type} Bookmark</span>
              <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
