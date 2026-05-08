import { getAllPosts } from "@/lib/content"

const siteUrl = "https://liyincode.github.io"

export const dynamic = "force-static"

export function GET() {
  const posts = getAllPosts("zh")
  const items = posts
    .map((post) => {
      const url = `${siteUrl}${post.slug}`

      return `<item>
  <title>${escapeXml(post.title)}</title>
  <description>${escapeXml(post.description ?? "")}</description>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>`
    })
    .join("")

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Young's Blog</title>
  <description>Young's Blog</description>
  <link>${siteUrl}</link>
  ${items}
</channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "text/xml",
    },
  })
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&apos;")
}
