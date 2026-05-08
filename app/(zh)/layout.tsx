import "../globals.css"
import { Inter } from "next/font/google"

import { SiteShell } from "@/components/site-shell"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
  metadataBase: new URL("https://liyincode.github.io"),
  title: {
    default: "Young's Blog",
    template: "%s | Young's Blog",
  },
  description: "Young's Blog",
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
      en: "/en",
    },
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "Young's Blog",
    description: "Young's Blog",
    url: "https://liyincode.github.io",
    siteName: "Young's Blog",
    type: "website",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <SiteShell locale="zh" fontClassName={inter.variable}>
        {children}
      </SiteShell>
    </html>
  )
}
