"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface Category {
  id: string
  name_pl: string
  slug: string
  subcategories?: Array<{
    id: string
    name_pl: string
    slug: string
  }>
}

interface CategoriesManagerProps {
  categories: Category[]
}

export function CategoriesManager({ categories }: CategoriesManagerProps) {
  const router = useRouter()
  const supabase = createClient()
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newSubcategoryName, setNewSubcategoryName] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return

    setIsSubmitting(true)
    try {
      const slug = newCategoryName.toLowerCase().replace(/\s+/g, "-")
      const { error } = await supabase.from("categories").insert({
        name_pl: newCategoryName,
        slug,
        display_order: categories.length,
      })

      if (error) throw error

      setNewCategoryName("")
      router.refresh()
    } catch (error) {
      console.error("Error adding category:", error)
      alert("Błąd podczas dodawania kategorii")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddSubcategory = async () => {
    if (!newSubcategoryName.trim() || !selectedCategoryId) return

    setIsSubmitting(true)
    try {
      const slug = newSubcategoryName.toLowerCase().replace(/\s+/g, "-")
      const category = categories.find((c) => c.id === selectedCategoryId)
      const { error } = await supabase.from("subcategories").insert({
        category_id: selectedCategoryId,
        name_pl: newSubcategoryName,
        slug: `${slug}-${category?.slug}`,
        display_order: category?.subcategories?.length || 0,
      })

      if (error) throw error

      setNewSubcategoryName("")
      router.refresh()
    } catch (error) {
      console.error("Error adding subcategory:", error)
      alert("Błąd podczas dodawania podkategorii")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Czy na pewno chcesz usunąć tę kategorię? Wszystkie podkategorie również zostaną usunięte.")) return

    try {
      const { error } = await supabase.from("categories").delete().eq("id", categoryId)
      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error deleting category:", error)
      alert("Błąd podczas usuwania kategorii")
    }
  }

  const handleDeleteSubcategory = async (subcategoryId: string) => {
    if (!confirm("Czy na pewno chcesz usunąć tę podkategorię?")) return

    try {
      const { error } = await supabase.from("subcategories").delete().eq("id", subcategoryId)
      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error deleting subcategory:", error)
      alert("Błąd podczas usuwania podkategorii")
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Dodaj Nową Kategorię</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Nazwa kategorii (np. Kolekcja Wiosenna)"
              />
            </div>
            <Button onClick={handleAddCategory} disabled={isSubmitting} style={{ backgroundColor: "#8B1538" }}>
              <Plus className="h-4 w-4 mr-2" />
              Dodaj
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dodaj Nową Podkategorię</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Wybierz kategorię</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_pl}
                </option>
              ))}
            </select>
            <div className="flex-1">
              <Input
                value={newSubcategoryName}
                onChange={(e) => setNewSubcategoryName(e.target.value)}
                placeholder="Nazwa podkategorii (np. Sukienki)"
              />
            </div>
            <Button onClick={handleAddSubcategory} disabled={isSubmitting} style={{ backgroundColor: "#8B1538" }}>
              <Plus className="h-4 w-4 mr-2" />
              Dodaj
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{category.name_pl}</CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.subcategories?.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between p-2 border rounded">
                    <span>{sub.name_pl}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteSubcategory(sub.id)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ))}
                {(!category.subcategories || category.subcategories.length === 0) && (
                  <p className="text-sm text-gray-500">Brak podkategorii</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
