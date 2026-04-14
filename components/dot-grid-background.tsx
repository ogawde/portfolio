"use client"

import { useCallback, useRef, useState } from "react"

export function DotGridBackground({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={[
        "relative min-h-screen w-full overflow-x-hidden bg-background",
        "[--dot-base:rgba(0,0,0,0.10)] [--dot-hover:rgba(0,0,0,0.24)] [--dot-glow:rgba(0,0,0,0.03)]",
        "dark:[--dot-base:rgba(255,255,255,0.15)] dark:[--dot-hover:rgba(122,118,118,0.80)] dark:[--dot-glow:rgba(255,255,255,0.03)]",
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--dot-base) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--dot-hover) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: isHovering
            ? `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
            : `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 100%)`,
          WebkitMaskImage: isHovering
            ? `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
            : `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 100%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: isHovering
            ? `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, var(--dot-glow) 0%, transparent 100%)`
            : "transparent",
          opacity: isHovering ? 1 : 0,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  )
}
