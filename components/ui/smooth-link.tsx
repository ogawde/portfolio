"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { startTransition } from "react"

type SmoothLinkProps = {
  href: string
  className?: string
  children: React.ReactNode
  ariaLabel?: string
}

export function SmoothLink({ href, className, children, ariaLabel }: SmoothLinkProps) {
  const router = useRouter()

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const run = () => startTransition(() => router.push(href))
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void
    }
    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(() => run())
      return
    }
    run()
  }

  return (
    <Link href={href} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}

