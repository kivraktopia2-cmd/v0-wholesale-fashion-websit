import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/storefront/hero-section"
import { StatsSection } from "@/components/storefront/stats-section"
import { FeaturedProducts } from "@/components/storefront/featured-products"
import { CategoriesSection } from "@/components/storefront/categories-section"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"

export default async function HomePage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("categories").select("*").order("display_order")

  const { data: featuredProducts } = await supabase
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
      product_images (*)
    `,
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(8)

  return (
    <div className="min-h-screen bg-white">
      <StorefrontHeader categories={categories || []} />
      <main>
        <HeroSection />
        <FeaturedProducts products={featuredProducts || []} />
        <StatsSection />
        <CategoriesSection categories={categories || []} />
      </main>
      <StorefrontFooter />
    </div>
  )
}
