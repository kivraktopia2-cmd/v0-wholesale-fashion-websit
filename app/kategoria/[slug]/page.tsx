import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { ProductsGrid } from "@/components/storefront/products-grid"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("categories").select("*").order("display_order")

  const { data: category } = await supabase.from("categories").select("*").eq("slug", params.slug).single()

  if (!category) {
    notFound()
  }

  const { data: products } = await supabase
    .from("products")
    .select(
      `
      *,
      subcategories!inner (
        name_pl,
        category_id,
        categories (
          name_pl
        )
      ),
      product_colors (*),
      product_images (*)
    `,
    )
    .eq("subcategories.category_id", category.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-white">
      <StorefrontHeader categories={categories || []} />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name_pl}</h1>
        <p className="text-xl text-gray-600 mb-8">Przeglądaj produkty z tej kolekcji</p>
        <ProductsGrid products={products || []} />
      </main>
      <StorefrontFooter />
    </div>
  )
}
