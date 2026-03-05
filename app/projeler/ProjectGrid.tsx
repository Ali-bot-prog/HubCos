"use client";

import NextImage from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/Reveal";
import type { Project } from "@/lib/data";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <FadeIn key={project.id} delay={0.1 * index}>
          <Link href={`/projeler/${project.id}`} className="block group">
            <div className="bg-neutral-900 rounded-lg shadow-sm overflow-hidden hover:shadow-xl hover:shadow-black/40 transition-all duration-300 border border-gray-800 hover:border-[var(--primary)]/40 h-full flex flex-col">
              <div className="relative h-72 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
                <NextImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span
                    className={`px-4 py-1 text-xs font-bold uppercase tracking-wider text-white ${
                      project.status === "Tamamlandı"
                        ? "bg-green-800"
                        : project.status === "Devam Ediyor"
                        ? "bg-secondary"
                        : "bg-blue-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[var(--primary)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm font-medium mb-3">{project.location}</p>
                {project.description && (
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>
                )}
                <div className="mt-auto flex items-center gap-2 text-[var(--primary)] text-sm font-bold uppercase tracking-wider">
                  Vaka Çalışması{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}
