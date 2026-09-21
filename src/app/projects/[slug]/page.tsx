import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Globe, GitFork, Calendar } from "lucide-react";

export async function generateStaticParams() {
  return [{ slug: "welcome" }];
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: projectData } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!projectData) {
    notFound();
  }

  const project = projectData as {
    id: string;
    name: string;
    slug: string;
    description: string;
    repository_url?: string;
    website_url?: string;
    created_at: string;
  };

  return (
    <main className="flex-1 p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
      <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">{project.name}</h1>
            <p className="text-gray-400 text-sm">p/{project.slug}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm rounded-xl transition-colors">
              Request Collaboration
            </button>
          </div>
        </div>

        <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 pt-4 border-t border-gray-800">
          {project.repository_url && (
            <a
              href={project.repository_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <GitFork className="h-4 w-4 text-purple-400" />
              <span>Repository</span>
            </a>
          )}
          {project.website_url && (
            <a
              href={project.website_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Globe className="h-4 w-4 text-purple-400" />
              <span>Website</span>
            </a>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
