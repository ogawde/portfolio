import { ArrowLeft } from "lucide-react"
import { SmoothLink } from "@/components/ui/smooth-link"
import { getAllArticlesMeta } from "@/lib/articles"

export default async function ArticlesPage() {
  const articles = await getAllArticlesMeta()

  return (
    <main className="mx-auto max-w-3xl px-6 pb-20 pt-16">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-background/60 via-background/90 to-background/60" />

        <div className="relative">
          <div className="mb-8">
            <SmoothLink
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back
            </SmoothLink>
          </div>

          <div className="mb-10">
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              All articles
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              A small collection of notes on engineering, design, and life.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-border/50">
            {articles.map((post) => (
              <div key={post.slug} className="group">
                <SmoothLink
                  href={`/articles/${post.slug}`}
                  className="flex items-start justify-between gap-6 py-4"
                >
                  <div className="space-y-1">
                    <h2 className="text-base font-semibold tracking-tight text-foreground/90 transition-colors group-hover:text-foreground">
                      {post.title}
                    </h2>
                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    <span>Read more</span>
                  </div>
                </SmoothLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

