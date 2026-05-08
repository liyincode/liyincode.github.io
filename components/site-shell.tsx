import Link from "next/link"

import { getLanguageSwitchMap, type Locale } from "@/lib/content"
import { LanguageSwitch } from "@/components/language-switch"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"

interface SiteShellProps {
  children: React.ReactNode
  fontClassName: string
  locale: Locale
}

export function SiteShell({
  children,
  fontClassName,
  locale,
}: SiteShellProps) {
  const homeHref = locale === "en" ? "/en" : "/"
  const localeFontClassName = locale === "en" ? "font-en" : "font-zh"
  const languageSwitchLinks = getLanguageSwitchMap()
  const skipText = locale === "en" ? "Skip to content" : "跳到正文"

  return (
    <body
      className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${fontClassName} ${localeFontClassName}`}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:bg-slate-950 dark:focus:text-slate-50 dark:focus:ring-slate-600"
        >
          {skipText}
        </a>
        <div className="max-w-2xl mx-auto py-10 px-4">
          <header>
            <div className="flex items-center justify-between">
              <nav className="text-base font-semibold">
                <Link href={homeHref}>Young&apos;s Blog</Link>
              </nav>
              <div className="flex items-center gap-1">
                <LanguageSwitch links={languageSwitchLinks} />
                <ModeToggle />
              </div>
            </div>
          </header>
          <main id="main-content">{children}</main>
        </div>
      </ThemeProvider>
    </body>
  )
}
