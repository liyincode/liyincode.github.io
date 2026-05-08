import type { MetadataRoute } from "next"

import {
  getAllPages,
  getAllPosts,
  getPageAlternates,
  getPostAlternates,
} from "@/lib/content"

const siteUrl = "https://liyincode.github.io"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      alternates: {
        languages: {
          "zh-CN": siteUrl,
          en: `${siteUrl}/en`,
        },
      },
    },
    {
      url: `${siteUrl}/en`,
      alternates: {
        languages: {
          "zh-CN": siteUrl,
          en: `${siteUrl}/en`,
        },
      },
    },
    ...getAllPages("zh").map((page) => ({
      url: `${siteUrl}${page.slug}`,
      alternates: getSitemapAlternates(getPageAlternates(page.slugAsParams)),
    })),
    ...getAllPages("en").map((page) => ({
      url: `${siteUrl}${page.slug}`,
      alternates: getSitemapAlternates(getPageAlternates(page.slugAsParams)),
    })),
    ...getAllPosts("zh").map((post) => ({
      url: `${siteUrl}${post.slug}`,
      lastModified: post.date,
      alternates: getSitemapAlternates(getPostAlternates(post.slugAsParams)),
    })),
    ...getAllPosts("en").map((post) => ({
      url: `${siteUrl}${post.slug}`,
      lastModified: post.date,
      alternates: getSitemapAlternates(getPostAlternates(post.slugAsParams)),
    })),
  ]
}

function getSitemapAlternates(languages: Record<string, string>) {
  return {
    languages: Object.fromEntries(
      Object.entries(languages).map(([locale, pathname]) => [
        locale,
        `${siteUrl}${pathname}`,
      ]),
    ),
  }
}
