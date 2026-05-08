import { readdirSync, readFileSync } from "fs"
import path from "path"
import matter from "gray-matter"

const contentDir = path.join(process.cwd(), "content")
export const locales = ["zh", "en"] as const
export type Locale = (typeof locales)[number]

interface ContentIndex {
  pages: Page[]
  posts: Post[]
}

let contentIndex: ContentIndex | null = null

interface BaseContent {
  locale: Locale
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

function getFileLocaleAndSlug(
  collection: "posts" | "pages",
  filePath: string,
) {
  const flattenedPath = path
    .relative(path.join(contentDir, collection), filePath)
    .replace(/\.mdx$/, "")
  const segments = flattenedPath.split(path.sep)
  const fileName = segments.pop() ?? ""
  const locale: Locale = fileName.endsWith(".en") ? "en" : "zh"
  const cleanFileName =
    locale === "en" ? fileName.replace(/\.en$/, "") : fileName
  const slugAsParams = [...segments, cleanFileName].join("/")

  return { locale, slugAsParams }
}

function readContentFile(collection: "posts", filePath: string): Omit<Post, "slug">
function readContentFile(collection: "pages", filePath: string): Omit<Page, "slug">
function readContentFile(
  collection: "posts" | "pages",
  filePath: string,
): Omit<Post, "slug"> | Omit<Page, "slug"> {
  const source = readFileSync(filePath, "utf8")
  const { data, content } = matter(source)
  const { locale, slugAsParams } = getFileLocaleAndSlug(collection, filePath)
  const title = requireString(data.title, "title", filePath)
  const description =
    typeof data.description === "string" ? data.description : undefined
  const base = {
    locale,
    slugAsParams,
    title,
    description,
    body: content,
  }

  if (collection === "posts") {
    return {
      ...base,
      date: requireDate(data.date, filePath),
    }
  }

  return base
}

export function getAllPosts(locale: Locale = "zh"): Post[] {
  return getContentIndex()
    .posts
    .filter((post) => post.locale === locale)
}

export function getAllPages(locale: Locale = "zh"): Page[] {
  return getContentIndex()
    .pages
    .filter((page) => page.locale === locale)
}

export function getPost(slug: string, locale: Locale = "zh") {
  return (
    getAllPosts(locale).find((post) => post.slugAsParams === slug) ?? null
  )
}

export function getPage(slug: string, locale: Locale = "zh") {
  return (
    getAllPages(locale).find((page) => page.slugAsParams === slug) ?? null
  )
}

export function formatDate(date: string, locale: Locale = "zh") {
  if (locale === "zh") {
    return date
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(date))
}

export function getPostAlternates(slugAsParams: string) {
  return getAlternates("posts", slugAsParams)
}

export function getPageAlternates(slugAsParams: string) {
  return getAlternates("pages", slugAsParams)
}

export function getLanguageSwitchMap() {
  const switches: Record<string, string> = {
    "/": "/en",
    "/en": "/",
  }

  for (const post of getAllPosts("zh")) {
    const englishPost = getPost(post.slugAsParams, "en")

    if (englishPost) {
      switches[post.slug] = englishPost.slug
      switches[englishPost.slug] = post.slug
    }
  }

  for (const page of getAllPages("zh")) {
    const englishPage = getPage(page.slugAsParams, "en")

    if (englishPage) {
      switches[page.slug] = englishPage.slug
      switches[englishPage.slug] = page.slug
    }
  }

  return switches
}

function getContentIndex() {
  if (process.env.NODE_ENV !== "development" && contentIndex) {
    return contentIndex
  }

  const index = readContentIndex()

  if (process.env.NODE_ENV !== "development") {
    contentIndex = index
  }

  return index
}

function readContentIndex() {
  const posts = getMdxFiles(path.join(contentDir, "posts"))
    .map((filePath) => {
      const post = readContentFile("posts", filePath)

      return {
        ...post,
        slug: getPostSlug(post.locale, post.slugAsParams),
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  const pages = getMdxFiles(path.join(contentDir, "pages")).map((filePath) => {
    const page = readContentFile("pages", filePath)

    return {
      ...page,
      slug: getPageSlug(page.locale, page.slugAsParams),
    }
  })

  return { posts, pages }
}

function getAlternates(collection: "posts" | "pages", slugAsParams: string) {
  const languages: Record<string, string> = {}

  for (const locale of locales) {
    const content =
      collection === "posts"
        ? getPost(slugAsParams, locale)
        : getPage(slugAsParams, locale)

    if (content) {
      languages[locale === "zh" ? "zh-CN" : "en"] = content.slug
    }
  }

  return languages
}

function getPostSlug(locale: Locale, slugAsParams: string) {
  return `${locale === "en" ? "/en" : ""}/posts/${slugAsParams}`
}

function getPageSlug(locale: Locale, slugAsParams: string) {
  return `${locale === "en" ? "/en" : ""}/${slugAsParams}`
}

function requireString(value: unknown, field: string, filePath: string) {
  if (typeof value !== "string" || !value) {
    throw new Error(`${filePath} is missing required "${field}" front matter`)
  }

  return value
}

function requireDate(value: unknown, filePath: string) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10)
  }

  const date = requireString(value, "date", filePath)

  const parsedDate = new Date(`${date}T00:00:00.000Z`)

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(parsedDate.valueOf()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new Error(
      `${filePath} has invalid "date" front matter. Use YYYY-MM-DD.`,
    )
  }

  return date
}
