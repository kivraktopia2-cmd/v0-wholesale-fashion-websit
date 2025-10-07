import { Suspense } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Mail, Phone } from "lucide-react"

async function OrderConfirmationContent({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Dziękujemy za zamówienie!</h2>
            <p className="text-gray-600">Twoje zamówienie zostało pomyślnie złożone</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Numer zamówienia</p>
            <p className="text-2xl font-bold text-[#8B1538]">{orderNumber}</p>
          </div>

          <div className="text-left space-y-4 mb-8">
            <h3 className="font-semibold text-lg">Co dalej?</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-[#8B1538] flex-shrink-0 mt-0.5" />
                <span>Otrzymasz potwierdzenie zamówienia na podany adres email</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-[#8B1538] flex-shrink-0 mt-0.5" />
                <span>Nasz zespół skontaktuje się z Tobą w ciągu 24 godzin w celu potwierdzenia szczegółów</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-[#8B1538] flex-shrink-0 mt-0.5" />
                <span>Zamówienie zostanie wysłane w ciągu 2-3 dni roboczych po potwierdzeniu</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link href="/produkty">
              <Button className="w-full" style={{ backgroundColor: "#8B1538" }}>
                Kontynuuj zakupy
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                Wróć do strony głównej
              </Button>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t text-sm text-gray-600">
            <p>
              Masz pytania? Skontaktuj się z nami:
              <br />
              <a href="mailto:kontakt@direnber.pl" className="text-[#8B1538] hover:underline">
                kontakt@direnber.pl
              </a>{" "}
              |{" "}
              <a href="tel:+48123456789" className="text-[#8B1538] hover:underline">
                +48 123 456 789
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { orderNumber?: string }
}) {
  const supabase = await createClient()
  const { data: categories } = await supabase.from("categories").select("*").order("display_order")

  const orderNumber = searchParams.orderNumber || "N/A"

  return (
    <div className="min-h-screen bg-gray-50">
      <StorefrontHeader categories={categories || []} />
      <main className="container mx-auto px-4 py-12">
        <Suspense fallback={<div>Ładowanie...</div>}>
          <OrderConfirmationContent orderNumber={orderNumber} />
        </Suspense>
      </main>
      <StorefrontFooter />
    </div>
  )
}
