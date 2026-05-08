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
    canonical: siteConfig.locales.en.path,
    languages: {
      [siteConfig.locales.zh.language]: siteConfig.locales.zh.path,
      [siteConfig.locales.en.language]: siteConfig.locales.en.path,
    },
    types: {
      "application/rss+xml": siteConfig.locales.en.rss,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl(siteConfig.locales.en.path),
    siteName: siteConfig.name,
    type: "website",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={siteConfig.locales.en.language} suppressHydrationWarning>
      <SiteShell locale="en" fontClassName={inter.variable}>
        {children}
      </SiteShell>
    </html>
  )
}
