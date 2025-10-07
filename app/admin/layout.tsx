import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Panel Administratora - DiRENBER",
  description: "Panel zarządzania hurtownią DiRENBER",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
