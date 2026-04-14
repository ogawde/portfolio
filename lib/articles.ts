import "server-only"

import path from "node:path"
import { promises as fs } from "node:fs"
import matter from "gray-matter"

export type ArticleMeta = {
  id: number
  slug: string
  title: string
  excerpt: string
  readTime: string
}

export type Article = ArticleMeta & {
  content: string
}

export type ArticleSection = {
  id: string
  title: string
}

const ARTICLES_DIR = path.join(process.cwd(), "content/articles")

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

async function readArticleFile(fileName: string): Promise<Article> {
  const filePath = path.join(ARTICLES_DIR, fileName)
  const fileContents = await fs.readFile(filePath, "utf8")
  const { data, content } = matter(fileContents)
  const slug = fileName.replace(/\.mdx$/, "")

  return {
    id: Number(data.id),
    slug,
    title: String(data.title ?? ""),
    excerpt: String(data.excerpt ?? ""),
    readTime: String(data.readTime ?? ""),
    content: content.trim(),
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const files = await fs.readdir(ARTICLES_DIR)
  const markdownFiles = files.filter((fileName) => fileName.endsWith(".mdx"))
  const loaded = await Promise.all(markdownFiles.map(readArticleFile))

  return loaded.sort((a, b) => a.id - b.id)
}

export async function getAllArticlesMeta(): Promise<ArticleMeta[]> {
  const articles = await getAllArticles()
  return articles.map(({ id, slug, title, excerpt, readTime }) => ({
    id,
    slug,
    title,
    excerpt,
    readTime,
  }))
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`)

  try {
    const fileContents = await fs.readFile(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      id: Number(data.id),
      slug,
      title: String(data.title ?? ""),
      excerpt: String(data.excerpt ?? ""),
      readTime: String(data.readTime ?? ""),
      content: content.trim(),
    }
  } catch {
    return null
  }
}

export function getSectionsFromMarkdown(content: string): ArticleSection[] {
  const sections: ArticleSection[] = []
  const headingRegex = /^##\s+(.+)$/gm

  for (const match of content.matchAll(headingRegex)) {
    const title = match[1]?.trim()
    if (!title) continue
    sections.push({ id: slugify(title), title })
  }

  return sections.length > 0 ? sections : [{ id: "article", title: "Article" }]
}

