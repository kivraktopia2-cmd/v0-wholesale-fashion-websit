import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { createClient } from "@/lib/supabase/server"
import { Shield } from "lucide-react"

export default async function PrivacyPolicyPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from("categories").select("*").order("display_order")

  return (
    <div className="min-h-screen bg-white">
      <StorefrontHeader categories={categories || []} />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#8B1538] to-[#6B1028] text-white py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Polityka Prywatności</h1>
            <p className="text-lg opacity-90">Ochrona Twoich danych osobowych</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">§1 Postanowienia ogólne</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych
                przez Użytkowników w związku z korzystaniem ze sklepu internetowego DiRENBER.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Administratorem danych osobowych jest DIRENBER Sp. z o.o. z siedzibą w Przybyszowie 52, 67-410 Sława.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. Kontakt z Administratorem możliwy jest pod adresem email: direnber@wp.pl lub telefonicznie: 535 204
                804.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§2 Podstawa prawna przetwarzania danych</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Dane osobowe przetwarzane są na podstawie:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Art. 6 ust. 1 lit. b) RODO - w celu realizacji umowy sprzedaży</li>
                <li>Art. 6 ust. 1 lit. c) RODO - w celu wypełnienia obowiązków prawnych (np. rachunkowych)</li>
                <li>Art. 6 ust. 1 lit. f) RODO - w celach marketingowych stanowiących prawnie uzasadniony interes</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">§3 Zakres zbieranych danych</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. W ramach składania zamówień zbieramy następujące dane:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Imię i nazwisko</li>
                <li>Adres email</li>
                <li>Numer telefonu</li>
                <li>Adres dostawy i rozliczeniowy</li>
                <li>Nazwa firmy i NIP (opcjonalnie)</li>
              </ul>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                2. Dodatkowo, w ramach korzystania ze strony internetowej, automatycznie zbierane są dane techniczne
                takie jak adres IP, typ przeglądarki, system operacyjny.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§4 Cele przetwarzania danych</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">Dane osobowe przetwarzane są w celu:</p>
              <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
                <li>Realizacji zamówień i świadczenia usług</li>
                <li>Kontaktu z Klientem w sprawach związanych z zamówieniem</li>
                <li>Wystawienia faktury VAT i prowadzenia księgowości</li>
                <li>Rozpatrywania reklamacji i zwrotów</li>
                <li>Prowadzenia działań marketingowych (za zgodą)</li>
                <li>Zapewnienia bezpieczeństwa i przeciwdziałania nadużyciom</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">§5 Okres przechowywania danych</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Dane osobowe przechowywane są przez okres niezbędny do realizacji celów, dla których zostały zebrane:
              </p>
              <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
                <li>
                  Dane związane z realizacją umowy - przez czas trwania umowy oraz przez okres przedawnienia roszczeń
                </li>
                <li>Dane do celów księgowych - przez okres wymagany przepisami prawa (5 lat)</li>
                <li>Dane marketingowe - do momentu wycofania zgody lub wniesienia sprzeciwu</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">§6 Udostępnianie danych osobowych</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Dane osobowe mogą być udostępniane następującym kategoriom odbiorców:
              </p>
              <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
                <li>Firmy kurierskie i spedycyjne - w celu realizacji dostawy</li>
                <li>Dostawcy usług IT - w celu utrzymania infrastruktury technicznej</li>
                <li>Biuro rachunkowe - w celu prowadzenia księgowości</li>
                <li>Organy państwowe - na podstawie przepisów prawa</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">§7 Prawa osób, których dane dotyczą</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Każda osoba, której dane są przetwarzane, ma prawo do:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Dostępu do swoich danych osobowych</li>
                <li>Sprostowania (poprawiania) danych</li>
                <li>Usunięcia danych ("prawo do bycia zapomnianym")</li>
                <li>Ograniczenia przetwarzania danych</li>
                <li>Przenoszenia danych</li>
                <li>Wniesienia sprzeciwu wobec przetwarzania</li>
                <li>Cofnięcia zgody w dowolnym momencie</li>
              </ul>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                W celu realizacji powyższych praw należy skontaktować się z Administratorem pod adresem: direnber@wp.pl
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§8 Prawo do wniesienia skargi</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Osobie, której dane dotyczą, przysługuje prawo wniesienia skargi do organu nadzorczego - Prezesa Urzędu
                Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§9 Pliki cookies</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Strona internetowa wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania serwisu oraz
                analizy ruchu.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                2. Szczegółowe informacje dotyczące plików cookies znajdują się w{" "}
                <a href="/polityka-cookies" className="text-[#8B1538] hover:underline">
                  Polityce Cookies
                </a>
                .
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§10 Bezpieczeństwo danych</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające ochronę danych
                osobowych.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Dane przesyłane przez formularz zamówienia są szyfrowane za pomocą protokołu SSL.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. Dostęp do danych osobowych mają wyłącznie upoważnione osoby zobowiązane do zachowania poufności.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§11 Zmiany Polityki Prywatności</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności. Aktualna wersja
                Polityki jest zawsze dostępna na stronie internetowej.
              </p>

              <div className="mt-12 p-6 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Data ostatniej aktualizacji:</strong> 10 października 2025
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Kontakt w sprawach ochrony danych:</strong> direnber@wp.pl | 535 204 804
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Administrator danych:</strong> DIRENBER Sp. z o.o., 67-410 Sława, Przybyszów 52
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StorefrontFooter />
    </div>
  )
}
