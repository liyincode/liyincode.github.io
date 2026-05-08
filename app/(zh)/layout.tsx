import "../globals.css"
import { Inter } from "next/font/google"

import { SiteShell } from "@/components/site-shell"
import { absoluteUrl, siteConfig } from "@/site.config"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.locales.zh.path,
    languages: {
      [siteConfig.locales.zh.language]: siteConfig.locales.zh.path,
      [siteConfig.locales.en.language]: siteConfig.locales.en.path,
    },
    types: {
      "application/rss+xml": siteConfig.locales.zh.rss,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl(siteConfig.locales.zh.path),
    siteName: siteConfig.name,
    type: "website",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={siteConfig.locales.zh.language} suppressHydrationWarning>
      <SiteShell locale="zh" fontClassName={inter.variable}>
        {children}
      </SiteShell>
    </html>
  )
}
