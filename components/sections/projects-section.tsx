"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ProjectCard } from "@/components/projects/project-card"
import { allProjects } from "@/lib/projects"

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion()
  const featuredProjects = allProjects
    .filter((project) => project.name.trim().length > 0)
    .filter((project) => project.featured)

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="mt-1 flex items-center gap-2">
            <h2 className="text-2xl font-semibold tracking-wide sm:text-5xl">
              Projects
            </h2>
            <div className="h-px w-full bg-border/70" />
          </div>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A focused set of polished builds with thoughtful interactions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              priority={index < 2}
            />
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <Link
            href="/projects"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            See all projects
          </Link>
        </div>
      </div>
    </section>
  )
}
