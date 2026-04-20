import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { BlogPost, BlogPostWithContent } from '@/types/blog'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

// Get all slugs
export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

// Get single post metadata + content
export function getBlogPost(slug: string): BlogPostWithContent | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const { text: readTime } = readingTime(content)

  return {
    slug,
    title:       data.title       ?? 'Untitled',
    description: data.description ?? '',
    date:        data.date        ?? '',
    author:      data.author      ?? 'Smart Auto UAE',
    category:    data.category    ?? 'General',
    tags:        data.tags        ?? [],
    image:       data.image       ?? '/images/blog/default.webp',
    readingTime: readTime,
    published:   data.published   ?? true,
    content,
  }
}

// Get all posts sorted by date (newest first)
export function getAllBlogPosts(): BlogPost[] {
  return getBlogSlugs()
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPostWithContent => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get posts by category
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  )
}

// Get related posts (same category, exclude current)
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPost(slug)
  if (!current) return []
  return getAllBlogPosts()
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit)
}

// Get all unique categories
export function getAllCategories(): string[] {
  const cats = getAllBlogPosts().map((p) => p.category)
  return [...new Set(cats)]
}