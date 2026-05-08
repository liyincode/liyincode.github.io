import type { MetadataRoute } from "next"

import {
  getAllPages,
  getAllPosts,
  getPageAlternates,
  getPostAlternates,
} from "@/lib/content"
import { absoluteUrl, siteConfig } from "@/site.config"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      alternates: {
        languages: {
          [siteConfig.locales.zh.language]: siteConfig.url,
          [siteConfig.locales.en.language]: absoluteUrl(
            siteConfig.locales.en.path,
          ),
        },
      },
    },
    {
      url: absoluteUrl(siteConfig.locales.en.path),
      alternates: {
        languages: {
          [siteConfig.locales.zh.language]: siteConfig.url,
          [siteConfig.locales.en.language]: absoluteUrl(
            siteConfig.locales.en.path,
          ),
        },
      },
    },
    ...getAllPages("zh").map((page) => ({
      url: absoluteUrl(page.slug),
      alternates: getSitemapAlternates(getPageAlternates(page.slugAsParams)),
    })),
    ...getAllPages("en").map((page) => ({
      url: absoluteUrl(page.slug),
      alternates: getSitemapAlternates(getPageAlternates(page.slugAsParams)),
    })),
    ...getAllPosts("zh").map((post) => ({
      url: absoluteUrl(post.slug),
      lastModified: post.date,
      alternates: getSitemapAlternates(getPostAlternates(post.slugAsParams)),
    })),
    ...getAllPosts("en").map((post) => ({
      url: absoluteUrl(post.slug),
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
        absoluteUrl(pathname),
      ]),
    ),
  }
}
