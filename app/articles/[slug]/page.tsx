import { notFound } from "next/navigation"
import { isValidElement, type ReactNode } from "react"
import { MDXRemote } from "next-mdx-remote/rsc"

import { articleMdxComponents } from "@/components/articles/article-mdx-components"
import { ArticleShell } from "@/components/articles/article-shell"
import { getArticleBySlug, getSectionsFromMarkdown } from "@/lib/articles"

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("")
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children ?? "")
  }

  return ""
}

function ArticleBody({ content }: { content: string }) {
  return (
    <MDXRemote
      source={content}
      components={{
        ...articleMdxComponents,
        h2: ({ children, ...props }) => {
          const title = getNodeText(children)
          return (
            <h2
              id={slugify(title)}
              className="mt-10 mb-4 scroll-mt-32 text-3xl font-semibold tracking-tight first:mt-0"
              {...props}
            >
              {children}
            </h2>
          )
        },
      }}
    />
  )
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <ArticlePageInner params={params} />
  )
}

async function ArticlePageInner({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()
  const sections = getSectionsFromMarkdown(article.content)

  return (
    <ArticleShell
      title={article.title}
      sections={sections}
    >
      <ArticleBody content={article.content} />
    </ArticleShell>
  )
}

