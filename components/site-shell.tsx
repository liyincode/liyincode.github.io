import Link from "next/link"

import { getLanguageSwitchMap } from "@/lib/content"
import { LanguageSwitch } from "@/components/language-switch"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig, type Locale } from "@/site.config"

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
  const localeConfig = siteConfig.locales[locale]
  const homeHref = localeConfig.path
  const languageSwitchLinks = getLanguageSwitchMap()

  return (
    <body
      className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${fontClassName} ${localeConfig.fontClassName}`}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:bg-slate-950 dark:focus:text-slate-50 dark:focus:ring-slate-600"
        >
          {localeConfig.ui.skipToContent}
        </a>
        <div className="max-w-2xl mx-auto py-10 px-4">
          <header>
            <div className="flex items-center justify-between">
              <nav className="text-base font-semibold">
                <Link href={homeHref}>{siteConfig.name}</Link>
              </nav>
              <div className="flex items-center gap-1">
                <LanguageSwitch links={languageSwitchLinks} />
                <ModeToggle locale={locale} />
              </div>
            </div>
          </header>
          <main id="main-content">{children}</main>
        </div>
      </ThemeProvider>
    </body>
  )
}
