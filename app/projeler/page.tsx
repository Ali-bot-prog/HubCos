import ProjectGrid from "./ProjectGrid";
import { getProjectsFromJson } from "@/lib/data";

export default async function Projeler() {
  const projects = getProjectsFromJson();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Referans Projelerimiz</h1>
        <p className="text-lg text-gray-400">
          Enerji ve endüstri sektöründe tamamladığımız yüksek kapasiteli soğutma kulesi projeleri.
        </p>
      </div>
      <ProjectGrid projects={projects} />
    </div>
  );
}
