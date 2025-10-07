"use server"

import { createClient } from "@/lib/supabase/server"

interface OrderData {
  customerName: string
  customerEmail: string
  customerPhone: string
  companyName?: string
  nip?: string
  shippingStreet: string
  shippingCity: string
  shippingPostalCode: string
  shippingCountry: string
  billingStreet?: string
  billingCity?: string
  billingPostalCode?: string
  billingCountry?: string
  notes?: string
  cartItems: Array<{
    productId: string
    colorId: string
    name: string
    color: string
    sizes: string[]
    price: number
    quantity: number
  }>
  subtotalNet: number
  vatAmount: number
  totalGross: number
}

export async function submitOrder(orderData: OrderData) {
  try {
    console.log("[v0] Starting order submission")
    const supabase = await createClient()

    // Generate order number
    console.log("[v0] Generating order number")
    const { data: orderNumberData, error: orderNumberError } = await supabase.rpc("generate_order_number")

    if (orderNumberError) {
      console.error("[v0] Error generating order number:", orderNumberError)
      return { success: false, error: "Nie udało się wygenerować numeru zamówienia" }
    }

    console.log("[v0] Order number generated:", orderNumberData)

    // Create order
    console.log("[v0] Creating order in database")
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumberData,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        company_name: orderData.companyName,
        nip: orderData.nip,
        shipping_street: orderData.shippingStreet,
        shipping_city: orderData.shippingCity,
        shipping_postal_code: orderData.shippingPostalCode,
        shipping_country: orderData.shippingCountry,
        billing_street: orderData.billingStreet,
        billing_city: orderData.billingCity,
        billing_postal_code: orderData.billingPostalCode,
        billing_country: orderData.billingCountry,
        subtotal_net: orderData.subtotalNet,
        vat_amount: orderData.vatAmount,
        total_gross: orderData.totalGross,
        notes: orderData.notes,
        status: "pending",
      })
      .select()
      .single()

    if (orderError) {
      console.error("[v0] Error creating order:", orderError)
      return { success: false, error: "Nie udało się utworzyć zamówienia" }
    }

    console.log("[v0] Order created successfully:", order.id)

    // Create order items
    console.log("[v0] Creating order items")
    const orderItems = orderData.cartItems.map((item) => {
      const itemSubtotalNet = item.price * item.sizes.length * item.quantity
      const itemVatAmount = itemSubtotalNet * 0.23
      const itemTotalGross = itemSubtotalNet + itemVatAmount

      return {
        order_id: order.id,
        product_id: item.productId,
        color_id: item.colorId,
        product_name: item.name,
        color_name: item.color,
        sizes_included: item.sizes,
        price_per_unit: item.price,
        quantity: item.quantity,
        subtotal_net: itemSubtotalNet,
        vat_amount: itemVatAmount,
        total_gross: itemTotalGross,
      }
    })

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("[v0] Error creating order items:", itemsError)
      // Try to delete the order if items creation failed
      await supabase.from("orders").delete().eq("id", order.id)
      return { success: false, error: "Nie udało się utworzyć pozycji zamówienia" }
    }

    console.log("[v0] Order items created successfully")

    // Update stock quantities
    console.log("[v0] Updating stock quantities")
    for (const item of orderData.cartItems) {
      const { data: colorData } = await supabase
        .from("product_colors")
        .select("stock_quantity")
        .eq("id", item.colorId)
        .single()

      if (colorData) {
        const newStock = colorData.stock_quantity - item.quantity
        await supabase
          .from("product_colors")
          .update({ stock_quantity: Math.max(0, newStock) })
          .eq("id", item.colorId)
      }
    }

    console.log("[v0] Order completed successfully")
    return { success: true, orderNumber: orderNumberData }
  } catch (error) {
    console.error("[v0] Error submitting order:", error)
    return { success: false, error: "Wystąpił nieoczekiwany błąd" }
  }
}
