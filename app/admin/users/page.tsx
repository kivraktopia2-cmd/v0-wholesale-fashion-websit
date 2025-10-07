"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AdminUser {
  id: string
  email: string
  full_name: string | null
  is_active: boolean
  created_at: string
}

export default function AdminUsersPage() {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    loadAdminUsers()
  }, [])

  const loadAdminUsers = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.from("admin_users").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setAdminUsers(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Błąd ładowania użytkowników")
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("admin_users").update({ is_active: !currentStatus }).eq("id", userId)

      if (error) throw error

      setSuccess("Status administratora został zaktualizowany")
      loadAdminUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Błąd aktualizacji statusu")
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Zarządzanie Administratorami</h1>
        <p className="text-gray-600">Zarządzaj użytkownikami panelu administracyjnego</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-900 border-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dodawanie Nowych Administratorów</CardTitle>
            <CardDescription>
              Aby dodać nowego administratora, wykonaj poniższy skrypt SQL w panelu Supabase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`-- 1. Utwórz użytkownika w Supabase Auth
-- (wykonaj w panelu Supabase -> Authentication -> Users -> Add User)

-- 2. Dodaj użytkownika do tabeli admin_users
INSERT INTO admin_users (id, email, full_name, is_active)
VALUES (
  'USER_ID_FROM_AUTH',
  'admin@example.com',
  'Imię Nazwisko',
  true
);`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lista Administratorów</CardTitle>
            <CardDescription>Wszyscy użytkownicy z dostępem do panelu administracyjnego</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center text-gray-500">Ładowanie...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Imię i Nazwisko</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Utworzenia</TableHead>
                    <TableHead>Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>{user.full_name || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={user.is_active ? "default" : "secondary"}>
                          {user.is_active ? "Aktywny" : "Nieaktywny"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString("pl-PL")}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleToggleActive(user.id, user.is_active)}>
                          {user.is_active ? "Dezaktywuj" : "Aktywuj"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
