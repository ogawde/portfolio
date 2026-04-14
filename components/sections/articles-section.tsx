"use client"

import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { SmoothLink } from "@/components/ui/smooth-link"
import type { ArticleMeta } from "@/lib/articles"

export function ArticlesSection({ articles }: { articles: ArticleMeta[] }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="articles" className="scroll-mt-24">
      <div className="relative py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-background/60 via-background/90 to-background/60" />

        <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="mt-1 flex items-center gap-2">
            <h2 className="text-2xl font-semibold tracking-wide sm:text-5xl">
              Writings & Thoughts
            </h2>
            <div className="h-px w-full bg-border/70" />
          </div>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Thoughts on engineering, design, and life.
          </p>
        </motion.div>

        <div className="flex flex-col divide-y divide-border/50">
          {articles.slice(0, 4).map((post, index) => (
            <motion.div
              key={post.slug}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.03 }}
              className="group"
            >
              <SmoothLink
                href={`/articles/${post.slug}`}
                className="group flex items-start justify-between gap-6 py-4"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-semibold tracking-tight text-foreground/90 transition-colors group-hover:text-foreground">
                    {post.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  <span>Read more</span>
                  <ArrowRight className="size-4" />
                </div>
              </SmoothLink>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <SmoothLink
            href="/articles"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all articles
          </SmoothLink>
        </div>
        </div>
      </div>
    </section>
  )
}

