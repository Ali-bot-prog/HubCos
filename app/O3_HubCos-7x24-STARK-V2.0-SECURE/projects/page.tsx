"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, MapPin, Tag } from "lucide-react";
import { Project } from "@/lib/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;
    
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p: any) => p.id !== id));
      } else {
        alert("Silinemedi.");
      }
    } catch (err) {
      alert("Hata oluştu.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-bold mb-2">Projeler</h1>
           <p className="text-gray-400">Referans projelerinizi buradan yönetebilirsiniz.</p>
        </div>
        
        <Link
          href="/O3_HubCos-7x24-STARK-V2.0-SECURE/projects/new"
          className="bg-[#C5A059] hover:bg-[#b08e4f] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-[#C5A059]/20"
        >
          <Plus className="w-5 h-5" />
          Yeni Proje Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <div key={project.id} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 group hover:border-[#C5A059]/50 transition-colors">
            <div className="relative h-48">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                    <span className="text-sm">Görsel Yok</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <Link 
                    href={`/O3_HubCos-7x24-STARK-V2.0-SECURE/projects/edit/${project.id}`}
                    className="bg-blue-500/90 hover:bg-blue-600 text-white p-3 rounded-full transition-transform hover:scale-110"
                 >
                    <Pencil className="w-5 h-5" />
                 </Link>
                 <button 
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-500/90 hover:bg-red-600 text-white p-3 rounded-full transition-transform hover:scale-110"
                 >
                    <Trash2 className="w-5 h-5" />
                 </button>
              </div>
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg">
                <span className="text-[#C5A059] text-xs font-bold tracking-wider uppercase">{project.category}</span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                {project.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
