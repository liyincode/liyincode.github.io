import { notFound } from "next/navigation"
import { Metadata } from "next"

import { Mdx } from "@/components/mdx-components"
import { getAllPages, getPage, getPageAlternates } from "@/lib/content"

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getPageFromParams(params: PageProps["params"]) {
  const { slug } = await params
  const slugString = slug?.join("/")
  const page = getPage(slugString, "en")

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

  const description = page.description ?? page.title

  return {
    title: page.title,
    description,
    alternates: {
      canonical: page.slug,
      languages: getPageAlternates(page.slugAsParams),
    },
    openGraph: {
      title: page.title,
      description,
      url: page.slug,
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  return getAllPages("en").map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <article className="py-6 prose prose-stone dark:prose-invert">
      <h1 className="mb-2 text-3xl leading-tight">{page.title}</h1>
      {page.description && (
        <p className="mt-0 mb-2 text-base text-slate-600 dark:text-slate-300">
          {page.description}
        </p>
      )}
      <hr />
      <Mdx source={page.body} />
    </article>
  )
}
