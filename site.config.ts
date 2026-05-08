export const siteConfig = {
  name: "Young's Blog",
  description: "Young's Blog",
  url: "https://liyincode.github.io",
  author: "Young",
  defaultLocale: "zh",
  locales: {
    zh: {
      language: "zh-CN",
      path: "/",
      rss: "/rss.xml",
      fontClassName: "font-zh",
      ui: {
        emptyPosts: "暂无文章。",
        languageSwitchLabel: "切换到英文",
        languageSwitchText: "EN",
        skipToContent: "跳到正文",
        themeToggle: {
          dark: "切换到深色模式",
          light: "切换到浅色模式",
        },
      },
    },
    en: {
      language: "en",
      path: "/en",
      rss: "/en/rss.xml",
      fontClassName: "font-en",
      ui: {
        emptyPosts: "No posts yet.",
        languageSwitchLabel: "Switch to Chinese",
        languageSwitchText: "中",
        skipToContent: "Skip to content",
        themeToggle: {
          dark: "Switch to dark mode",
          light: "Switch to light mode",
        },
      },
    },
  },
} as const

export type Locale = keyof typeof siteConfig.locales

export const locales = Object.keys(siteConfig.locales) as Locale[]

export function absoluteUrl(pathname = "") {
  return `${siteConfig.url}${pathname}`
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "zh" : "en"
}

export function getLocaleFromPathname(pathname: string): Locale {
  const matchedLocale = locales.find((locale) => {
    const localePath = siteConfig.locales[locale].path

    return localePath !== "/" && (
      pathname === localePath || pathname.startsWith(`${localePath}/`)
    )
  })

  return matchedLocale ?? siteConfig.defaultLocale
}

export function getLocalePrefix(locale: Locale) {
  const localePath = siteConfig.locales[locale].path

  return localePath === "/" ? "" : localePath
}
