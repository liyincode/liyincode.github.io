import { getAllPosts } from "@/lib/content"
import Link from "next/link"

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="prose prose-stone dark:prose-invert">
      {posts.map((post) => (
        <article key={post.slug}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  )
}
