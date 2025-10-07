import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProductsTable } from "@/components/admin/products-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function AdminDashboardPage() {
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

  const { data: products } = await supabase
    .from("products")
    .select(
      `
      *,
      subcategories (
        id,
        name_pl,
        categories (
          id,
          name_pl
        )
      ),
      product_colors (
        id,
        color_name_pl,
        color_hex,
        stock_quantity
      ),
      product_images (
        id,
        image_url,
        display_order
      )
    `,
    )
    .order("created_at", { ascending: false })

  const { data: categories } = await supabase.from("categories").select("*").order("display_order")

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={adminUser} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Zarządzanie Produktami</h1>
            <p className="text-gray-600 mt-2">Dodawaj, edytuj i usuwaj produkty w hurtowni DiRENBER</p>
          </div>
          <Link href="/admin/products/new">
            <Button style={{ backgroundColor: "#8B1538" }} className="gap-2">
              <Plus className="h-4 w-4" />
              Dodaj Produkt
            </Button>
          </Link>
        </div>

        <ProductsTable products={products || []} categories={categories || []} />
      </main>
    </div>
  )
}
