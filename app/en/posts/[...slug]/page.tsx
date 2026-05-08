import { notFound } from "next/navigation"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"
import {
  formatDate,
  getAllPosts,
  getPost,
  getPostAlternates,
} from "@/lib/content"

interface PostProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getPostFromParams(params: PostProps["params"]) {
  const { slug } = await params
  const slugString = slug?.join("/")
  const post = getPost(slugString, "en")

  if (!post) {
    return null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const description = post.description ?? post.title

  return {
    title: post.title,
    description,
    alternates: {
      canonical: post.slug,
      languages: getPostAlternates(post.slugAsParams),
    },
    openGraph: {
      title: post.title,
      description,
      url: post.slug,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export async function generateStaticParams() {
  return getAllPosts("en").map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-6 prose prose-stone dark:prose-invert">
      <h1 className="mb-2 text-3xl leading-tight">{post.title}</h1>
      {post.description && (
        <p className="mt-0 mb-2 text-base text-slate-600 dark:text-slate-300">
          {post.description}
        </p>
      )}
      <time
        dateTime={post.date}
        className="block text-sm text-slate-500 dark:text-slate-400"
      >
        {formatDate(post.date, "en")}
      </time>
      <hr className="my-6" />
      <Mdx source={post.body} />
    </article>
  )
}
