export interface SizeWithQuantity {
  size: string
  quantity: number
}

export function parseSizes(sizesData: any): SizeWithQuantity[] {
  if (!sizesData) return []

  // If it's a string, try to parse it as JSON
  if (typeof sizesData === "string") {
    try {
      const parsed = JSON.parse(sizesData)
      if (Array.isArray(parsed)) {
        return parsed.map((item) => {
          if (typeof item === "object" && item !== null && "size" in item && "quantity" in item) {
            return { size: item.size, quantity: item.quantity }
          }
          // Old format: just size names
          return { size: String(item), quantity: 1 }
        })
      }
    } catch {
      // If parsing fails, treat as single size
      return [{ size: sizesData, quantity: 1 }]
    }
  }

  // If it's already an array
  if (Array.isArray(sizesData)) {
    return sizesData.map((item) => {
      if (typeof item === "object" && item !== null && "size" in item && "quantity" in item) {
        return { size: item.size, quantity: item.quantity }
      }
      // Old format: just size names
      return { size: String(item), quantity: 1 }
    })
  }

  return []
}

export function formatSizeDisplay(sizeData: SizeWithQuantity): string {
  if (sizeData.quantity > 1) {
    return `${sizeData.quantity}× ${sizeData.size}`
  }
  return sizeData.size
}
