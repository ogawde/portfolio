"use client"

import { useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"

import {
  TypeScriptIcon,
  ReactIcon,
  NextJsIcon,
  BunIcon,
  PostgreSQLIcon,
  PrismaIcon,
  JavaScriptIcon,
  NodeJsIcon,
  ShadcnIcon,
  GsapIcon,
  FramerMotionIcon,
  DrizzleIcon,
  CursorIcon,
} from "@/components/tech-icons"
import { cn } from "@/lib/utils"

type Tech = {
  name: string
  Icon: React.ComponentType
}

function MarqueeRow({
  items,
  direction = "left",
  durationSeconds = 22,
}: {
  items: Tech[]
  direction?: "left" | "right"
  durationSeconds?: number
}) {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right"

  const content = (
    <div className="flex items-center gap-8 pr-8">
      {items.map(({ name, Icon }) => (
        <div
          key={name}
          className={cn(
            "flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-2",
            "backdrop-blur-sm text-sm text-muted-foreground",
            "opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          )}
        >
          <Icon />
          <span className="font-medium text-foreground/80">{name}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      )}
      style={
        {
          ["--marquee-duration" as never]: `${durationSeconds}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex w-max items-center will-change-transform",
          "hover:[animation-play-state:paused]",
          animationClass
        )}
      >
        {content}
        {content}
      </div>
    </div>
  )
}

export function TechStackSection() {
  const shouldReduceMotion = useReducedMotion()

  const allTech = useMemo<Tech[]>(
    () => [
      { name: "TypeScript", Icon: TypeScriptIcon },
      { name: "JavaScript", Icon: JavaScriptIcon },
      { name: "React", Icon: ReactIcon },
      { name: "Next.js", Icon: NextJsIcon },
      { name: "Bun", Icon: BunIcon },
      { name: "PostgreSQL", Icon: PostgreSQLIcon },
      { name: "Prisma", Icon: PrismaIcon },
      { name: "Drizzle", Icon: DrizzleIcon },
      { name: "Node.js", Icon: NodeJsIcon },
      { name: "shadcn/ui", Icon: ShadcnIcon },
      { name: "GSAP", Icon: GsapIcon },
      { name: "Framer Motion", Icon: FramerMotionIcon },
      { name: "Cursor", Icon: CursorIcon },
    ],
    []
  )

  const half = Math.ceil(allTech.length / 2)
  const row1 = allTech.slice(0, half)
  const row2 = allTech.slice(half)

  return (
    <section id="tech" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6"
        >
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            The arsenal for building digital experiences.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-5">
          <MarqueeRow items={row1} direction="left" durationSeconds={10} />
          <MarqueeRow items={row2} direction="right" durationSeconds={12} />
        </div>
      </div>
    </section>
  )
}

