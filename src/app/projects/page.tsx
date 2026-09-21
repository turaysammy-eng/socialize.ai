import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FolderGit2, Plus, Tag } from "lucide-react";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projectsData } = await supabase
    .from("projects")
    .select("*")
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  const projects = (projectsData || []) as Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    primary_language: string;
    topics: string[];
    status: string;
  }>;

  return (
    <main className="flex-1 p-6 md:p-10 space-y-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Open Source Projects</h1>
          <p className="text-gray-400 text-sm">Discover projects needing contributors, maintainers, and collaborators.</p>
        </div>
        <Link href="/projects/new" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 transition-colors text-sm">
          <Plus className="h-4 w-4" /> New Project
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-dashed border-gray-800 rounded-2xl text-gray-400 space-y-3">
            <FolderGit2 className="h-10 w-10 text-gray-600 mx-auto" />
            <p className="text-base font-medium text-gray-300">No public projects found</p>
            <p className="text-sm">Be the first developer to publish an open-source project on SOCIALIZE!</p>
          </div>
        ) : (
          projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors space-y-4 block">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white hover:text-blue-400 transition-colors">{project.name}</h2>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-950 text-blue-400 border border-blue-800 uppercase">
                  {project.status.replace(/_/g, " ")}
                </span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-2 border-t border-gray-800">
                {project.primary_language && (
                  <span className="flex items-center gap-1 font-medium text-gray-300">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    {project.primary_language}
                  </span>
                )}
                {project.topics && project.topics.map((topic) => (
                  <span key={topic} className="flex items-center gap-1 text-gray-500">
                    <Tag className="h-3 w-3" />
                    {topic}
                  </span>
                ))}
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
