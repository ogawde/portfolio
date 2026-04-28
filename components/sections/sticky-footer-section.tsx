"use client"

import { getCalApi } from "@calcom/embed-react"
import { useEffect, useMemo } from "react"
import Link from "next/link"

export function StickyFooterSection() {
  const calNamespace = "footer-book-call"
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
    <section
      id="contact"
      className="sticky bottom-0 left-0 z-0 h-64 w-full border-t border-border/60 bg-background"
    >
      <div className="relative mx-auto flex h-full max-w-3xl items-start justify-between overflow-hidden px-6 py-7">
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>
            <Link
              href="https://github.com/ogawde"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              href="https://x.com/CurryCoder"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              X (Twitter)
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/omkar-g-b07942401/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </Link>
          </li>
          <li>
            <Link
              href="https://mail.google.com/mail/?view=cm&fs=1&to=currrycoder@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Email
            </Link>
          </li>
        </ul>

        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Available for work</p>
          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              data-cal-namespace={calNamespace}
              data-cal-link={calLink}
              data-cal-config={calConfig}
              className="inline-flex items-center rounded-full border border-border/70 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              Book a call
            </button>
            <Link
              href="https://x.com/messages/compose?recipient_id=1833116571738259456"
              target="_blank"
              rel="noreferrer"
              aria-label="Send a DM on X"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-3.5 fill-current"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.634 7.584H.478l8.6-9.83L0 1.153h7.594l5.243 6.932zm-1.29 19.493h2.04L6.486 3.24H4.298z" />
              </svg>
              DM on X
            </Link>
          </div>
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
