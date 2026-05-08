"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface LanguageSwitchProps {
  links: Record<string, string>
}

export function LanguageSwitch({ links }: LanguageSwitchProps) {
  const pathname = usePathname()
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/")
  const href = links[pathname] ?? (isEnglish ? "/" : "/en")

  return (
    <Link
      href={href}
      aria-label={isEnglish ? "Switch to Chinese" : "Switch to English"}
      className="inline-flex size-[26px] shrink-0 touch-manipulation appearance-none items-center justify-center rounded-md bg-transparent p-0 align-middle text-[11px] font-semibold leading-none text-slate-900 no-underline transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-600 dark:focus-visible:ring-offset-slate-950"
    >
      {isEnglish ? "中" : "EN"}
    </Link>
  )
}
