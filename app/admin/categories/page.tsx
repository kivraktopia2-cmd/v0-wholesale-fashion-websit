import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { CategoriesManager } from "@/components/admin/categories-manager"

export default async function CategoriesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .eq("is_active", true)
    .single()

  if (!adminUser) {
    redirect("/admin/login")
  }

  const { data: categories } = await supabase
    .from("categories")
    .select(
      `
      *,
      subcategories (*)
    `,
    )
    .order("display_order")

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={adminUser} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Zarządzanie Kategoriami</h1>
          <p className="text-gray-600 mt-2">Dodawaj i edytuj kategorie oraz podkategorie</p>
        </div>

        <CategoriesManager categories={categories || []} />
      </main>
    </div>
  )
}
