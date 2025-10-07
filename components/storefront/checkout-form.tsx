"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ShoppingBag, Loader2 } from "lucide-react"
import { submitOrder } from "@/app/zamowienie/actions"

interface CartItem {
  productId: string
  colorId: string
  name: string
  price: number
  image: string
  color: string
  sizes: string[] | string | Array<{ size: string; quantity: number }>
  quantity: number
}

const MINIMUM_ORDER = 300
const VAT_RATE = 0.23

const normalizeSizes = (sizes: string[] | string | Array<{ size: string; quantity: number }>): string[] => {
  if (!sizes) return []

  // If it's already an array of strings, return it
  if (Array.isArray(sizes) && sizes.length > 0 && typeof sizes[0] === "string") {
    return sizes as string[]
  }

  // If it's a string, try to parse it
  if (typeof sizes === "string") {
    try {
      const parsed = JSON.parse(sizes)
      return normalizeSizes(parsed)
    } catch (e) {
      console.error("[v0] Failed to parse sizes:", e)
      return []
    }
  }

  // If it's an array of objects with size and quantity
  if (Array.isArray(sizes) && sizes.length > 0 && typeof sizes[0] === "object") {
    return (sizes as Array<{ size: string; quantity: number }>).map((item) => item.size)
  }

  return []
}

export function CheckoutForm() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useDifferentBilling, setUseDifferentBilling] = useState(false)

  // Form state
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [nip, setNip] = useState("")
  const [shippingStreet, setShippingStreet] = useState("")
  const [shippingCity, setShippingCity] = useState("")
  const [shippingPostalCode, setShippingPostalCode] = useState("")
  const [billingStreet, setBillingStreet] = useState("")
  const [billingCity, setBillingCity] = useState("")
  const [billingPostalCode, setBillingPostalCode] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("direnber_cart") || "[]")
    setCartItems(cart)
    setIsLoading(false)

    // Redirect if cart is empty
    if (cart.length === 0) {
      router.push("/koszyk")
    }
  }, [router])

  const totalNet = cartItems.reduce((sum, item) => {
    const normalizedSizes = normalizeSizes(item.sizes)
    return sum + item.price * normalizedSizes.length * item.quantity
  }, 0)
  const totalVAT = totalNet * VAT_RATE
  const totalGross = totalNet + totalVAT
  const meetsMinimum = totalGross >= MINIMUM_ORDER

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("[v0] Checkout form submitted")

    if (!meetsMinimum) {
      alert("Zamówienie nie spełnia minimalnej wartości")
      return
    }

    setIsSubmitting(true)

    const orderData = {
      customerName,
      customerEmail,
      customerPhone,
      companyName,
      nip,
      shippingStreet,
      shippingCity,
      shippingPostalCode,
      shippingCountry: "Polska",
      billingStreet: useDifferentBilling ? billingStreet : undefined,
      billingCity: useDifferentBilling ? billingCity : undefined,
      billingPostalCode: useDifferentBilling ? billingPostalCode : undefined,
      billingCountry: useDifferentBilling ? "Polska" : undefined,
      notes,
      cartItems: cartItems.map((item) => ({
        productId: item.productId,
        colorId: item.colorId,
        name: item.name,
        color: item.color,
        sizes: normalizeSizes(item.sizes),
        price: item.price,
        quantity: item.quantity,
      })),
      subtotalNet: totalNet,
      vatAmount: totalVAT,
      totalGross: totalGross,
    }

    console.log("[v0] Order data prepared:", orderData)

    const result = await submitOrder(orderData)

    console.log("[v0] Order submission result:", result)

    if (result.success) {
      // Clear cart
      localStorage.removeItem("direnber_cart")
      console.log("[v0] Cart cleared, redirecting to confirmation")
      // Redirect to success page
      router.push(`/zamowienie/potwierdzenie?orderNumber=${result.orderNumber}`)
    } else {
      console.error("[v0] Order submission failed:", result.error)
      alert(result.error || "Wystąpił błąd podczas składania zamówienia")
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Ładowanie...</p>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return null
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Dane kontaktowe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">
                    Imię i nazwisko <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerPhone">
                    Telefon <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Nazwa firmy</Label>
                  <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="nip">NIP</Label>
                <Input id="nip" value={nip} onChange={(e) => setNip(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Adres dostawy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="shippingStreet">
                  Ulica i numer <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="shippingStreet"
                  value={shippingStreet}
                  onChange={(e) => setShippingStreet(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shippingCity">
                    Miasto <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="shippingCity"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="shippingPostalCode">
                    Kod pocztowy <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="shippingPostalCode"
                    value={shippingPostalCode}
                    onChange={(e) => setShippingPostalCode(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardHeader>
              <CardTitle>Adres rozliczeniowy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useDifferentBilling"
                  checked={useDifferentBilling}
                  onCheckedChange={(checked) => setUseDifferentBilling(checked as boolean)}
                />
                <Label htmlFor="useDifferentBilling" className="cursor-pointer">
                  Użyj innego adresu rozliczeniowego
                </Label>
              </div>

              {useDifferentBilling && (
                <>
                  <div>
                    <Label htmlFor="billingStreet">
                      Ulica i numer <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="billingStreet"
                      value={billingStreet}
                      onChange={(e) => setBillingStreet(e.target.value)}
                      required={useDifferentBilling}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingCity">
                        Miasto <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="billingCity"
                        value={billingCity}
                        onChange={(e) => setBillingCity(e.target.value)}
                        required={useDifferentBilling}
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingPostalCode">
                        Kod pocztowy <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="billingPostalCode"
                        value={billingPostalCode}
                        onChange={(e) => setBillingPostalCode(e.target.value)}
                        required={useDifferentBilling}
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Uwagi do zamówienia</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Dodatkowe informacje lub uwagi do zamówienia..."
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Podsumowanie zamówienia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {cartItems.map((item, index) => {
                  const normalizedSizes = normalizeSizes(item.sizes)
                  const itemNetPrice = item.price * normalizedSizes.length * item.quantity
                  const itemVAT = itemNetPrice * VAT_RATE
                  const itemGrossPrice = itemNetPrice + itemVAT

                  return (
                    <div key={index} className="flex gap-3 pb-4 border-b last:border-b-0">
                      <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-600 mb-1">Kolor: {item.color}</p>
                        <div className="flex flex-wrap gap-1 mb-1">
                          {normalizedSizes.map((size) => (
                            <Badge key={size} variant="outline" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">Ilość: {item.quantity}</p>
                        <p className="text-sm font-semibold text-[#8B1538] mt-1">{itemGrossPrice.toFixed(2)} PLN</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-3 pt-4 border-t">
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
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-800">Minimalne zamówienie: {MINIMUM_ORDER} PLN</p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full gap-2 py-6 text-lg"
                style={{ backgroundColor: "#8B1538" }}
                disabled={!meetsMinimum || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Przetwarzanie...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    Złóż zamówienie
                  </>
                )}
              </Button>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2 text-sm">Informacje</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Wysyłka w ciągu 2-3 dni roboczych</li>
                  <li>• Płatność przelewem po otrzymaniu faktury</li>
                  <li>• Minimalne zamówienie: {MINIMUM_ORDER} PLN</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
