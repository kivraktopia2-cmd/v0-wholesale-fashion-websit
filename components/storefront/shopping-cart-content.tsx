"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, ShoppingBag, AlertCircle, Plus, Minus } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

interface CartItem {
  productId: string
  colorId: string
  name: string
  price: number
  image: string
  color: string
  sizes: string[] | Array<{ size: string; quantity: number }> | string
  quantity?: number
  stockQuantity?: number
  piecesPerPackage?: number
}

const MINIMUM_ORDER = 300
const VAT_RATE = 0.23

export function ShoppingCartContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stockWarnings, setStockWarnings] = useState<Record<string, string>>({})

  useEffect(() => {
    const loadCart = async () => {
      const cart = JSON.parse(localStorage.getItem("direnber_cart") || "[]")
      const cartWithQuantity = cart.map((item: CartItem) => ({
        ...item,
        quantity: item.quantity || 1,
      }))

      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

      const colorIds = cartWithQuantity.map((item: CartItem) => item.colorId)
      const productIds = cartWithQuantity.map((item: CartItem) => item.productId)

      const [stockResponse, imageResponse] = await Promise.all([
        supabase.from("product_colors").select("id, stock_quantity").in("id", colorIds),
        supabase
          .from("product_images")
          .select("product_id, color_id, image_url, display_order")
          .in("product_id", productIds)
          .order("display_order"),
      ])

      const stockData = stockResponse.data
      const imageData = imageResponse.data

      const updatedCart = cartWithQuantity.map((item: CartItem) => {
        const stockInfo = stockData?.find((s) => s.id === item.colorId)
        const colorImage = imageData?.find((img) => img.product_id === item.productId && img.color_id === item.colorId)
        return {
          ...item,
          stockQuantity: stockInfo?.stock_quantity || 0,
          image: colorImage?.image_url || item.image,
        }
      })

      setCartItems(updatedCart)

      const warnings: Record<string, string> = {}
      updatedCart.forEach((item: CartItem) => {
        const itemKey = `${item.productId}-${item.colorId}`
        if ((item.quantity || 1) > (item.stockQuantity || 0)) {
          warnings[itemKey] = `Dostępny stan: ${item.stockQuantity} szt. Zmniejsz ilość.`
        }
      })
      setStockWarnings(warnings)

      setIsLoading(false)
    }

    loadCart()
  }, [])

  const calculatePiecesInPackage = (sizes: string[] | Array<{ size: string; quantity: number }> | string): number => {
    if (!sizes) return 0

    let sizesData = sizes

    // If it's a string, try to parse it as JSON
    if (typeof sizesData === "string") {
      try {
        sizesData = JSON.parse(sizesData)
      } catch (e) {
        console.error("[v0] Failed to parse sizes:", e)
        return 0
      }
    }

    // Check if it's the new format with quantities
    if (Array.isArray(sizesData) && sizesData.length > 0) {
      const firstItem = sizesData[0]

      if (typeof firstItem === "object" && firstItem !== null && "size" in firstItem && "quantity" in firstItem) {
        // New format - sum all quantities
        return (sizesData as Array<{ size: string; quantity: number }>).reduce((sum, item) => sum + item.quantity, 0)
      }

      // Old format - just count the array length
      if (typeof firstItem === "string") {
        return sizesData.length
      }
    }

    return 0
  }

  const formatSizesForDisplay = (sizes: string[] | Array<{ size: string; quantity: number }> | string) => {
    if (!sizes) return []

    let sizesData = sizes

    // If it's a string, try to parse it as JSON
    if (typeof sizesData === "string") {
      try {
        sizesData = JSON.parse(sizesData)
      } catch (e) {
        console.error("[v0] Failed to parse sizes:", e)
        return []
      }
    }

    // Check if it's the new format with quantities
    if (Array.isArray(sizesData) && sizesData.length > 0) {
      const firstItem = sizesData[0]

      if (typeof firstItem === "object" && firstItem !== null && "size" in firstItem && "quantity" in firstItem) {
        return (sizesData as Array<{ size: string; quantity: number }>).map((item) =>
          item.quantity > 1 ? `${item.quantity}× ${item.size}` : item.size,
        )
      }

      // Old format - just strings
      if (typeof firstItem === "string") {
        return sizesData as string[]
      }
    }

    return []
  }

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(index)
      return
    }

    const item = cartItems[index]
    const itemKey = `${item.productId}-${item.colorId}`

    if (newQuantity > (item.stockQuantity || 0)) {
      const newWarnings = { ...stockWarnings }
      newWarnings[itemKey] = `Maksymalna dostępna ilość: ${item.stockQuantity} szt.`
      setStockWarnings(newWarnings)
      return
    }

    const newWarnings = { ...stockWarnings }
    delete newWarnings[itemKey]
    setStockWarnings(newWarnings)

    const newCart = [...cartItems]
    newCart[index].quantity = newQuantity
    setCartItems(newCart)
    localStorage.setItem("direnber_cart", JSON.stringify(newCart))
  }

  const removeItem = (index: number) => {
    const itemToRemove = cartItems[index]
    const itemKey = `${itemToRemove.productId}-${itemToRemove.colorId}`

    const newCart = cartItems.filter((_, i) => i !== index)
    setCartItems(newCart)
    localStorage.setItem("direnber_cart", JSON.stringify(newCart))

    // Remove warning for the deleted item
    const newWarnings = { ...stockWarnings }
    delete newWarnings[itemKey]
    setStockWarnings(newWarnings)
  }

  const clearCart = () => {
    setCartItems([])
    setStockWarnings({})
    localStorage.setItem("direnber_cart", "[]")
  }

  const totalNet = cartItems.reduce((sum, item) => {
    const piecesPerPackage = item.piecesPerPackage || calculatePiecesInPackage(item.sizes)
    return sum + item.price * piecesPerPackage * (item.quantity || 1)
  }, 0)
  const totalVAT = totalNet * VAT_RATE
  const totalGross = totalNet + totalVAT
  const meetsMinimum = totalGross >= MINIMUM_ORDER
  const remainingAmount = MINIMUM_ORDER - totalGross
  const hasStockIssues = Object.keys(stockWarnings).length > 0

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Ładowanie koszyka...</p>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Twój koszyk jest pusty</h2>
        <p className="text-gray-600 mb-6">Dodaj produkty do koszyka, aby kontynuować zakupy</p>
        <Link href="/produkty">
          <Button style={{ backgroundColor: "#8B1538" }}>Przeglądaj Produkty</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Produkty w koszyku ({cartItems.length})</h2>
          <Button variant="outline" onClick={clearCart} className="gap-2 bg-transparent">
            <Trash2 className="h-4 w-4" />
            Wyczyść koszyk
          </Button>
        </div>

        {hasStockIssues && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">Problemy z dostępnością</p>
                <p className="text-sm text-red-700 mt-1">
                  Niektóre produkty przekraczają dostępny stan magazynowy. Zmniejsz ilość, aby kontynuować.
                </p>
              </div>
            </div>
          </div>
        )}

        {cartItems.map((item, index) => {
          const piecesPerPackage = item.piecesPerPackage || calculatePiecesInPackage(item.sizes)
          const formattedSizes = formatSizesForDisplay(item.sizes)
          const itemNetPrice = item.price * piecesPerPackage * (item.quantity || 1)
          const itemVAT = itemNetPrice * VAT_RATE
          const itemGrossPrice = itemNetPrice + itemVAT
          const itemKey = `${item.productId}-${item.colorId}`

          return (
            <Card key={index} className={stockWarnings[itemKey] ? "border-red-300" : ""}>
              <CardContent className="p-4">
                {stockWarnings[itemKey] && (
                  <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-800">{stockWarnings[itemKey]}</p>
                  </div>
                )}
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Kolor: {item.color}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {formattedSizes.map((size, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Asortyment: {piecesPerPackage} szt. (wszystkie rozmiary)</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Dostępny stan: <span className="font-semibold">{item.stockQuantity} szt.</span>
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-sm text-gray-600">Ilość:</span>
                      <div className="flex items-center gap-1 border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 text-sm font-semibold min-w-[2rem] text-center">
                          {item.quantity || 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          disabled={(item.quantity || 1) >= (item.stockQuantity || 0)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">
                        Cena netto: {item.price.toFixed(2)} PLN × {piecesPerPackage} szt. × {item.quantity || 1}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">Netto: {itemNetPrice.toFixed(2)} PLN</p>
                      <p className="text-xs text-gray-500 mb-1">VAT (23%): {itemVAT.toFixed(2)} PLN</p>
                      <p className="text-2xl font-bold text-[#8B1538]">
                        {itemGrossPrice.toFixed(2)} PLN
                        <span className="text-xs font-normal text-gray-500 ml-1">brutto</span>
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Podsumowanie</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Liczba produktów:</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Wartość netto:</span>
                <span>{totalNet.toFixed(2)} PLN</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT (23%):</span>
                <span>{totalVAT.toFixed(2)} PLN</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Suma brutto:</span>
                  <span className="text-[#8B1538]">{totalGross.toFixed(2)} PLN</span>
                </div>
              </div>
            </div>

            {!meetsMinimum && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-800">Minimalne zamówienie: {MINIMUM_ORDER} PLN</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Dodaj produkty za {remainingAmount.toFixed(2)} PLN, aby kontynuować
                    </p>
                  </div>
                </div>
              </div>
            )}

            {meetsMinimum && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Zamówienie spełnia minimum</p>
                    <p className="text-sm text-green-700 mt-1">Możesz przejść do finalizacji zamówienia</p>
                  </div>
                </div>
              </div>
            )}

            <Link href="/zamowienie">
              <Button
                className="w-full gap-2 py-6 text-lg mb-3"
                style={{ backgroundColor: "#8B1538" }}
                disabled={!meetsMinimum || hasStockIssues}
              >
                <ShoppingBag className="h-5 w-5" />
                Przejdź do zamówienia
              </Button>
            </Link>

            <Link href="/produkty">
              <Button variant="outline" className="w-full bg-transparent">
                Kontynuuj zakupy
              </Button>
            </Link>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3">Informacje o zamówieniu</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Ceny podane są netto</li>
                <li>• VAT 23% doliczany przy finalizacji</li>
                <li>• Sprzedaż asortymentowa</li>
                <li>• Wszystkie rozmiary w zestawie</li>
                <li>• Minimalne zamówienie: {MINIMUM_ORDER} PLN</li>
                <li>• Wysyłka w ciągu 2-3 dni roboczych</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
