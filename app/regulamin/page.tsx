import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { createClient } from "@/lib/supabase/server"
import { FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Regulamin Sklepu - DiRENBER | Warunki Sprzedaży Hurtowej",
  description:
    "Regulamin sklepu DiRENBER - warunki sprzedaży hurtowej odzieży damskiej. Minimum zamówienie 300 PLN, dostawa 2-3 dni, płatność przelewem. DIRENBER Sp. z o.o.",
  keywords: [
    "regulamin",
    "warunki sprzedaży",
    "DiRENBER regulamin",
    "hurtownia odzieży regulamin",
    "sprzedaż hurtowa warunki",
  ],
  alternates: {
    canonical: "https://direnber.eu/regulamin",
  },
}

export default async function TermsPage() {
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
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Regulamin</h1>
            <p className="text-lg opacity-90">Warunki korzystania ze sklepu DiRENBER</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">§1 Postanowienia ogólne</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego DiRENBER dostępnego pod
                adresem direnber.eu.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Właścicielem sklepu jest DIRENBER Sp. z o.o. z siedzibą w Przybyszowie 52, 67-410 Sława.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. Sklep prowadzi sprzedaż hurtową odzieży damskiej dla przedsiębiorców prowadzących działalność
                gospodarczą.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§2 Warunki sprzedaży</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Minimalna wartość zamówienia wynosi 300 PLN brutto.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Wszystkie ceny podane w sklepie są cenami netto, do których doliczany jest podatek VAT w wysokości
                23%.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                3. Produkty sprzedawane są w asortymentach zawierających wszystkie dostępne rozmiary.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                4. Dostępność produktów jest aktualizowana na bieżąco. W przypadku braku towaru, Klient zostanie
                poinformowany o tym fakcie.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§3 Składanie zamówień</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Zamówienia można składać przez formularz zamówienia dostępny na stronie internetowej.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Do złożenia zamówienia konieczne jest podanie danych kontaktowych oraz adresu dostawy.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                3. Po złożeniu zamówienia Klient otrzymuje potwierdzenie na podany adres email.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                4. Zamówienie zostaje przyjęte do realizacji po potwierdzeniu przez pracownika DiRENBER.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§4 Płatności</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Płatność za zamówienie następuje przelewem bankowym na podstawie faktury VAT.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Faktura VAT zostanie wystawiona i przesłana na adres email podany w zamówieniu.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. Termin płatności wynosi 14 dni od daty wystawienia faktury, chyba że strony ustalą inaczej.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§5 Dostawa</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Czas realizacji zamówienia wynosi 2-3 dni robocze od momentu potwierdzenia zamówienia.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Dostawa odbywa się za pośrednictwem firm kurierskich na terenie Polski.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                3. Koszt dostawy ustalany jest indywidualnie w zależności od wartości i wagi zamówienia.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                4. Klient zobowiązany jest do sprawdzenia przesyłki w obecności kuriera. W przypadku uszkodzenia należy
                sporządzić protokół szkody.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§6 Prawo odstąpienia od umowy</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Zgodnie z art. 38 pkt 4 ustawy o prawach konsumenta, prawo odstąpienia od umowy nie przysługuje w
                przypadku umów zawieranych w ramach działalności gospodarczej.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                2. W szczególnych przypadkach możliwy jest zwrot towaru po wcześniejszym uzgodnieniu z DiRENBER.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§7 Reklamacje</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. DiRENBER odpowiada za wady fizyczne i prawne towaru zgodnie z przepisami Kodeksu Cywilnego.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Reklamacje należy zgłaszać na adres email: direnber@wp.pl lub telefonicznie: 535 204 804.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                3. Reklamacja powinna zawierać: numer zamówienia, opis wady, zdjęcia produktu oraz oczekiwania Klienta.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                4. DiRENBER rozpatruje reklamacje w terminie 14 dni roboczych od daty otrzymania zgłoszenia.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                5. W przypadku uznania reklamacji, DiRENBER wymieni towar na wolny od wad lub zwróci równowartość
                zapłaconej ceny.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§8 Ochrona danych osobowych</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Administratorem danych osobowych jest DIRENBER Sp. z o.o.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Dane osobowe przetwarzane są w celu realizacji zamówień oraz kontaktu z Klientem.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. Szczegółowe informacje dotyczące przetwarzania danych osobowych znajdują się w{" "}
                <a href="/polityka-prywatnosci" className="text-[#8B1538] hover:underline">
                  Polityce Prywatności
                </a>
                .
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§9 Postanowienia końcowe</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. DiRENBER zastrzega sobie prawo do zmiany Regulaminu. Zmiany wchodzą w życie z chwilą opublikowania na
                stronie internetowej.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                3. Wszelkie spory będą rozstrzygane przez sąd właściwy dla siedziby DiRENBER.
              </p>

              <div className="mt-12 p-6 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Data ostatniej aktualizacji:</strong> 10 października 2025
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Kontakt:</strong> direnber@wp.pl | 535 204 804
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
