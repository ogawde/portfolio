"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Copy, Github } from "lucide-react"
import { triggerHaptic } from "@/lib/utils"
import { useCalEmbed } from "@/hooks/use-cal-embed"

const EMAIL = "currrycoder@gmail.com"
const calNamespace = "footer-book-call"

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.309 17.41z" />
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const GmailIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.22 24 3.434 24 5.457z" />
  </svg>
)

const CalComIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M458 512H56c-30.4 0-55-24.6-55-55V55C1 24.6 25.6 0 56 0h402c30.4 0 55 24.6 55 55v402c0 30.4-24.6 55-55 55"
      fill="#292929"
    />
    <path
      d="M162.8 347.3c-50.4 0-88.4-39.9-88.4-89.3s35.9-89.6 88.4-89.6c27.9 0 47 8.6 62.1 28l-24.3 20.1c-10.1-10.8-22.5-16.2-37.8-16.2-34.1 0-52.8 26.1-52.8 57.6s20.5 57.1 52.8 57.1c15.1 0 28-5.3 38.4-16.2l23.9 21c-14.5 18.9-34.3 27.5-62.3 27.5m166.4-131.2h32.7v128.1h-32.7v-18.7c-6.7 13.2-18.1 22.2-39.7 22.2-34.6 0-62.3-30.1-62.3-66.9 0-37 27.7-66.9 62.3-66.9 21.5 0 33 8.9 39.7 22.2zm1.1 64.5c0-20-13.8-36.6-35.4-36.6-20.8 0-34.4 16.7-34.4 36.6 0 19.4 13.6 36.6 34.4 36.6 21.4 0 35.4-16.7 35.4-36.6M385 164.3h32.7v179.6H385z"
      fill="#fff"
    />
  </svg>
)

type DockItem = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href?: string
  isCal?: boolean
}

const dockItems: DockItem[] = [
  {
    icon: XIcon,
    label: "Twitter",
    href: "https://x.com/CurryCoder",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/omkar-g-b07942401/",
  },
  {
    icon: GmailIcon,
    label: "Email",
    href: `mailto:${EMAIL}`,
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/ogawde",
  },
  {
    icon: CalComIcon,
    label: "Book a call",
    isCal: true,
  },
]

export function SocialDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? "your-username/30min"
  const { calConfig } = useCalEmbed(calNamespace)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    triggerHaptic(15)
    setTimeout(() => setCopied(false), 2000)
  }

  const getWidth = (index: number) => {
    const baseWidth = 56
    if (hoveredIndex === null) return baseWidth
    const distance = Math.abs(hoveredIndex - index)
    if (distance === 0) return 68
    if (distance === 1) return 60
    return baseWidth
  }

  const dockTileClassName =
    "flex h-full w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-100 shadow-sm transition-all hover:border-gray-300 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"

  return (
    <div className="flex h-[70px] items-end justify-center pb-2">
      <ul className="m-0 flex list-none items-end gap-2 p-0">
        {dockItems.map((item, index) => (
          <li
            key={item.label}
            className="relative flex items-end justify-center transition-all duration-300"
            style={{ width: `${getWidth(index)}px` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => triggerHaptic(10)}
          >
            <div className="relative w-14 shrink-0">
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="pointer-events-auto absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 cursor-pointer whitespace-nowrap rounded-md bg-black px-3 py-1.5 text-[10px] font-medium text-white shadow-lg md:block dark:bg-white dark:text-black"
                    onClick={(e) => {
                      if (item.label === "Email") {
                        handleCopy(e)
                      }
                    }}
                  >
                    {item.label === "Email" ? (
                      <div className="group/tooltip flex items-center gap-2">
                        <span>{EMAIL}</span>
                        <div className="rounded-md bg-white/10 p-1 transition-colors hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20">
                          {copied ? (
                            <Check className="h-3 w-3 text-green-400 dark:text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400 transition-colors group-hover/tooltip:text-white dark:group-hover/tooltip:text-black" />
                          )}
                        </div>
                      </div>
                    ) : (
                      item.label
                    )}
                    <div className="absolute top-full left-1/2 -mt-px -translate-x-1/2 border-4 border-transparent border-t-black dark:border-t-white" />
                    <div className="absolute top-full left-0 h-4 w-full bg-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>
              {item.isCal ? (
                <button
                  type="button"
                  data-cal-namespace={calNamespace}
                  data-cal-link={calLink}
                  data-cal-config={calConfig}
                  aria-label="Book a call"
                  className="flex aspect-square w-full items-center justify-center p-1"
                >
                  <div className={dockTileClassName}>
                    <item.icon className="h-1/2 w-1/2" />
                  </div>
                </button>
              ) : (
                <a
                  href={item.href}
                  target={item.label === "Email" ? undefined : "_blank"}
                  rel={
                    item.label === "Email" ? undefined : "noopener noreferrer"
                  }
                  className="flex aspect-square w-full items-center justify-center p-1"
                >
                  <div className={dockTileClassName}>
                    <item.icon className="h-1/2 w-1/2 text-gray-700 dark:text-gray-200" />
                  </div>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
