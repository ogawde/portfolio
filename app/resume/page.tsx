import type { Metadata } from "next"
import { DotGridBackground } from "@/components/dot-grid-background"
import { resumeConfig } from "@/lib/resume"
import { ArrowLeft } from "lucide-react"
import { SmoothLink } from "@/components/ui/smooth-link"

export const metadata: Metadata = {
  title: "Resume | Portfolio",
  description: "View my resume and CV",
}

export default function ResumePage() {
  const hasResumeUrl = Boolean(resumeConfig.previewUrl)

  return (
    <DotGridBackground>
      <main className="relative min-h-screen px-6 pt-10 pb-12">
        <div className="mx-auto w-full max-w-4xl rounded-xl border border-border/60 bg-background/75 p-4 backdrop-blur sm:p-6">
          <SmoothLink
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back
          </SmoothLink>

          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Resume</h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              View my latest resume here.
            </p>
          </div>

          {hasResumeUrl ? (
            <iframe
              src={resumeConfig.previewUrl}
              title="Resume preview"
              className="min-h-[80vh] w-full rounded-md border border-border/60 bg-background"
            />
          ) : (
            <div className="rounded-md border border-dashed border-border/70 bg-background/60 p-5 text-sm text-muted-foreground">
              Resume preview URL is not set yet.
            </div>
          )}
        </div>
      </main>
    </DotGridBackground>
  )
}
