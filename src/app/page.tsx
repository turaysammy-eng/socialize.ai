import Link from "next/link";
import { FolderGit2, Users, MessageSquare, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1 p-6 md:p-10 space-y-12">
      <section className="text-center space-y-6 py-12 border-b border-gray-800">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Where Developers <span className="text-blue-500">Connect & Build</span> Together
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-400">
          Discover open-source projects, join technical communities, ask questions, find collaborators, and showcase your work.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors">
            Explore Projects <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/communities" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-gray-200 font-semibold hover:bg-gray-700 transition-colors border border-gray-700">
            Join Communities
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-3">
          <FolderGit2 className="h-8 w-8 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Open Source Projects</h2>
          <p className="text-sm text-gray-400">Link your repositories, recruit project team members, and manage collaboration requests seamlessly.</p>
        </div>
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-3">
          <Users className="h-8 w-8 text-purple-400" />
          <h2 className="text-xl font-bold text-white">Developer Communities</h2>
          <p className="text-sm text-gray-400">Create specialized hubs around technologies, frameworks, or interests with moderated discussions.</p>
        </div>
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 space-y-3">
          <MessageSquare className="h-8 w-8 text-green-400" />
          <h2 className="text-xl font-bold text-white">Interactive Discussions</h2>
          <p className="text-sm text-gray-400">Ask questions, share showcases, react to ideas, and engage in threaded comment discussions.</p>
        </div>
      </section>
    </main>
  );
}
