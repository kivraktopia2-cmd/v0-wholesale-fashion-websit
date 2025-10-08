import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { ProductDetail } from "@/components/storefront/product-detail"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient()

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
      product_images (*)
    `,
    )
    .eq("slug", params.slug)
    .eq("is_active", true)
    .single()

  if (!product) {
    return {
      title: "Produkt nie znaleziony | DiRENBER",
    }
  }

  const firstImage = product.product_images?.[0]?.image_url
  const colors = product.product_colors?.map((c: any) => c.color_name_pl).join(", ") || ""
  const category = product.subcategories?.categories?.name_pl || ""

  return {
    title: `${product.name_pl} Hurt | DiRENBER Hurtownia Odzieży Damskiej`,
    description: `${product.description_pl || product.name_pl} - Sprzedaż hurtowa. Dostępne kolory: ${colors}. Cena hurtowa: ${product.price_pln} PLN. ${category} hurt. Minimum zamówienie 300 PLN. Dostawa 2-3 dni. DiRENBER - profesjonalna hurtownia odzieży damskiej.`,
    keywords: [
      "direnber",
      "DiRENBER",
      product.name_pl,
      `${product.name_pl} hurt`,
      "hurtownia odzieży",
      "odzież damska hurt",
      category,
      `${category} hurt`,
      "sprzedaż hurtowa",
      "tanie ubrania hurt",
      ...colors.split(", "),
    ],
    openGraph: {
      title: `${product.name_pl} Hurt | DiRENBER`,
      description: `${product.description_pl || product.name_pl} - Sprzedaż hurtowa odzieży damskiej. Cena: ${product.price_pln} PLN`,
      images: firstImage
        ? [{ url: firstImage, width: 800, height: 1200, alt: `${product.name_pl} - DiRENBER hurtownia odzieży` }]
        : [],
      type: "website",
      url: `https://direnber.eu/produkt/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name_pl} Hurt | DiRENBER`,
      description: `${product.description_pl || product.name_pl} - Hurtownia odzieży damskiej`,
      images: firstImage ? [firstImage] : [],
    },
    alternates: {
      canonical: `https://direnber.eu/produkt/${params.slug}`,
    },
  }
}

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

  const firstColor = product.product_colors?.[0]
  const firstImage = product.product_images?.[0]?.image_url
  const availableColors = product.product_colors?.map((c: any) => c.color_name_pl) || []

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name_pl,
    description: product.description_pl || product.name_pl,
    image: firstImage || "",
    brand: {
      "@type": "Brand",
      name: "DiRENBER",
    },
    offers: {
      "@type": "Offer",
      price: product.price_pln,
      priceCurrency: "PLN",
      availability: firstColor?.stock_quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "DIRENBER Sp. z o.o.",
      },
    },
    color: availableColors,
    category: product.subcategories?.categories?.name_pl || "",
  }

  return (
    <div className="min-h-screen bg-white">
      <StorefrontHeader categories={categories || []} />
      <main className="container mx-auto px-4 py-12">
        <ProductDetail product={product} />
      </main>
      <StorefrontFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
    </div>
  )
}
