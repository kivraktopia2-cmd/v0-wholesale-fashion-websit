import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { ContactForm } from "@/components/storefront/contact-form"
import { createClient } from "@/lib/supabase/server"
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt - DIRENBER Sp. z o.o. | Hurtownia Odzieży Damskiej",
  description:
    "Skontaktuj się z DIRENBER - hurtownia odzieży damskiej. Email: direnber@wp.pl, Tel: 535 204 804. Adres: Przybyszów 52, 67-410 Sława. Sprzedaż hurtowa odzieży damskiej w Polsce.",
  keywords: [
    "direnber kontakt",
    "DiRENBER",
    "kontakt hurtownia odzieży",
    "DIRENBER Sp. z o.o.",
    "Sława",
    "Przybyszów 52",
    "hurtownia odzieży damskiej kontakt",
  ],
  openGraph: {
    title: "Kontakt - DIRENBER | Hurtownia Odzieży Damskiej",
    description: "Skontaktuj się z nami: direnber@wp.pl, tel: 535 204 804. Przybyszów 52, 67-410 Sława.",
    url: "https://direnber.eu/kontakt",
    type: "website",
  },
  alternates: {
    canonical: "https://direnber.eu/kontakt",
  },
}

export default async function ContactPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from("categories").select("*").order("display_order")

  return (
    <div className="min-h-screen bg-white">
      <StorefrontHeader categories={categories || []} />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#8B1538] to-[#6B1028] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Skontaktuj się z Nami</h1>
            <p className="text-lg md:text-xl opacity-90 text-balance leading-relaxed max-w-2xl mx-auto">
              Masz pytania? Chcesz nawiązać współpracę? Jesteśmy tutaj, aby Ci pomóc. Skontaktuj się z nami już dziś.
            </p>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Wyślij Wiadomość</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Wypełnij formularz poniżej, a nasz zespół skontaktuje się z Tobą w ciągu 24 godzin.
                </p>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Informacje Kontaktowe</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Możesz również skontaktować się z nami bezpośrednio za pomocą poniższych danych kontaktowych.
                </p>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#8B1538]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:direnber@wp.pl"
                        className="text-muted-foreground hover:text-[#8B1538] transition-colors"
                      >
                        direnber@wp.pl
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#8B1538]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telefon</h3>
                      <a
                        href="tel:+48535204804"
                        className="text-muted-foreground hover:text-[#8B1538] transition-colors"
                      >
                        535 204 804
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-12 h-12 bg-[#25D366]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-[#25D366]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <a
                        href="https://wa.me/48535204804"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-[#25D366] transition-colors"
                      >
                        535 204 804
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#8B1538]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Adres</h3>
                      <p className="text-muted-foreground">
                        DIRENBER Sp. z o.o.
                        <br />
                        67-410 Sława, Przybyszów 52
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#8B1538]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Godziny Pracy</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Poniedziałek - Piątek: 9:00 - 18:00</p>
                        <p>Sobota: 10:00 - 14:00</p>
                        <p>Niedziela: Zamknięte</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map or Additional Info Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl font-bold mb-6">Dlaczego Warto z Nami Współpracować?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="bg-card p-6 rounded-lg border">
                <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-[#8B1538]" />
                </div>
                <h3 className="font-semibold mb-2">Szybka Odpowiedź</h3>
                <p className="text-sm text-muted-foreground">Odpowiadamy na wszystkie zapytania w ciągu 24 godzin</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-[#8B1538]" />
                </div>
                <h3 className="font-semibold mb-2">Wsparcie Eksperckie</h3>
                <p className="text-sm text-muted-foreground">Nasz zespół pomoże Ci w każdej kwestii</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-[#8B1538]" />
                </div>
                <h3 className="font-semibold mb-2">Dostępność</h3>
                <p className="text-sm text-muted-foreground">Jesteśmy dostępni przez telefon, email i formularz</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StorefrontFooter />
    </div>
  )
}
