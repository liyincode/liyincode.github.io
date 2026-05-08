import { formatDate, getAllPosts } from "@/lib/content"
import Link from "next/link"

export default function Home() {
  const posts = getAllPosts("zh")

  return (
    <div className="prose prose-stone dark:prose-invert">
      {posts.map((post) => (
        <article key={post.slug} className="my-10 first:mt-0 last:mb-0">
          <h2 className="mb-1">
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
            <p className="mt-0 text-slate-600 dark:text-slate-300">
              {post.description}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}
