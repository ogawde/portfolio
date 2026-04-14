import { ArrowLeft } from "lucide-react"
import { ProjectFeed } from "@/components/projects/project-feed"
import { SmoothLink } from "@/components/ui/smooth-link"

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-20 pt-16">
      <div className="mb-8">
        <SmoothLink
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </SmoothLink>
      </div>
      <div className="border-b border-border pb-8 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          All Projects
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Here are all projects and what has been shipped so far.
        </p>
      </div>
      <ProjectFeed />
    </main>
  )
}

