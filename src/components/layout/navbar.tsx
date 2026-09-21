import Link from "next/link";
import { Code2, Compass, FolderGit2, Users, Bell, Bookmark, Search, User } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-500">
            <Code2 className="h-6 w-6" />
            <span>SOCIALIZE</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link href="/discover" className="hover:text-white flex items-center gap-1.5">
              <Compass className="h-4 w-4" /> Discover
            </Link>
            <Link href="/projects" className="hover:text-white flex items-center gap-1.5">
              <FolderGit2 className="h-4 w-4" /> Projects
            </Link>
            <Link href="/communities" className="hover:text-white flex items-center gap-1.5">
              <Users className="h-4 w-4" /> Communities
            </Link>
            <Link href="/feed" className="hover:text-white flex items-center gap-1.5">
              Feed
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800" title="Search">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/bookmarks" className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800" title="Bookmarks">
            <Bookmark className="h-5 w-5" />
          </Link>
          <Link href="/notifications" className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 relative" title="Notifications">
            <Bell className="h-5 w-5" />
          </Link>
          <Link href="/auth/sign-in" className="hidden sm:inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
            Sign In
          </Link>
          <Link href="/settings/profile" className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800" title="Profile Settings">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
