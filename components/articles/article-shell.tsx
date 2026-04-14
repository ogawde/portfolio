"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowLeft } from "lucide-react"

import {
  ScrollProgress,
  ScrollProgressProvider,
} from "@/components/animate-ui/primitives/animate/scroll-progress"
import { SmoothLink } from "@/components/ui/smooth-link"
import type { ArticleSection } from "@/lib/articles"
import { cn } from "@/lib/utils"

export function ArticleShell({
  title,
  sections,
  children,
}: {
  title: string
  sections: ArticleSection[]
  children: React.ReactNode
}) {
  const shouldReduceMotion = useReducedMotion()
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "intro")

  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: "-30% 0px -55% 0px" }
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [sectionIds])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top: y, behavior: "smooth" })
    setActiveId(id)
  }

  return (
    <ScrollProgressProvider global>
      <ScrollProgress
        mode="width"
        className="fixed left-0 top-0 z-[120] h-[2px] bg-foreground/80"
      />
      <div className="min-h-[calc(100vh-4rem)]">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-10">
          <div className="mb-10 flex items-center justify-between">
            <SmoothLink
              href="/articles"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back
            </SmoothLink>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
            <div>
              <motion.header
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="mb-12"
              >
                <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {title}
                </h1>
              </motion.header>

              <div className="prose prose-neutral max-w-none dark:prose-invert">
                {children}
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur-sm">
                <p className="text-xs font-medium text-muted-foreground">
                  Contents
                </p>
                <div className="mt-3 flex flex-col gap-1">
                  {sections.map((s) => {
                    const isActive = s.id === activeId
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => scrollTo(s.id)}
                        className={cn(
                          "rounded-lg px-3 py-2 text-left text-sm transition-colors",
                          isActive
                            ? "bg-foreground/8 text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-foreground/6"
                        )}
                      >
                        {s.title}
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </ScrollProgressProvider>
  )
}

