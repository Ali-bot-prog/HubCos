import fs from "fs";
import path from "path";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  published: boolean;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  status: string;
  description?: string;
  longDescription?: string;
  area?: string;
  duration?: string;
  service?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readJson<T>(filename: string, fallback: T): T {
  const filePath = path.join(process.cwd(), "data", filename);
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return fallback;
  }
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export function getPosts(): Post[] {
  return readJson<Post[]>("posts.json", []);
}

export function getPublishedPosts(): Post[] {
  return getPosts().filter((p) => p.published);
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug || p.id === slug);
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export function getProjectsFromJson(): Project[] {
  return readJson<Project[]>("projects.json", []);
}

export function getProjectById(id: string): Project | undefined {
  return getProjectsFromJson().find((p) => p.id === id);
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export function getFaqs(): FAQ[] {
  return readJson<FAQ[]>("faq.json", []);
}
