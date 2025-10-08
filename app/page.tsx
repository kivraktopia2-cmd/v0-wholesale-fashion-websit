import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/storefront/hero-section"
import { StatsSection } from "@/components/storefront/stats-section"
import { FeaturedProducts } from "@/components/storefront/featured-products"
import { CategoriesSection } from "@/components/storefront/categories-section"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DiRENBER - Hurtownia Odzieży Damskiej | Sprzedaż Hurtowa Odzieży",
  description:
    "DiRENBER - profesjonalna hurtownia odzieży damskiej. Wysokiej jakości sukienki, bluzki, spodnie w asortymentach hurtowych. Minimum zamówienie 300 PLN. Dostawa 2-3 dni robocze.",
  keywords: [
    "hurtownia odzieży damskiej",
    "odzież damska hurt",
    "sukienki hurt",
    "bluzki hurt",
    "sprzedaż hurtowa odzieży",
    "DiRENBER",
  ],
  openGraph: {
    title: "DiRENBER - Hurtownia Odzieży Damskiej",
    description: "Wysokiej jakości odzież damska w asortymentach hurtowych. Minimum zamówienie 300 PLN.",
    url: "https://direnber.eu",
    siteName: "DiRENBER",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DiRENBER - Hurtownia Odzieży Damskiej",
    description: "Wysokiej jakości odzież damska w asortymentach hurtowych",
  },
  alternates: {
    canonical: "https://direnber.eu",
  },
}

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "DiRENBER",
            legalName: "DIRENBER Sp. z o.o.",
            url: "https://direnber.eu",
            logo: "https://direnber.eu/logo.png",
            description: "Profesjonalna hurtownia odzieży damskiej",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Przybyszów 52",
              addressLocality: "Sława",
              postalCode: "67-410",
              addressCountry: "PL",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+48 792 055 503",
              contactType: "customer service",
              email: "direnber@wp.pl",
              availableLanguage: ["Polish"],
            },
          }),
        }}
      />
    </div>
  )
}
