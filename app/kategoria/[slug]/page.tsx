import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { ProductsGrid } from "@/components/storefront/products-grid"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient()

  const { data: category } = await supabase.from("categories").select("*").eq("slug", params.slug).single()

  if (!category) {
    return {
      title: "Kategoria nie znaleziona | DiRENBER",
    }
  }

  return {
    title: `${category.name_pl} Hurt | DiRENBER Hurtownia Odzieży Damskiej`,
    description: `${category.name_pl} - sprzedaż hurtowa odzieży damskiej. Szeroki wybór produktów w kategorii ${category.name_pl}. Minimum zamówienie 300 PLN. Dostawa 2-3 dni. DiRENBER - profesjonalna hurtownia odzieży.`,
    keywords: [
      "direnber",
      "DiRENBER",
      category.name_pl,
      `${category.name_pl} hurt`,
      "hurtownia odzieży damskiej",
      "odzież damska hurt",
      "sprzedaż hurtowa",
      "tanie ubrania hurt",
      "odzież hurt Polska",
    ],
    openGraph: {
      title: `${category.name_pl} Hurt | DiRENBER`,
      description: `${category.name_pl} - sprzedaż hurtowa odzieży damskiej w Polsce`,
      url: `https://direnber.eu/kategoria/${params.slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://direnber.eu/kategoria/${params.slug}`,
    },
  }
}

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
