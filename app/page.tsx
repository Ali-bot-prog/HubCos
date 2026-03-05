import HomeClient from "./HomeClient";
import { getSiteConfig } from "@/lib/config";
import { getProjectsFromJson } from "@/lib/data";

// Server component — fetches all data at build/request time,
// passes typed props down to the animated client shell.
export default async function Home() {
  const [config, projects] = await Promise.all([
    getSiteConfig(),
    Promise.resolve(getProjectsFromJson()),
  ]);

  return <HomeClient config={config} projects={projects} />;
}
