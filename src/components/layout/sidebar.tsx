import Link from "next/link";
import { Home, Compass, FolderGit2, Users, Bell, Bookmark, Search, PlusCircle } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-800 bg-gray-950 p-4 hidden lg:block shrink-0">
      <nav className="space-y-1 text-sm font-medium text-gray-300">
        <Link href="/feed" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white">
          <Home className="h-5 w-5 text-blue-400" /> Home Feed
        </Link>
        <Link href="/discover" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white">
          <Compass className="h-5 w-5 text-purple-400" /> Discover
        </Link>
        <Link href="/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white">
          <FolderGit2 className="h-5 w-5 text-green-400" /> Projects
        </Link>
        <Link href="/communities" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white">
          <Users className="h-5 w-5 text-orange-400" /> Communities
        </Link>
        <Link href="/notifications" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white">
          <Bell className="h-5 w-5 text-yellow-400" /> Notifications
        </Link>
        <Link href="/bookmarks" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white">
          <Bookmark className="h-5 w-5 text-pink-400" /> Bookmarks
        </Link>
        <Link href="/search" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white">
          <Search className="h-5 w-5 text-cyan-400" /> Search
        </Link>
      </nav>

      <div className="mt-8 pt-4 border-t border-gray-800 space-y-2">
        <span className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Create</span>
        <Link href="/projects/new" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
          <PlusCircle className="h-4 w-4 text-blue-400" /> New Project
        </Link>
        <Link href="/communities/new" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
          <PlusCircle className="h-4 w-4 text-purple-400" /> New Community
        </Link>
      </div>
    </aside>
  );
}
