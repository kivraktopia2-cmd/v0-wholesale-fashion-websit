import Link from "next/link"

interface Category {
  id: string
  name_pl: string
  slug: string
}

interface CategoriesSectionProps {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const getCategoryImage = (slug: string) => {
    const imageMap: Record<string, string> = {
      zimowa: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-k1ALdInVi8COhGlLhBvl3IiAnTLtIg.png", // Trench coat - winter collection
      letnia: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-MHcNbu34y0B4O6kYu3ZHc4J7krdzwB.png", // Beanie & sunglasses - summer collection
      sezonowa: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-aXD3JX3UFjRCK7LoU7aiR9onXhmwBn.png", // Beige outfit - seasonal collection
    }

    return (
      imageMap[slug] || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-aXD3JX3UFjRCK7LoU7aiR9onXhmwBn.png"
    )
  }

  console.log(
    "[v0] Categories received:",
    categories.map((c) => ({ name: c.name_pl, slug: c.slug })),
  )

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Nasze Kolekcje</h2>
          <p className="text-xl text-muted-foreground">Przeglądaj według sezonu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/kategoria/${category.slug}`} className="group">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
                {/* Background Image with Zoom Effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${getCategoryImage(category.slug)}')`,
                  }}
                />

                {/* Gradient Overlay - Bottom 50% */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Collection Title - Centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white text-center px-4 drop-shadow-lg">
                    {category.name_pl}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
