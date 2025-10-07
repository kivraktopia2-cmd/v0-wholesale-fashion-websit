"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error("Nie udało się pobrać danych użytkownika")

      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", authData.user.id)
        .eq("is_active", true)
        .single()

      if (adminError || !adminUser) {
        await supabase.auth.signOut()
        throw new Error("Brak uprawnień administratora lub konto nieaktywne")
      }

      window.location.href = "/admin/dashboard"
    } catch (error: unknown) {
      console.error("[v0] Login error:", error)
      setError(error instanceof Error ? error.message : "Wystąpił błąd podczas logowania")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6" style={{ backgroundColor: "#8B1538" }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/649706fd-96fd-4da2-aa86-4d85c8fb4fee-ZR0Pn1xPuqmI2elBiwUbNf3u9ijP2V.jpg"
              alt="DiRENBER Logo"
              width={200}
              height={80}
              className="object-contain"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Panel Administratora</CardTitle>
              <CardDescription>Zaloguj się do panelu zarządzania DiRENBER</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@direnber.pl"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Hasło</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <div className="text-sm text-red-500 p-3 bg-red-50 rounded">
                      <p className="font-semibold">Błąd:</p>
                      <p>{error}</p>
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading} style={{ backgroundColor: "#8B1538" }}>
                    {isLoading ? "Logowanie..." : "Zaloguj się"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
