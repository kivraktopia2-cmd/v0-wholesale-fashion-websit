"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Shield,
  Truck,
  Plus,
  Minus,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  product_id: string
  name_pl: string
  description_pl: string
  price_pln: number
  sizes_included: string[] | Array<{ size: string; quantity: number }> | string
  subcategories?: {
    name_pl: string
    categories?: {
      name_pl: string
    }
  }
  product_colors?: Array<{
    id: string
    color_name_pl: string
    color_hex: string
    stock_quantity: number
  }>
  product_images?: Array<{
    image_url: string
    display_order: number
    color_id: string | null
  }>
}

interface ProductDetailProps {
  product: Product
}

const VAT_RATE = 0.23

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string | null>(product.product_colors?.[0]?.id || null)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [colorError, setColorError] = useState(false)
  const [stockError, setStockError] = useState<string | null>(null)
  const router = useRouter()

  const allImages = product.product_images?.sort((a, b) => a.display_order - b.display_order) || []
  const sortedImages = selectedColor
    ? allImages.filter((img) => img.color_id === selectedColor)
    : allImages.filter((img) => !img.color_id)

  useEffect(() => {
    setSelectedImage(0)
    setQuantity(1) // Reset quantity when color changes
  }, [selectedColor])

  const formatSizeDisplay = (sizes: string[] | Array<{ size: string; quantity: number }> | string) => {
    if (!sizes) return []

    let sizesData = sizes

    if (typeof sizesData === "string") {
      try {
        sizesData = JSON.parse(sizesData)
      } catch (e) {
        console.error("[v0] Failed to parse sizes:", e)
        return []
      }
    }

    if (Array.isArray(sizesData) && sizesData.length > 0) {
      const firstItem = sizesData[0]

      if (typeof firstItem === "object" && firstItem !== null && "size" in firstItem && "quantity" in firstItem) {
        return (sizesData as Array<{ size: string; quantity: number }>).map((item) => ({
          display: item.quantity > 1 ? `${item.quantity}× ${item.size}` : item.size,
          size: item.size,
          quantity: item.quantity,
        }))
      }

      if (typeof firstItem === "string") {
        return (sizesData as string[]).map((size) => ({
          display: size,
          size: size,
          quantity: 1,
        }))
      }
    }

    return []
  }

  const formattedSizes = formatSizeDisplay(product.sizes_included)
  const totalPiecesInPackage = formattedSizes.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddToCart = () => {
    if (!selectedColor) {
      setColorError(true)
      return
    }

    const selectedColorData = product.product_colors?.find((c) => c.id === selectedColor)
    if (!selectedColorData) return

    const cart = JSON.parse(localStorage.getItem("direnber_cart") || "[]")
    const existingItem = cart.find((item: any) => item.productId === product.id && item.colorId === selectedColor)
    const currentQuantityInCart = existingItem ? existingItem.quantity || 1 : 0

    if (currentQuantityInCart + quantity > selectedColorData.stock_quantity) {
      setStockError(
        `Nie można dodać więcej. Dostępny stan: ${selectedColorData.stock_quantity} szt. (${currentQuantityInCart} już w koszyku)`,
      )
      return
    }

    setIsAdding(true)
    setStockError(null)

    const colorImage = sortedImages[0]?.image_url || allImages[0]?.image_url

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + quantity
    } else {
      cart.push({
        productId: product.id,
        colorId: selectedColor,
        name: product.name_pl,
        price: product.price_pln,
        image: colorImage,
        color: selectedColorData.color_name_pl,
        sizes: product.sizes_included,
        quantity: quantity,
        stockQuantity: selectedColorData.stock_quantity,
        piecesPerPackage: totalPiecesInPackage,
      })
    }

    localStorage.setItem("direnber_cart", JSON.stringify(cart))

    setTimeout(() => {
      setIsAdding(false)
      router.push("/koszyk")
    }, 500)
  }

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId)
    setColorError(false)
    setStockError(null)
    setQuantity(1) // Reset quantity when color changes
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? sortedImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === sortedImages.length - 1 ? 0 : prev + 1))
  }

  const netPrice = product.price_pln
  const vatAmount = netPrice * VAT_RATE
  const grossPrice = netPrice + vatAmount

  const selectedColorData = product.product_colors?.find((c) => c.id === selectedColor)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <span>{product.subcategories?.categories?.name_pl}</span>
        <span>›</span>
        <span>{product.subcategories?.name_pl}</span>
        <span>›</span>
        <span className="text-gray-900">{product.name_pl}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_5fr] gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="relative bg-white rounded-lg overflow-hidden group">
            {sortedImages.length > 0 ? (
              <>
                <div className="relative aspect-[3/4]">
                  <Image
                    src={sortedImages[selectedImage]?.image_url || "/placeholder.svg"}
                    alt={product.name_pl}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {sortedImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 md:p-2 rounded-full shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
                      aria-label="Poprzednie zdjęcie"
                    >
                      <ChevronLeft className="h-6 w-6 text-gray-800" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 md:p-2 rounded-full shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
                      aria-label="Następne zdjęcie"
                    >
                      <ChevronRight className="h-6 w-6 text-gray-800" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                <p className="text-gray-400">Brak zdjęcia</p>
              </div>
            )}
          </div>

          {sortedImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {sortedImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={image.image_url || "/placeholder.svg"}
                    alt={`${product.name_pl} - zdjęcie ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name_pl}</h1>
            <p className="text-sm text-gray-500">Kod produktu: {product.product_id}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              KOLOR: {selectedColorData ? selectedColorData.color_name_pl.toUpperCase() : ""}
            </h3>
            {colorError && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-sm font-medium text-red-800">Proszę wybrać kolor</p>
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              {product.product_colors?.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorSelect(color.id)}
                  className={`group relative flex flex-col items-center gap-2 ${
                    color.stock_quantity === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={color.stock_quantity === 0}
                  title={color.color_name_pl}
                >
                  <div
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.id
                        ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.color_hex }}
                  />
                  <span
                    className={`text-xs font-medium transition-colors ${
                      selectedColor === color.id ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
                    }`}
                  >
                    {color.color_name_pl}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">ROZMIARY W ZESTAWIE</h3>
            <div className="flex flex-wrap gap-2">
              {formattedSizes.map((item, index) => (
                <div
                  key={index}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg bg-white text-center min-w-[60px]"
                >
                  <span className="text-base font-semibold text-gray-900">{item.size}</span>
                  {item.quantity > 1 && <span className="block text-xs text-gray-500 mt-1">{item.quantity} szt.</span>}
                </div>
              ))}
            </div>
            {totalPiecesInPackage > formattedSizes.length && (
              <p className="text-sm text-gray-600 mt-3">
                Łącznie: <span className="font-semibold">{totalPiecesInPackage} sztuk</span> w pakiecie
              </p>
            )}
          </div>

          {selectedColorData && (
            <div className="flex items-center gap-2 text-sm">
              {selectedColorData.stock_quantity > 0 ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Seria: {selectedColorData.stock_quantity} szt.</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-semibold">Brak w magazynie</span>
                </>
              )}
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">ILOŚĆ</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((prev) => prev - 1)}
                  disabled={quantity <= 1}
                  className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Zmniejsz ilość"
                >
                  <Minus className="h-5 w-5 text-gray-700" />
                </button>
                <div className="px-6 py-3 min-w-[80px] text-center">
                  <span className="text-lg font-semibold text-gray-900">{quantity}</span>
                </div>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  disabled={!selectedColorData || quantity >= selectedColorData.stock_quantity}
                  className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Zwiększ ilość"
                >
                  <Plus className="h-5 w-5 text-gray-700" />
                </button>
              </div>
              <span className="text-sm text-gray-600">
                {quantity > 1 && `${quantity * totalPiecesInPackage} sztuk łącznie`}
              </span>
            </div>
          </div>

          {stockError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm font-medium text-red-800">{stockError}</p>
            </div>
          )}

          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Truck className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-sm font-medium text-green-800">Wysyłka w ciągu 2-3 dni roboczych</p>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={isAdding || !selectedColorData || selectedColorData.stock_quantity === 0}
            className="w-full py-6 text-lg font-semibold"
            style={{ backgroundColor: "#8B1538" }}
          >
            {isAdding ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Dodano do koszyka!
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Dodaj do koszyka
              </>
            )}
          </Button>

          <div className="border-t pt-6">
            <div className="flex items-baseline gap-3 mb-2">
              <div className="text-3xl font-bold text-gray-900">{netPrice.toFixed(2)} PLN</div>
              <div className="text-sm text-gray-600">netto</div>
            </div>
            <div className="text-sm text-gray-600">
              Cena brutto (z VAT 23%): <span className="font-semibold text-gray-900">{grossPrice.toFixed(2)} PLN</span>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-yellow-800">Sprzedaż asortymentowa</p>
            <p className="text-sm text-yellow-700 mt-1">
              Przy zakupie otrzymujesz komplet wszystkich rozmiarów. Minimalne zamówienie: 300 PLN
            </p>
          </div>
        </div>
      </div>

      {product.description_pl && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Opis produktu</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description_pl}</p>
          </div>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-8">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Truck className="h-10 w-10 text-gray-600" />
          </div>
          <h3 className="font-semibold text-sm text-gray-900 mb-1">2-3 DNI ROBOCZE</h3>
          <p className="text-xs text-gray-600">Szybka wysyłka</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <CreditCard className="h-10 w-10 text-gray-600" />
          </div>
          <h3 className="font-semibold text-sm text-gray-900 mb-1">Bezpieczna Płatność</h3>
          <p className="text-xs text-gray-600">Karta kredytowa</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Shield className="h-10 w-10 text-gray-600" />
          </div>
          <h3 className="font-semibold text-sm text-gray-900 mb-1">Zakupy SSL</h3>
          <p className="text-xs text-gray-600">Bezpieczne zakupy</p>
        </div>
      </div>
    </div>
  )
}
