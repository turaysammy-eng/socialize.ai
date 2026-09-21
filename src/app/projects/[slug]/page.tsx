import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Github, Globe, Users, MessageSquare, Shield, Tag } from "lucide-react";

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
    repository_url: string;
    website_url: string;
    license: string;
    status: string;
    primary_language: string;
    topics: string[];
    created_at: string;
  };

  return (
    <main className="flex-1 p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full">
      <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">{project.name}</h1>
            <p className="text-gray-400 text-sm">Created {new Date(project.created_at).toLocaleDateString()}</p>
          </div>
          <span className="px-3 py-1 bg-green-950 text-green-400 text-xs font-semibold rounded-full border border-green-800 uppercase tracking-wider">
            {project.status.replace(/_/g, " ")}
          </span>
        </div>

        <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-300 pt-4 border-t border-gray-800">
          {project.repository_url && (
            <a href={project.repository_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-colors">
              <Github className="h-4 w-4" /> Repository
            </a>
          )}
          {project.website_url && (
            <a href={project.website_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-colors">
              <Globe className="h-4 w-4" /> Website
            </a>
          )}
          <Link href={`/projects/${project.slug}/members`} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-colors">
            <Users className="h-4 w-4" /> Team Members
          </Link>
          <Link href={`/projects/${project.slug}/discussions`} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-colors">
            <MessageSquare className="h-4 w-4" /> Discussions
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 pt-4 border-t border-gray-800">
          {project.primary_language && (
            <span className="flex items-center gap-1 font-medium text-gray-300">
              Language: {project.primary_language}
            </span>
          )}
          {project.license && (
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-gray-500" /> License: {project.license}
            </span>
          )}
          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {project.topics.map((topic) => (
                <span key={topic} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded border border-gray-700 flex items-center gap-1">
                  <Tag className="h-3 w-3 text-gray-500" /> {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
