"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload, Check, ChevronsUpDown } from "lucide-react"

interface Category {
  id: string
  name_pl: string
  subcategories?: Array<{
    id: string
    name_pl: string
  }>
}

interface ProductFormProps {
  categories: Category[]
  product?: any
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

interface ColorWithImages {
  id?: string
  color_name_pl: string
  color_hex: string
  stock_quantity: number
  imageFiles: File[]
  existingImageUrls: string[]
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    product_id: product?.product_id || "",
    name_pl: product?.name_pl || "",
    description_pl: product?.description_pl || "",
    price_pln: product?.price_pln || "",
    subcategory_id: product?.subcategory_id || "",
    is_active: product?.is_active ?? true,
  })

  const [productSizes, setProductSizes] = useState<Array<{ size: string; quantity: number }>>(() => {
    if (!product?.sizes_included) {
      return []
    }

    let sizesData = product.sizes_included

    // If it's a string, try to parse it as JSON
    if (typeof sizesData === "string") {
      try {
        sizesData = JSON.parse(sizesData)
      } catch (e) {
        console.error("[v0] Failed to parse sizes_included:", e)
        return []
      }
    }

    // Now check if it's the new format (array of objects) or old format (array of strings)
    if (Array.isArray(sizesData) && sizesData.length > 0) {
      const firstItem = sizesData[0]

      // New format - objects with size and quantity
      if (typeof firstItem === "object" && firstItem !== null && "size" in firstItem && "quantity" in firstItem) {
        return sizesData as Array<{ size: string; quantity: number }>
      }

      // Old format - just strings, convert to new format
      if (typeof firstItem === "string") {
        return sizesData.map((size: string) => ({ size, quantity: 1 }))
      }
    }

    return []
  })

  const [customSize, setCustomSize] = useState("")

  const [colors, setColors] = useState<ColorWithImages[]>(
    product?.product_colors?.map((color: any) => ({
      id: color.id,
      color_name_pl: color.color_name_pl,
      color_hex: color.color_hex,
      stock_quantity: color.stock_quantity,
      imageFiles: [],
      existingImageUrls:
        product?.product_images
          ?.filter((img: any) => img.color_id === color.id)
          ?.sort((a: any, b: any) => a.display_order - b.display_order)
          ?.map((img: any) => img.image_url) || [],
    })) || [],
  )

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)

  const selectedCategory = categories.find((cat) =>
    cat.subcategories?.some((sub) => sub.id === formData.subcategory_id),
  )

  const handleAddColor = () => {
    setColors([
      ...colors,
      {
        color_name_pl: "",
        color_hex: "#000000",
        stock_quantity: 0,
        imageFiles: [],
        existingImageUrls: [],
      },
    ])
  }

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index))
  }

  const handleColorChange = (index: number, field: string, value: string | number) => {
    const newColors = [...colors]
    newColors[index] = { ...newColors[index], [field]: value }
    setColors(newColors)
  }

  const handleColorFileSelect = (colorIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files)
      const validFiles: File[] = []
      const maxSize = 5 * 1024 * 1024 // 5MB
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]

      for (const file of newFiles) {
        if (file.size > maxSize) {
          alert(`Plik jest za duży: ${file.name}\nMaksymalny rozmiar pliku: 5MB`)
          continue
        }

        if (!allowedTypes.includes(file.type)) {
          alert(`Nieprawidłowy typ pliku: ${file.name}\nDozwolone typy: JPG, PNG, WebP, GIF`)
          continue
        }

        validFiles.push(file)
      }

      if (validFiles.length > 0) {
        const newColors = [...colors]
        newColors[colorIndex].imageFiles = [...newColors[colorIndex].imageFiles, ...validFiles]
        setColors(newColors)
      }
    }
  }

  const handleRemoveColorFile = (colorIndex: number, fileIndex: number) => {
    const newColors = [...colors]
    newColors[colorIndex].imageFiles = newColors[colorIndex].imageFiles.filter((_, i) => i !== fileIndex)
    setColors(newColors)
  }

  const handleRemoveColorExistingImage = (colorIndex: number, imageIndex: number) => {
    const newColors = [...colors]
    newColors[colorIndex].existingImageUrls = newColors[colorIndex].existingImageUrls.filter((_, i) => i !== imageIndex)
    setColors(newColors)
  }

  const handleAddSize = (size: string) => {
    if (!productSizes.find((s) => s.size === size)) {
      setProductSizes([...productSizes, { size, quantity: 1 }])
    }
  }

  const handleAddCustomSize = () => {
    const trimmedSize = customSize.trim()
    if (trimmedSize && !productSizes.find((s) => s.size === trimmedSize)) {
      setProductSizes([...productSizes, { size: trimmedSize, quantity: 1 }])
      setCustomSize("")
    }
  }

  const handleRemoveSize = (index: number) => {
    setProductSizes(productSizes.filter((_, i) => i !== index))
  }

  const handleUpdateSizeQuantity = (index: number, quantity: number) => {
    const newSizes = [...productSizes]
    newSizes[index].quantity = quantity
    setProductSizes(newSizes)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.product_id.trim()) {
        alert("ID produktu jest wymagane")
        setIsSubmitting(false)
        return
      }

      if (!formData.name_pl.trim()) {
        alert("Nazwa produktu jest wymagana")
        setIsSubmitting(false)
        return
      }

      if (!formData.price_pln || Number.parseFloat(formData.price_pln) <= 0) {
        alert("Wprowadź prawidłową cenę")
        setIsSubmitting(false)
        return
      }

      if (!formData.subcategory_id) {
        alert("Wybierz kategorię")
        setIsSubmitting(false)
        return
      }

      if (productSizes.length === 0) {
        alert("Wybierz co najmniej jeden rozmiar")
        setIsSubmitting(false)
        return
      }

      if (colors.length === 0) {
        alert("Dodaj co najmniej jeden kolor")
        setIsSubmitting(false)
        return
      }

      const invalidColor = colors.find((c) => !c.color_name_pl.trim() || !c.color_hex)
      if (invalidColor) {
        alert("Wszystkie kolory muszą mieć nazwę i kod koloru")
        setIsSubmitting(false)
        return
      }

      const invalidStock = colors.find((c) => c.stock_quantity < 0)
      if (invalidStock) {
        alert("Stan magazynowy nie może być ujemny")
        setIsSubmitting(false)
        return
      }

      const colorWithoutImages = colors.find((c) => c.imageFiles.length === 0 && c.existingImageUrls.length === 0)
      if (colorWithoutImages) {
        alert(`Kolor "${colorWithoutImages.color_name_pl}" musi mieć co najmniej jedno zdjęcie`)
        setIsSubmitting(false)
        return
      }

      const productData = {
        product_id: formData.product_id.trim(),
        name_pl: formData.name_pl.trim(),
        description_pl: formData.description_pl.trim(),
        price_pln: Number.parseFloat(formData.price_pln),
        subcategory_id: formData.subcategory_id,
        sizes_included: JSON.stringify(productSizes),
        is_active: formData.is_active,
        slug: formData.name_pl
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }

      console.log("[v0] Updating product with data:", productData)

      let productId = product?.id

      if (product) {
        const { error } = await supabase
          .from("products")
          .update({
            product_id: productData.product_id,
            name_pl: productData.name_pl,
            description_pl: productData.description_pl,
            price_pln: productData.price_pln,
            subcategory_id: productData.subcategory_id,
            sizes_included: productData.sizes_included,
            is_active: productData.is_active,
            slug: productData.slug,
          })
          .eq("id", product.id)

        if (error) {
          console.error("[v0] Error updating product:", error)
          throw error
        }

        console.log("[v0] Product updated successfully with subcategory_id:", productData.subcategory_id)

        await supabase.from("product_colors").delete().eq("product_id", product.id)
        await supabase.from("product_images").delete().eq("product_id", product.id)
      } else {
        const { data, error } = await supabase.from("products").insert(productData).select().single()
        if (error) throw error
        productId = data.id
      }

      const colorInserts = colors.map((color) => ({
        product_id: productId,
        color_name_pl: color.color_name_pl.trim(),
        color_hex: color.color_hex,
        stock_quantity: color.stock_quantity,
        sizes: JSON.stringify(productSizes),
      }))

      const { data: insertedColors, error: colorError } = await supabase
        .from("product_colors")
        .insert(colorInserts)
        .select()

      if (colorError) throw colorError

      setUploadingImages(true)

      for (let i = 0; i < colors.length; i++) {
        const color = colors[i]
        const insertedColor = insertedColors[i]
        const allImageUrls: string[] = [...color.existingImageUrls]

        if (color.imageFiles.length > 0) {
          for (const file of color.imageFiles) {
            try {
              const formData = new FormData()
              formData.append("file", file)

              const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              })

              if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Przesyłanie zdjęcia nie powiodło się: ${file.name}\nBłąd: ${errorText}`)
              }

              const data = await response.json()
              allImageUrls.push(data.url)
            } catch (error: any) {
              setUploadingImages(false)
              setIsSubmitting(false)
              alert(`Błąd przesyłania zdjęcia: ${file.name}\n\n${error.message}`)
              return
            }
          }
        }

        const imageInserts = allImageUrls.map((url, index) => ({
          product_id: productId,
          color_id: insertedColor.id,
          image_url: url,
          display_order: index,
        }))

        const { error: imageError } = await supabase.from("product_images").insert(imageInserts)
        if (imageError) throw imageError
      }

      setUploadingImages(false)
      alert("Produkt został pomyślnie zapisany!")
      router.push("/admin/dashboard")
      router.refresh()
    } catch (error: any) {
      console.error("[v0] Error saving product:", error)

      let errorMessage = "Nieznany błąd"

      if (error?.message) {
        errorMessage = error.message
      }

      if (error?.details) {
        errorMessage += `\n\nSzczegóły: ${error.details}`
      }

      if (error?.hint) {
        errorMessage += `\n\nWskazówka: ${error.hint}`
      }

      if (error?.code) {
        errorMessage += `\n\nKod błędu: ${error.code}`
      }

      alert(`Wystąpił błąd podczas zapisywania produktu:\n\n${errorMessage}`)
    } finally {
      setIsSubmitting(false)
      setUploadingImages(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Podstawowe Informacje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="product_id">ID Produktu</Label>
            <Input
              id="product_id"
              required
              value={formData.product_id}
              onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
              placeholder="np. DRESS-001"
              disabled={!!product}
              className={product ? "bg-gray-100 cursor-not-allowed" : ""}
            />
            {product && (
              <p className="text-xs text-gray-500">ID produktu nie może być edytowane (istniejący produkt)</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Nazwa Produktu</Label>
            <Input
              id="name"
              required
              value={formData.name_pl}
              onChange={(e) => setFormData({ ...formData, name_pl: e.target.value })}
              placeholder="np. Elegancka Sukienka Zimowa"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Opis</Label>
            <Textarea
              id="description"
              value={formData.description_pl}
              onChange={(e) => setFormData({ ...formData, description_pl: e.target.value })}
              placeholder="Szczegółowy opis produktu..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Cena (PLN)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                required
                value={formData.price_pln}
                onChange={(e) => setFormData({ ...formData, price_pln: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="grid gap-2">
              <Label>Kategoria</Label>
              <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-14 justify-between text-base font-normal bg-transparent"
                  >
                    {formData.subcategory_id ? (
                      <span>
                        {selectedCategory?.name_pl} →{" "}
                        {selectedCategory?.subcategories?.find((s) => s.id === formData.subcategory_id)?.name_pl}
                      </span>
                    ) : (
                      <span className="text-gray-500">Wybierz kategorię</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Wybierz Kategorię</DialogTitle>
                  </DialogHeader>
                  <div className="overflow-y-auto max-h-[60vh] border rounded-lg">
                    {categories.map((category) => (
                      <div key={category.id} className="border-b last:border-b-0">
                        <div className="px-4 py-3 text-sm font-bold text-white bg-[#8B1538] sticky top-0">
                          {category.name_pl}
                        </div>
                        <div className="py-2">
                          {category.subcategories?.map((sub) => (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, subcategory_id: sub.id })
                                setCategoryDialogOpen(false)
                              }}
                              className={`w-full text-left px-6 py-4 text-base hover:bg-blue-50 transition-colors flex items-center justify-between ${
                                formData.subcategory_id === sub.id ? "bg-blue-100 font-medium" : ""
                              }`}
                            >
                              <span>{sub.name_pl}</span>
                              {formData.subcategory_id === sub.id && <Check className="h-5 w-5 text-blue-600" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              {selectedCategory && (
                <p className="text-sm text-gray-600 font-medium">
                  Wybrano: {selectedCategory.name_pl} →{" "}
                  {selectedCategory.subcategories?.find((s) => s.id === formData.subcategory_id)?.name_pl}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rozmiary w Pakiecie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm text-gray-600 mb-2 block">Szybki wybór (rozmiary literowe)</Label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SIZES.map((size) => (
                <Badge
                  key={size}
                  variant="outline"
                  className="cursor-pointer hover:bg-[#8B1538] hover:text-white transition-colors"
                  onClick={() => handleAddSize(size)}
                >
                  {size}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-600 mb-2 block">Dodaj niestandardowy rozmiar (np. 36, 38, 40)</Label>
            <div className="flex gap-2">
              <Input
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="np. 36, 38, 40, 42..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddCustomSize()
                  }
                }}
              />
              <Button type="button" onClick={handleAddCustomSize} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {productSizes.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm text-gray-600 block">Wybrane rozmiary - Ustaw ilość dla każdego</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {productSizes.map((sizeObj, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 border-2 rounded-lg bg-white">
                    <Input
                      type="number"
                      min="1"
                      value={sizeObj.quantity}
                      onChange={(e) => handleUpdateSizeQuantity(index, Number.parseInt(e.target.value) || 1)}
                      className="w-16 h-8 text-center"
                    />
                    <span className="text-sm font-medium">×</span>
                    <Badge variant="default" style={{ backgroundColor: "#8B1538" }} className="text-sm flex-1">
                      {sizeObj.size}
                    </Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleRemoveSize(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                <span className="text-sm font-semibold">Łącznie sztuk w pakiecie:</span>
                <Badge variant="default" style={{ backgroundColor: "#8B1538" }} className="text-base">
                  {productSizes.reduce((sum, s) => sum + s.quantity, 0)} szt.
                </Badge>
                <span className="text-sm text-gray-600">
                  ({productSizes.map((s) => `${s.quantity}-${s.size}`).join(", ")})
                </span>
              </div>
              <p className="text-xs text-gray-500">Te rozmiary będą dostępne dla wszystkich kolorów tego produktu</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kolory, Stany Magazynowe i Zdjęcia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {colors.map((color, index) => (
            <div key={index} className="p-6 border-2 rounded-lg space-y-4 bg-gray-50">
              <div className="flex items-end gap-4">
                <div className="grid gap-2 flex-1">
                  <Label>Nazwa Koloru</Label>
                  <Input
                    value={color.color_name_pl}
                    onChange={(e) => handleColorChange(index, "color_name_pl", e.target.value)}
                    placeholder="np. Czerwony"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Kolor</Label>
                  <Input
                    type="color"
                    value={color.color_hex}
                    onChange={(e) => handleColorChange(index, "color_hex", e.target.value)}
                    className="w-20 h-10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Stan Magazynowy</Label>
                  <Input
                    type="number"
                    value={color.stock_quantity}
                    onChange={(e) => handleColorChange(index, "stock_quantity", Number.parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-24"
                    required
                  />
                </div>
                <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveColor(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label className="text-sm font-semibold">
                  Zdjęcia dla koloru: {color.color_name_pl || "Nowy kolor"}
                </Label>

                {color.existingImageUrls.length > 0 && (
                  <div>
                    <Label className="text-xs text-gray-600 mb-2 block">Aktualne zdjęcia</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {color.existingImageUrls.map((url, imgIndex) => (
                        <div key={`existing-${index}-${imgIndex}`} className="relative group">
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`${color.color_name_pl} ${imgIndex + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=128&width=128"
                            }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveColorExistingImage(index, imgIndex)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {color.imageFiles.length > 0 && (
                  <div>
                    <Label className="text-xs text-gray-600 mb-2 block">Nowe zdjęcia do przesłania</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {color.imageFiles.map((file, fileIndex) => (
                        <div key={`new-${index}-${fileIndex}`} className="relative group">
                          <img
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt={`Nowe ${fileIndex + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-green-500"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveColorFile(index, fileIndex)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate rounded-b-lg">
                            {file.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors bg-white">
                  <input
                    type="file"
                    id={`image-upload-${index}`}
                    multiple
                    accept="image/*"
                    onChange={(e) => handleColorFileSelect(index, e)}
                    className="hidden"
                  />
                  <label htmlFor={`image-upload-${index}`} className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-1" />
                    <p className="text-xs font-medium text-gray-700">Dodaj zdjęcia dla tego koloru</p>
                    <p className="text-xs text-gray-500 mt-1">Można wybrać wiele zdjęć</p>
                  </label>
                </div>
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddColor} className="w-full gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Dodaj Kolor
          </Button>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Button
          type="submit"
          disabled={isSubmitting || uploadingImages}
          style={{ backgroundColor: "#8B1538" }}
          className="flex-1"
        >
          {uploadingImages
            ? "Przesyłanie zdjęć..."
            : isSubmitting
              ? "Zapisywanie..."
              : product
                ? "Zaktualizuj Produkt"
                : "Dodaj Produkt"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Anuluj
        </Button>
      </div>
    </form>
  )
}
