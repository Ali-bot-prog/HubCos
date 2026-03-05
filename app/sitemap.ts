import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.xn--hubyap-u9a.com'

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projeler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sss`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Dynamic blog post routes
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const filePath = path.join(process.cwd(), 'data/posts.json')
    if (fs.existsSync(filePath)) {
      const posts = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      blogRoutes = posts
        .filter((p: any) => p.published)
        .map((p: any) => ({
          url: `${baseUrl}/blog/${p.slug || p.id}`,
          lastModified: p.date ? new Date(p.date) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }))
    }
  } catch {
    // Fail silently; static routes still served
  }

  // Dynamic project (case study) routes
  let projectRoutes: MetadataRoute.Sitemap = []
  try {
    const filePath = path.join(process.cwd(), 'data/projects.json')
    if (fs.existsSync(filePath)) {
      const projects = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      projectRoutes = projects.map((p: any) => ({
        url: `${baseUrl}/projeler/${p.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
    }
  } catch {
    // Fail silently
  }

  // Static sub-service pages
  const serviceSubPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/hizmetler/yapisal-guclendirme`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ]

  return [...staticRoutes, ...serviceSubPages, ...blogRoutes, ...projectRoutes]
}

