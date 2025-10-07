import { createClient } from "@/lib/supabase/server"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { ShoppingCartContent } from "@/components/storefront/shopping-cart-content"

export default async function CartPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("categories").select("*").order("display_order")

  return (
    <div className="min-h-screen bg-gray-50">
      <StorefrontHeader categories={categories || []} />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Koszyk</h1>
        <ShoppingCartContent />
      </main>
      <StorefrontFooter />
    </div>
  )
}
