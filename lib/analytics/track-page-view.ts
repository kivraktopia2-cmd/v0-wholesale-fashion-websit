"use server"

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

export async function trackPageView(pagePath: string, pageTitle?: string) {
  try {
    const supabase = await createClient()
    const headersList = await headers()

    const userAgent = headersList.get("user-agent") || ""
    const referrer = headersList.get("referer") || ""
    const forwardedFor = headersList.get("x-forwarded-for") || ""
    const realIp = headersList.get("x-real-ip") || ""

    // Get IP address (Cloudflare or direct)
    const ipAddress = forwardedFor.split(",")[0] || realIp || "unknown"

    // Parse user agent for device info
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent)
    const isTablet = /tablet|ipad/i.test(userAgent)
    const deviceType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop"

    // Parse browser
    let browser = "unknown"
    if (userAgent.includes("Chrome")) browser = "Chrome"
    else if (userAgent.includes("Firefox")) browser = "Firefox"
    else if (userAgent.includes("Safari")) browser = "Safari"
    else if (userAgent.includes("Edge")) browser = "Edge"

    // Parse OS
    let os = "unknown"
    if (userAgent.includes("Windows")) os = "Windows"
    else if (userAgent.includes("Mac")) os = "macOS"
    else if (userAgent.includes("Linux")) os = "Linux"
    else if (userAgent.includes("Android")) os = "Android"
    else if (userAgent.includes("iOS")) os = "iOS"

    // Generate session ID (simple version - could use cookies for better tracking)
    const sessionId = `${ipAddress}-${Date.now()}`

    await supabase.from("page_views").insert({
      page_path: pagePath,
      page_title: pageTitle,
      referrer,
      user_agent: userAgent,
      ip_address: ipAddress,
      device_type: deviceType,
      browser,
      os,
      session_id: sessionId,
    })
  } catch (error) {
    // Silently fail - don't break the page if analytics fails
    console.error("[v0] Analytics tracking error:", error)
  }
}
