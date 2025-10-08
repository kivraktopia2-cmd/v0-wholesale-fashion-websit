import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { path, title } = await request.json()
    const supabase = await createClient()

    const userAgent = request.headers.get("user-agent") || ""
    const referrer = request.headers.get("referer") || ""
    const forwardedFor = request.headers.get("x-forwarded-for") || ""
    const realIp = request.headers.get("x-real-ip") || ""
    const cfCountry = request.headers.get("cf-ipcountry") || ""
    const cfCity = request.headers.get("cf-ipcity") || ""

    // Get IP address
    const ipAddress = forwardedFor.split(",")[0] || realIp || "unknown"

    // Parse user agent
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent)
    const isTablet = /tablet|ipad/i.test(userAgent)
    const deviceType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop"

    let browser = "unknown"
    if (userAgent.includes("Chrome")) browser = "Chrome"
    else if (userAgent.includes("Firefox")) browser = "Firefox"
    else if (userAgent.includes("Safari")) browser = "Safari"
    else if (userAgent.includes("Edge")) browser = "Edge"

    let os = "unknown"
    if (userAgent.includes("Windows")) os = "Windows"
    else if (userAgent.includes("Mac")) os = "macOS"
    else if (userAgent.includes("Linux")) os = "Linux"
    else if (userAgent.includes("Android")) os = "Android"
    else if (userAgent.includes("iOS")) os = "iOS"

    const sessionId = `${ipAddress}-${Date.now()}`

    await supabase.from("page_views").insert({
      page_path: path,
      page_title: title,
      referrer,
      user_agent: userAgent,
      ip_address: ipAddress,
      country: cfCountry || null,
      city: cfCity || null,
      device_type: deviceType,
      browser,
      os,
      session_id: sessionId,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Analytics API error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
