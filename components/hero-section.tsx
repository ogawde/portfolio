"use client"

import Link from "next/link"
import Image from "next/image"
import { getCalApi } from "@calcom/embed-react"
import { Button } from "@/components/ui/button"
import {
  TypeScriptIcon,
  ReactIcon,
  NextJsIcon,
  BunIcon,
  PostgreSQLIcon,
  PrismaIcon,
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from "@/components/tech-icons"
import Typewriter from "@/components/fancy/text/typewriter"
import { FileText, MessageCircle } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useEffect, useMemo } from "react"

const skills = [
  { name: "Typescript", icon: TypeScriptIcon, href: "https://www.typescriptlang.org/" },
  { name: "React", icon: ReactIcon, href: "https://react.dev/" },
  { name: "Next.js", icon: NextJsIcon, href: "https://nextjs.org/" },
  { name: "Bun", icon: BunIcon, href: "https://bun.sh/" },
  { name: "PostgreSQL", icon: PostgreSQLIcon, href: "https://www.postgresql.org/" },
  { name: "Prisma", icon: PrismaIcon, href: "https://www.prisma.io/" },
]

const heroFlipWords = ["Full Stack Engineer", "Web Designer", "Backend Developer", "Frontend Developer", "Creative Developer",
  "Problem Solver", "Creative Developer", "UI/UX Designer"]

const socialLinks = [
  { name: "X", href: "https://x.com/CurryCoder", icon: XIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/omkar-g-b07942401/", icon: LinkedInIcon },
  { name: "Github", href: "https://github.com/ogawde", icon: GithubIcon },
  { name: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=currrycoder@gmail.com", icon: MailIcon },
]

function TechBadge({
  name,
  icon: Icon,
  href,
}: {
  name: string
  icon: React.ComponentType
  href: string
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-background/40 px-2.5 py-1 text-sm text-foreground/90 backdrop-blur transition-colors hover:bg-background/70"
    >
      <Icon />
      <span>{name}</span>
    </Link>
  )
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const calNamespace = "hero-book-call"
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? "your-username/30min"
  const calConfig = useMemo(
    () =>
      JSON.stringify({
        layout: "month_view",
        theme: "dark",
      }),
    []
  )

  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: calNamespace })
      cal("ui", {
        hideEventTypeDetails: false,
      })
    })()
  }, [])

  return (
    <section className="mx-auto max-w-3xl px-6 pt-10 pb-10">
      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1fr)_210px]">
        <div>
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            Available for work
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
            className="mb-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          >
            {"Hey, I’m Omkar Gawde"}
            <br />
            <span className="text-muted-foreground inline-flex items-center gap-2">
              <Typewriter
                as="span"
                text={heroFlipWords}
                speed={55}
                deleteSpeed={32}
                waitTime={1400}
                className="text-muted-foreground"
                cursorClassName="ml-0.5 inline-block min-w-[1ch] font-mono align-baseline text-muted-foreground"
              />
            </span>
          </motion.h1>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="mb-8 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-base leading-relaxed text-muted-foreground"
          >
            <span className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base text-pretty mb-2">
            Building products that don&apos;t look like they&apos;re from a tutorial. <br />
            Full-stack, product-minded, dangerously opinionated about UX
            </span>
            <TechBadge {...skills[0]} />
            <TechBadge {...skills[1]} />
            <TechBadge {...skills[2]} />
            <TechBadge {...skills[3]} />
            <TechBadge {...skills[4]} />
            <TechBadge {...skills[5]} />
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
            className="mb-10 flex flex-wrap gap-3"
          >
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/resume">
                <FileText className="size-4" />
                Resume / CV
              </Link>
            </Button>
            <Button
              className="gap-2"
              type="button"
              data-cal-namespace={calNamespace}
              data-cal-link={calLink}
              data-cal-config={calConfig}
            >
                <MessageCircle className="size-4" />
                Get in touch
            </Button>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
            className="flex items-center gap-1"
          >
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground"
                aria-label={link.name}
              >
                <link.icon />
              </Link>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="mx-auto mt-2 md:mx-0 md:justify-self-end"
        >
          <div className="relative size-40 overflow-hidden rounded-full md:size-44">
            <Image
              src="/pfp-avif.avif"
              alt="Profile photo"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 160px, 176px"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
