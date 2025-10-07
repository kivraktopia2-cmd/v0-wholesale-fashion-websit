import Link from "next/link"
import Image from "next/image"

interface Product {
  id: string
  name_pl: string
  price_pln: number
  slug: string
  sizes_included: any
  subcategories?: {
    name_pl: string
    categories?: {
      name_pl: string
    }
  }
  product_colors?: Array<{
    color_name_pl: string
    color_hex: string
  }>
  product_images?: Array<{
    image_url: string
    display_order: number
  }>
}

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Wyróżnione Produkty</h2>
          <p className="text-xl text-gray-600">Odkryj nasze najpopularniejsze produkty hurtowe</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const firstImage = product.product_images?.sort((a, b) => a.display_order - b.display_order)[0]

            return (
              <Link key={product.id} href={`/produkt/${product.slug}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden">
                    {firstImage ? (
                      <Image
                        src={firstImage.image_url || "/placeholder.svg"}
                        alt={product.name_pl}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Brak zdjęcia</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1">{product.subcategories?.categories?.name_pl}</div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name_pl}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-[#8B1538]">{product.price_pln.toFixed(2)} PLN</span>
                    </div>
                    <div className="flex gap-1">
                      {product.product_colors?.slice(0, 5).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: color.color_hex }}
                          title={color.color_name_pl}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/produkty"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#8B1538] text-white font-semibold rounded-lg hover:bg-[#6d1029] transition-colors"
          >
            Zobacz Wszystkie Produkty
          </Link>
        </div>
      </div>
    </section>
  )
}
