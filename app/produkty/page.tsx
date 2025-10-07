import { createClient } from "@/lib/supabase/server"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { ProductsGrid } from "@/components/storefront/products-grid"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const supabase = await createClient()
  const searchQuery = searchParams.search || ""

  // Fetch categories for header
  const { data: categories } = await supabase.from("categories").select("*").order("display_order")

  let query = supabase
    .from("products")
    .select(
      `
      *,
      subcategories (
        id,
        name_pl,
        category_id,
        categories (
          id,
          name_pl
        )
      ),
      product_colors (*),
      product_images (*)
    `,
    )
    .eq("is_active", true)

  if (searchQuery) {
    query = query.or(`name_pl.ilike.%${searchQuery}%,product_id.ilike.%${searchQuery}%`)
  }

  const { data: products } = await query.order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-white">
      <StorefrontHeader categories={categories || []} />
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">
          {searchQuery ? `Wyniki wyszukiwania: "${searchQuery}"` : "Wszystkie Produkty"}
        </h1>
        {products && products.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Nie znaleziono produktów dla "{searchQuery}"</p>
            <p className="text-sm text-gray-500 mt-2">Spróbuj użyć innych słów kluczowych</p>
          </div>
        )}
        <ProductsGrid products={products || []} />
      </main>
      <StorefrontFooter />
    </div>
  )
}
