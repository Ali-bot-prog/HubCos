import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  status: string;
  description?: string;
};

const dataPath = path.join(process.cwd(), 'data/projects.json');

// Helper to read JSON (Fallback)
const getJsonProjects = (): Project[] => {
  if (!fs.existsSync(dataPath)) return [];
  try {
    const file = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
};

export const getProjects = async (): Promise<Project[]> => {
  if (prisma) {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return projects.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        location: p.location || '',
        image: p.imageUrl,
        status: p.status || 'active',
        description: p.description || ''
      }));
    } catch (error) {
      console.warn("DB fetch failed, falling back to JSON");
    }
  }
  return getJsonProjects();
};

export const addProject = async (project: Project) => {
  if (prisma) {
    try {
      await prisma.project.create({
        data: {
          id: project.id,
          title: project.title,
          category: project.category,
          location: project.location,
          imageUrl: project.image,
          status: project.status,
          description: project.description
        }
      });
      return;
    } catch (e) {
      console.error("DB write failed", e);
      throw new Error("Database write failed");
    }
  }
  // Fallback to JSON (Local only)
  const projects = getJsonProjects();
  projects.push(project);
  fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));
};

export const updateProject = async (updatedProject: Project) => {
  if (prisma) {
    try {
      await prisma.project.update({
        where: { id: updatedProject.id },
        data: {
          title: updatedProject.title,
          category: updatedProject.category,
          location: updatedProject.location,
          imageUrl: updatedProject.image,
          status: updatedProject.status,
          description: updatedProject.description
        }
      });
      return;
    } catch (e) {
      console.error("DB update failed", e);
      throw new Error("Database update failed");
    }
  }

  const projects = getJsonProjects();
  const index = projects.findIndex(p => p.id === updatedProject.id);
  if (index !== -1) {
    projects[index] = updatedProject;
    fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));
  }
};

export const deleteProject = async (id: string) => {
  if (prisma) {
    try {
      await prisma.project.delete({ where: { id } });
      return;
    } catch (e) {
      console.error("DB delete failed", e);
      throw new Error("Database delete failed");
    }
  }

  const projects = getJsonProjects();
  const filtered = projects.filter(p => p.id !== id);
  fs.writeFileSync(dataPath, JSON.stringify(filtered, null, 2));
};
