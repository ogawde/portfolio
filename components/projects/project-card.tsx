"use client"

import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Github, X } from "lucide-react"
import { createPortal } from "react-dom"

import type { ProjectItem } from "@/lib/projects"
import { bannerBlurDataUrlByPath } from "@/lib/project-banner-blurs"

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 24,
}

const cardImageSizes =
  "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
const modalImageSizes = "(max-width: 768px) 100vw, 672px"

export function ProjectCard({
  project,
  priority = false,
}: {
  project: ProjectItem
  priority?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false)
    }
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = expanded ? "hidden" : ""
    document.body.style.overflow = expanded ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [expanded])

  useEffect(() => {
    if (!expanded) return
    const onClick = (event: MouseEvent) => {
      if (!dialogRef.current) return
      if (!dialogRef.current.contains(event.target as Node)) setExpanded(false)
    }
    window.addEventListener("mousedown", onClick)
    return () => window.removeEventListener("mousedown", onClick)
  }, [expanded])

  const bannerBlur = bannerBlurDataUrlByPath[project.banner]

  return (
    <>
      {expanded &&
        createPortal(
          <AnimatePresence>
            {expanded && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="fixed inset-0 z-[110] bg-black/60"
                />

                <div className="fixed inset-0 z-[120] grid place-items-center p-4">
                  <motion.div
                    ref={dialogRef}
                    layoutId={`project-card-${project.id}`}
                    transition={springTransition}
                    className="max-h-[86vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-background"
                  >
                    <motion.div
                      layoutId={`project-image-${project.id}`}
                      transition={springTransition}
                      className="relative aspect-video w-full overflow-hidden border-b border-border"
                    >
                      <Image
                        src={project.banner}
                        alt={`${project.name} preview`}
                        fill
                        sizes={modalImageSizes}
                        className="object-cover object-top"
                        priority={false}
                        placeholder={bannerBlur ? "blur" : "empty"}
                        blurDataURL={bannerBlur}
                      />
                      <button
                        onClick={() => setExpanded(false)}
                        className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur"
                        aria-label="Close project modal"
                      >
                        <X className="size-4" />
                      </button>
                    </motion.div>

                    <div className="max-h-[calc(86vh-220px)] overflow-y-auto p-6">
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <motion.h3
                          layoutId={`project-title-${project.id}`}
                          transition={springTransition}
                          className="text-2xl font-semibold tracking-tight"
                        >
                          {project.name}
                        </motion.h3>
                      </div>

                      <motion.p
                        layoutId={`project-description-${project.id}`}
                        transition={springTransition}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        {project.description}
                      </motion.p>

                      <div className="mt-6">
                        <p className="mb-2 text-sm font-medium">Technologies</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <p className="mb-2 text-sm font-medium">Features</p>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          {project.features.map((feature) => (
                            <li key={feature} className="flex gap-2">
                              <span>•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex items-center gap-3">
                        <Link
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                        >
                          Live <ArrowUpRight className="size-4" />
                        </Link>
                        <Link
                          href={project.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                        >
                          Source <Github className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}

      <motion.article
        layoutId={`project-card-${project.id}`}
        transition={springTransition}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setExpanded(true)}
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-[0_18px_40px_rgba(15,23,42,0.16)] dark:bg-neutral-950/95 dark:shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
      >
        <div className="p-1">
          <motion.div
            layoutId={`project-image-${project.id}`}
            transition={springTransition}
            className="relative h-44 overflow-hidden rounded-xl border border-border bg-muted dark:bg-neutral-900"
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.24),transparent_48%),radial-gradient(circle_at_75%_85%,rgba(168,85,247,0.2),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.2),transparent_48%),radial-gradient(circle_at_75%_85%,rgba(99,102,241,0.28),transparent_50%)]" />
            </motion.div>

            <motion.div
              className="absolute inset-x-0 bottom-[-20%] z-10 mx-auto h-[84%] w-[86%] overflow-hidden rounded-md shadow-2xl ring-1 ring-sky-400/0 transition-[box-shadow,ring-color] duration-300 group-hover:ring-sky-400/30 group-hover:shadow-[0_26px_50px_rgba(56,189,248,0.25)] dark:group-hover:ring-indigo-400/40 dark:group-hover:shadow-[0_26px_55px_rgba(99,102,241,0.35)]"
              initial={{ rotate: -4, y: 10 }}
              whileHover={{ rotate: -1, y: -2 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <Image
                src={project.banner}
                alt={`${project.name} preview`}
                fill
                sizes={cardImageSizes}
                className="object-cover object-top"
                priority={priority}
                placeholder={bannerBlur ? "blur" : "empty"}
                blurDataURL={bannerBlur}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <motion.h3
                layoutId={`project-title-${project.id}`}
                transition={springTransition}
                className="text-lg font-semibold tracking-tight"
              >
                {project.name}
              </motion.h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ArrowUpRight className="size-4" />
              </div>
            </div>
            <motion.p
              layoutId={`project-description-${project.id}`}
              transition={springTransition}
              className="line-clamp-3 text-sm leading-relaxed text-muted-foreground"
            >
              {project.description}
            </motion.p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </>
  )
}

