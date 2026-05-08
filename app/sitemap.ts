import type { MetadataRoute } from "next"

import { getAllPages, getAllPosts } from "@/lib/content"

const siteUrl = "https://liyincode.github.io"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
    },
    {
      url: `${siteUrl}/en`,
    },
    ...getAllPages("zh").map((page) => ({
      url: `${siteUrl}${page.slug}`,
    })),
    ...getAllPages("en").map((page) => ({
      url: `${siteUrl}${page.slug}`,
    })),
    ...getAllPosts("zh").map((post) => ({
      url: `${siteUrl}${post.slug}`,
      lastModified: post.date,
    })),
    ...getAllPosts("en").map((post) => ({
      url: `${siteUrl}${post.slug}`,
      lastModified: post.date,
    })),
  ]
}
