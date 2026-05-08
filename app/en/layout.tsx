import "../globals.css"
import { Inter } from "next/font/google"

import { SiteShell } from "@/components/site-shell"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  metadataBase: new URL("https://liyincode.github.io"),
  title: {
    default: "Young's Blog",
    template: "%s | Young's Blog",
  },
  description: "Young's Blog",
  alternates: {
    canonical: "/en",
    languages: {
      "zh-CN": "/",
      en: "/en",
    },
    types: {
      "application/rss+xml": "/en/rss.xml",
    },
  },
  openGraph: {
    title: "Young's Blog",
    description: "Young's Blog",
    url: "https://liyincode.github.io/en",
    siteName: "Young's Blog",
    type: "website",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SiteShell locale="en" fontClassName={inter.className}>
        {children}
      </SiteShell>
    </html>
  )
}
