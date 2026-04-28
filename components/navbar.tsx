"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { AnimatedNavTabs } from "@/components/forgeui/animated-tabs"
import { Kbd } from "@/components/ui/kbd"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home")
  const pendingSectionRef = useRef<string | null>(null)

  const handleNavTabClick = useCallback((id: string) => {
    pendingSectionRef.current = id
    setActiveSection(id)

    if (typeof window === "undefined") return

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    if (id === "contact") {
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      }
      return
    }

    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  useEffect(() => {
    const ids = navItems
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean)

    const syncActiveSection = () => {
      const lastId = ids[ids.length - 1] ?? "home"
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

      let current: string
      if (atBottom) {
        current = lastId
      } else {
        const marker = window.scrollY + 140
        current = ids[0] ?? "home"
        for (const id of ids) {
          const el = document.getElementById(id)
          if (!el) continue
          if (el.offsetTop <= marker) current = id
        }
      }

      const pending = pendingSectionRef.current
      if (pending !== null) {
        if (current === pending) {
          pendingSectionRef.current = null
          setActiveSection(current)
          return
        }
        if (atBottom && current !== pending) {
          pendingSectionRef.current = null
          setActiveSection(current)
          return
        }
        setActiveSection(pending)
        return
      }

      setActiveSection(current)
    }

    const clearPendingOnUserScroll = () => {
      pendingSectionRef.current = null
    }

    syncActiveSection()
    window.addEventListener("scroll", syncActiveSection, { passive: true })
    window.addEventListener("wheel", clearPendingOnUserScroll, { passive: true })
    window.addEventListener("touchstart", clearPendingOnUserScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", syncActiveSection)
      window.removeEventListener("wheel", clearPendingOnUserScroll)
      window.removeEventListener("touchstart", clearPendingOnUserScroll)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between rounded-2xl border border-border/60 bg-background/55 px-6 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-6">
          <Link href="#home" className="flex items-center">
            <div className="relative size-9 overflow-hidden rounded-lg border border-border/70 bg-background/40">
              <Image
                src="/pfp-avif.avif"
                alt="Profile photo"
                fill
                className="object-cover object-center"
                sizes="36px"
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center sm:flex" aria-label="Page sections">
            <AnimatedNavTabs
              items={navItems.map((item) => ({
                id: item.href.replace("#", ""),
                label: item.label,
                href: item.href,
              }))}
              activeId={activeSection}
              onTabClick={handleNavTabClick}
              layoutId="navbar-section-tab"
            />
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="hidden sm:flex h-8 items-center gap-2 rounded-lg border border-border bg-background/40 px-3 text-sm text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground"
            aria-label="Search"
          >
            <Search className="size-3.5" />
            <span className="hidden md:inline">Search</span>
            <Kbd className="ml-1 hidden md:inline-flex">{"Ctrl K"}</Kbd>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
