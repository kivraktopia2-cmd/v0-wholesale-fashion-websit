import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { ProductDetail } from "@/components/storefront/product-detail"

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("categories").select("*").order("display_order")

  const { data: product } = await supabase
    .from("products")
    .select(
      `
      *,
      subcategories (
        name_pl,
        categories (
          name_pl
        )
      ),
      product_colors (*),
      product_images (*, color_id)
    `,
    )
    .eq("slug", params.slug)
    .eq("is_active", true)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <StorefrontHeader categories={categories || []} />
      <main className="container mx-auto px-4 py-12">
        <ProductDetail product={product} />
      </main>
      <StorefrontFooter />
    </div>
  )
}
