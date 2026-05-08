import { notFound } from "next/navigation"
import { Metadata } from "next"

import { Mdx } from "@/components/mdx-components"
import { getAllPages, getPage } from "@/lib/content"

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getPageFromParams(params: PageProps["params"]) {
  const { slug } = await params
  const slugString = slug?.join("/")
  const page = getPage(slugString)

  if (!page) {
    return null
  }

  return page
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export async function generateStaticParams() {
  return getAllPages().map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1>{page.title}</h1>
      {page.description && <p className="text-xl">{page.description}</p>}
      <hr />
      <Mdx source={page.body} />
    </article>
  )
}
