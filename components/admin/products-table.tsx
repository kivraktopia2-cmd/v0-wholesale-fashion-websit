"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Eye, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name_pl: string
  price_pln: number
  sizes_included: string[] | Array<{ size: string; quantity: number }> | string
  is_active: boolean
  subcategories?: {
    name_pl: string
    categories?: {
      name_pl: string
    }
  }
  product_colors?: Array<{
    color_name_pl: string
    stock_quantity: number
    color_hex: string
  }>
  product_images?: Array<{
    image_url: string
    display_order: number
  }>
  product_id: string
}

interface ProductsTableProps {
  products: Product[]
  categories: Array<{ id: string; name_pl: string }>
}

function formatSizesForDisplay(sizes: string[] | Array<{ size: string; quantity: number }> | string) {
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
      // New format - show quantity if > 1
      return (sizesData as Array<{ size: string; quantity: number }>).map((item) => ({
        display: item.quantity > 1 ? `${item.quantity}× ${item.size}` : item.size,
        size: item.size,
        quantity: item.quantity,
      }))
    }

    // Old format - just strings
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

export function ProductsTable({ products, categories }: ProductsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (productId: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten produkt?")) return

    setDeletingId(productId)
    try {
      const { error } = await supabase.from("products").delete().eq("id", productId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Błąd podczas usuwania produktu")
    } finally {
      setDeletingId(null)
    }
  }

  const filteredProducts = products.filter((product) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return product.product_id?.toLowerCase().includes(query) || product.name_pl?.toLowerCase().includes(query)
  })

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Szukaj po ID lub nazwie produktu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Zdjęcie</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Nazwa</TableHead>
            <TableHead>Kategoria</TableHead>
            <TableHead>Cena (PLN)</TableHead>
            <TableHead>Rozmiary</TableHead>
            <TableHead>Kolory</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                {searchQuery.trim() ? "Nie znaleziono produktów." : "Brak produktów. Dodaj pierwszy produkt."}
              </TableCell>
            </TableRow>
          ) : (
            filteredProducts.map((product) => {
              const firstImage = product.product_images?.sort((a, b) => a.display_order - b.display_order)[0]
              const totalStock = product.product_colors?.reduce((sum, color) => sum + color.stock_quantity, 0) || 0
              const formattedSizes = formatSizesForDisplay(product.sizes_included)

              return (
                <TableRow key={product.id}>
                  <TableCell>
                    {firstImage ? (
                      <Image
                        src={firstImage.image_url || "/placeholder.svg"}
                        alt={product.name_pl}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                    ) : (
                      <div className="w-[60px] h-[60px] bg-gray-200 rounded flex items-center justify-center">
                        <Eye className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{product.product_id}</TableCell>
                  <TableCell className="font-medium">{product.name_pl}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{product.subcategories?.categories?.name_pl}</p>
                      <p className="text-gray-500">{product.subcategories?.name_pl}</p>
                    </div>
                  </TableCell>
                  <TableCell>{product.price_pln.toFixed(2)} PLN</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {formattedSizes.map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {item.display}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.product_colors?.map((color, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color.color_hex }}
                            title={color.color_name_pl}
                          />
                          <span className="text-xs text-gray-500">({color.stock_quantity})</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.is_active ? (
                      <Badge className="bg-green-500">Aktywny</Badge>
                    ) : (
                      <Badge variant="secondary">Nieaktywny</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          <Edit className="h-3 w-3" />
                          Edytuj
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                      >
                        <Trash2 className="h-3 w-3" />
                        {deletingId === product.id ? "Usuwanie..." : "Usuń"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
