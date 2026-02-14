export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  status: string;
  description?: string;
};

import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data/projects.json');

export const getProjects = (): Project[] => {
  if (!fs.existsSync(dataPath)) {
    return [];
  }
  const file = fs.readFileSync(dataPath, 'utf-8');
  try {
      return JSON.parse(file);
  } catch (e) {
      return [];
  }
};

export const saveProjects = (projects: Project[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));
};

export const addProject = (project: Project) => {
  const projects = getProjects();
  projects.push(project);
  saveProjects(projects);
};

export const updateProject = (updatedProject: Project) => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === updatedProject.id);
  if (index !== -1) {
    projects[index] = updatedProject;
    saveProjects(projects);
  }
};

export const deleteProject = (id: string) => {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  saveProjects(filtered);
};
