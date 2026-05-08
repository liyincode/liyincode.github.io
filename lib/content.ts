import { readdirSync, readFileSync } from "fs"
import path from "path"
import matter from "gray-matter"

const contentDir = path.join(process.cwd(), "content")

interface BaseContent {
  slug: string
  slugAsParams: string
  title: string
  description?: string
  body: string
}

export interface Post extends BaseContent {
  date: string
}

export type Page = BaseContent

function getMdxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return getMdxFiles(fullPath)
    }

    return entry.isFile() && entry.name.endsWith(".mdx") ? [fullPath] : []
  })
}

function getSlugAsParams(collection: "posts" | "pages", filePath: string) {
  return path
    .relative(path.join(contentDir, collection), filePath)
    .replace(/\.mdx$/, "")
    .split(path.sep)
    .join("/")
}

function readContentFile(collection: "posts" | "pages", filePath: string) {
  const source = readFileSync(filePath, "utf8")
  const { data, content } = matter(source)
  const slugAsParams = getSlugAsParams(collection, filePath)

  return {
    slugAsParams,
    title: data.title,
    description: data.description,
    body: content,
    date: data.date,
  }
}

export function getAllPosts(): Post[] {
  return getMdxFiles(path.join(contentDir, "posts")).map((filePath) => {
    const post = readContentFile("posts", filePath)

    return {
      ...post,
      slug: `/posts/${post.slugAsParams}`,
    }
  })
}

export function getAllPages(): Page[] {
  return getMdxFiles(path.join(contentDir, "pages")).map((filePath) => {
    const page = readContentFile("pages", filePath)

    return {
      ...page,
      slug: `/${page.slugAsParams}`,
    }
  })
}

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slugAsParams === slug) ?? null
}

export function getPage(slug: string) {
  return getAllPages().find((page) => page.slugAsParams === slug) ?? null
}
