"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { LogOut, Package, Settings, Home, Users, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface AdminHeaderProps {
  user: {
    email: string
    full_name?: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <header className="border-b bg-white shadow-sm" style={{ borderBottomColor: "#8B1538" }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/649706fd-96fd-4da2-aa86-4d85c8fb4fee-ZR0Pn1xPuqmI2elBiwUbNf3u9ijP2V.jpg"
                alt="DiRENBER"
                width={120}
                height={48}
                className="object-contain"
              />
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" className="gap-2">
                  <Package className="h-4 w-4" />
                  Produkty
                </Button>
              </Link>
              <Link href="/admin/categories">
                <Button variant="ghost" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Kategorie
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="ghost" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analityka
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant="ghost" className="gap-2">
                  <Users className="h-4 w-4" />
                  Administratorzy
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="gap-2">
                  <Home className="h-4 w-4" />
                  Strona Główna
                </Button>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <p className="font-medium">{user.full_name || user.email}</p>
              <p className="text-xs">Administrator</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Wyloguj
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
