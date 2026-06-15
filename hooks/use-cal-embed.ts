"use client"

import { useEffect, useMemo } from "react"
import { getCalApi } from "@calcom/embed-react"
import { useTheme } from "next-themes"

function resetCalModals() {
  document.querySelectorAll("cal-modal-box").forEach((box) => {
    box.setAttribute("state", "closed")
    box.remove()
  })
  document.body.style.overflow = ""
}

export function useCalEmbed(namespace: string) {
  const { resolvedTheme } = useTheme()
  const calTheme = resolvedTheme === "light" ? "light" : "dark"

  const calConfig = useMemo(
    () =>
      JSON.stringify({
        layout: "month_view",
        theme: calTheme,
        "ui.color-scheme": calTheme,
      }),
    [calTheme]
  )

  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace })
      cal("ui", {
        hideEventTypeDetails: false,
      })
    })()
  }, [namespace])

  useEffect(() => {
    resetCalModals()
  }, [calTheme])

  return { calConfig }
}
