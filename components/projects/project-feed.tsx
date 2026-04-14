"use client"

import { ProjectCard } from "@/components/projects/project-card"
import { allProjects } from "@/lib/projects"

const listedProjects = allProjects.filter((p) => p.name.trim().length > 0)

export function ProjectFeed() {
  return (
    <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2">
      {listedProjects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          priority={index < 2}
        />
      ))}
    </div>
  )
}

