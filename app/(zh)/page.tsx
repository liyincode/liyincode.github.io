import { formatDate, getAllPosts } from "@/lib/content"
import { siteConfig } from "@/site.config"
import Link from "next/link"

export default function Home() {
  const posts = getAllPosts("zh")
  const localeConfig = siteConfig.locales.zh

  return (
    <div className="prose prose-stone dark:prose-invert">
      <h1 className="sr-only">{siteConfig.name}</h1>
      {posts.length === 0 && (
        <p className="text-slate-600 dark:text-slate-300">
          {localeConfig.ui.emptyPosts}
        </p>
      )}
      {posts.map((post) => (
        <article key={post.slug} className="my-10 first:mt-0 last:mb-0">
          <h2 className="mt-0 mb-1.5 text-[22px] font-semibold leading-snug">
            <Link href={post.slug} className="no-underline hover:underline">
              {post.title}
            </Link>
          </h2>
          <time
            dateTime={post.date}
            className="mt-0 mb-3 block text-sm text-slate-500 dark:text-slate-400"
          >
            {formatDate(post.date, "zh")}
          </time>
          {post.description && (
            <p className="mt-0 mb-0 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
              {post.description}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}
