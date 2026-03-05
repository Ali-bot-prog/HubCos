import { MetadataRoute } from 'next'
import { getPublishedPosts, getProjectsFromJson } from '@/lib/data'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.xn--hubyap-u9a.com'
const LOCALES = ['tr', 'en', 'ar'] as const

function makeEntry(
  path: string,
  priority: number,
  freq: MetadataRoute.Sitemap[number]['changeFrequency']
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority: locale === 'tr' ? priority : priority - 0.1,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    ...makeEntry('', 1, 'weekly'),
    ...makeEntry('/hakkimizda', 0.8, 'monthly'),
    ...makeEntry('/hizmetler', 0.9, 'monthly'),
    ...makeEntry('/hizmetler/yapisal-guclendirme', 0.9, 'monthly'),
    ...makeEntry('/projeler', 0.9, 'weekly'),
    ...makeEntry('/iletisim', 0.7, 'monthly'),
    ...makeEntry('/sss', 0.7, 'monthly'),
    ...makeEntry('/blog', 0.8, 'weekly'),
  ]

  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const posts = getPublishedPosts()
    posts.forEach((p) => {
      LOCALES.forEach((locale) => {
        blogEntries.push({
          url: `${BASE_URL}/${locale}/blog/${p.slug || p.id}`,
          lastModified: p.date ? new Date(p.date) : new Date(),
          changeFrequency: 'monthly',
          priority: locale === 'tr' ? 0.7 : 0.6,
        })
      })
    })
  } catch { /* fail silently */ }

  let projectEntries: MetadataRoute.Sitemap = []
  try {
    const projects = getProjectsFromJson()
    projects.forEach((p) => {
      LOCALES.forEach((locale) => {
        projectEntries.push({
          url: `${BASE_URL}/${locale}/projeler/${p.id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: locale === 'tr' ? 0.8 : 0.7,
        })
      })
    })
  } catch { /* fail silently */ }

  return [...staticEntries, ...blogEntries, ...projectEntries]
}
