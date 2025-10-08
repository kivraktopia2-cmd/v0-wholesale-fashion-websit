import { createClient } from "@/lib/supabase/server"

export default async function sitemap() {
  const baseUrl = "https://www.direnber.eu"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/produkty`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/polityka-cookies`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/reklamacje`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ]

  try {
    const supabase = await createClient()

    // Get all active products
    const { data: products } = await supabase.from("products").select("slug, updated_at").eq("is_active", true)

    // Get all categories
    const { data: categories } = await supabase.from("categories").select("slug, created_at")

    // Product pages
    const productPages =
      products?.map((product) => ({
        url: `${baseUrl}/produkt/${product.slug}`,
        lastModified: new Date(product.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })) || []

    // Category pages
    const categoryPages =
      categories?.map((category) => ({
        url: `${baseUrl}/kategoria/${category.slug}`,
        lastModified: new Date(category.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })) || []

    return [...staticPages, ...productPages, ...categoryPages]
  } catch (error) {
    console.error("[v0] Sitemap generation error:", error)
    // Return static pages if database connection fails
    return staticPages
  }
}
