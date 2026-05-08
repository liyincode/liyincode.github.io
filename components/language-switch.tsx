"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function LanguageSwitch() {
  const pathname = usePathname()
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/")
  const href = isEnglish
    ? pathname.replace(/^\/en(?=\/|$)/, "") || "/"
    : `/en${pathname === "/" ? "" : pathname}`

  return (
    <Link
      href={href}
      aria-label={isEnglish ? "Switch to Chinese" : "Switch to English"}
      className="inline-flex size-6 shrink-0 appearance-none items-center justify-center rounded-md border border-gray-200 bg-transparent p-0 align-middle text-[10px] font-semibold leading-none text-slate-900 no-underline dark:border-slate-800 dark:text-slate-50"
    >
      {isEnglish ? "中" : "EN"}
    </Link>
  )
}
