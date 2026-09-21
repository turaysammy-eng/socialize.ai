import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-8 text-sm text-gray-400 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-200">SOCIALIZE</span> &copy; {new Date().getFullYear()} — Social Developer Platform
        </div>
        <div className="flex gap-6">
          <Link href="/discover" className="hover:text-white">Discover</Link>
          <Link href="/projects" className="hover:text-white">Projects</Link>
          <Link href="/communities" className="hover:text-white">Communities</Link>
          <Link href="/search" className="hover:text-white">Search</Link>
        </div>
      </div>
    </footer>
  );
}
