"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view on client side
    const trackView = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: pathname,
            title: document.title,
          }),
        })
      } catch (error) {
        console.error("[v0] Failed to track page view:", error)
      }
    }

    trackView()
  }, [pathname])

  return null
}
