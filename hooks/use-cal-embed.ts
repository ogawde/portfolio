"use client"

import { useEffect, useMemo } from "react"
import { getCalApi } from "@calcom/embed-react"
import { useTheme } from "next-themes"

export function useCalEmbed(namespace: string) {
  const { resolvedTheme } = useTheme()
  const calTheme = resolvedTheme === "light" ? "light" : "dark"

  const calConfig = useMemo(
    () =>
      JSON.stringify({
        layout: "month_view",
        theme: calTheme,
      }),
    [calTheme]
  )

  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace })
      cal("ui", {
        hideEventTypeDetails: false,
        theme: calTheme,
      })
    })()
  }, [namespace, calTheme])

  return { calConfig, calTheme }
}
