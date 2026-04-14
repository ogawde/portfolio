import { DotGridBackground } from "@/components/dot-grid-background"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TechStackSection } from "@/components/sections/tech-stack-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ArticlesSection } from "@/components/sections/articles-section"
import { StickyFooterSection } from "@/components/sections/sticky-footer-section"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { getAllArticlesMeta } from "@/lib/articles"

export default async function Home() {
  const articles = await getAllArticlesMeta()

  return (
    <DotGridBackground>
      <Navbar />
      <main className="relative min-h-[calc(100vh-4rem)] pt-16">
        <div className="relative z-10 bg-background/70 ">
          <TracingBeam className="max-w-3xl px-0">
            <section id="home" className="scroll-mt-24">
              <HeroSection />
            </section>
            <TechStackSection />
            <ProjectsSection />
            <ArticlesSection articles={articles} />
          </TracingBeam>
        </div>
        <StickyFooterSection />
      </main>
    </DotGridBackground>
  )
}
