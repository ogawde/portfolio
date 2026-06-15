"use client"

import { CursorifyProvider } from "@cursorify/react"
import { PhingerCursor } from "@cursorify/cursors"

export function CursorifyProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CursorifyProvider
      enabled
      cursor={<PhingerCursor />}
      defaultCursorVisible={false}
      breakpoint={997}
      delay={10}
    >
      {children}
    </CursorifyProvider>
  )
}
