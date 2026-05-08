import Link from "next/link"

import type { Locale } from "@/lib/content"
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

  return (
    <body
      className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${fontClassName}`}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="max-w-2xl mx-auto py-10 px-4">
          <header>
            <div className="flex items-center justify-between">
              <nav className="text-sm font-medium">
                <Link href={homeHref}>Young&apos;s Blog</Link>
              </nav>
              <div className="flex items-center gap-2">
                <LanguageSwitch />
                <ModeToggle />
              </div>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </ThemeProvider>
    </body>
  )
}
