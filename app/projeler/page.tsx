"use client";

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { FadeIn } from '@/components/ui/Reveal';
import { Project } from '@/lib/projects';

export default function Projeler() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
       .catch(err => {
          console.error(err);
          setLoading(false);
       });
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Referans Projelerimiz</h1>
        <p className="text-lg text-gray-400">
          Enerji ve endüstri sektöründe tamamladığımız yüksek kapasiteli soğutma kulesi projeleri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <FadeIn key={project.id} delay={0.1 * index}>
            <div className="group cursor-pointer bg-neutral-900 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all border border-gray-800">
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                <NextImage 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className={`px-4 py-1 text-xs font-bold uppercase tracking-wider text-white ${
                    project.status === "Tamamlandı" ? "bg-green-800" : 
                    project.status === "Devam Ediyor" ? "bg-secondary" : "bg-blue-800"
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">{project.category}</div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1 font-medium">
                  {project.location}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
