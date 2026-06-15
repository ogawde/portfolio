"use client"

import { SocialDock } from "@/components/social-dock"

export function StickyFooterSection() {
  return (
    <section
      id="contact"
      className="sticky bottom-0 left-0 z-0 h-64 w-full border-t border-border/60 bg-background"
    >
      <div className="relative mx-auto flex h-full max-w-3xl items-center justify-center overflow-hidden px-6 py-7">
        <div className="relative z-10">
          <SocialDock />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 translate-y-[22%] text-[clamp(3rem,12vw,6rem)] font-semibold uppercase leading-none tracking-tight text-foreground/22"
        >
          currycoder
        </div>
      </div>
    </section>
  )
}
