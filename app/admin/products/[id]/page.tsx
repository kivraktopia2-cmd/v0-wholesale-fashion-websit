import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProductForm } from "@/components/admin/product-form"

export default async function EditProductPage({ params }: { params: { id: string } }) {
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

  const { data: product } = await supabase
    .from("products")
    .select(
      `
      *,
      product_colors (*),
      product_images (*)
    `,
    )
    .eq("id", params.id)
    .single()

  if (!product) {
    redirect("/admin/dashboard")
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
          <h1 className="text-3xl font-bold text-gray-900">Edytuj Produkt</h1>
          <p className="text-gray-600 mt-2">Zaktualizuj informacje o produkcie</p>
        </div>

        <ProductForm categories={categories || []} product={product} />
      </main>
    </div>
  )
}
