import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.direnber.eu"

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/produkty`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/polityka-cookies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/reklamacje`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  try {
    const supabase = await createClient()

    // Get all active products
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("slug, updated_at")
      .eq("is_active", true)

    // Get all categories
    const { data: categories, error: categoriesError } = await supabase.from("categories").select("slug, created_at")

    if (productsError) {
      console.error("[v0] Sitemap products error:", productsError)
    }
    if (categoriesError) {
      console.error("[v0] Sitemap categories error:", categoriesError)
    }

    // Product pages
    const productPages: MetadataRoute.Sitemap =
      products?.map((product) => ({
        url: `${baseUrl}/produkt/${product.slug}`,
        lastModified: new Date(product.updated_at),
        changeFrequency: "weekly",
        priority: 0.8,
      })) || []

    // Category pages
    const categoryPages: MetadataRoute.Sitemap =
      categories?.map((category) => ({
        url: `${baseUrl}/kategoria/${category.slug}`,
        lastModified: new Date(category.created_at),
        changeFrequency: "weekly",
        priority: 0.8,
      })) || []

    return [...staticPages, ...productPages, ...categoryPages]
  } catch (error) {
    console.error("[v0] Sitemap generation error:", error)
    // Return static pages if database connection fails
    return staticPages
  }
}
