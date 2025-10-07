import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { createClient } from "@/lib/supabase/server"
import { AlertCircle, Mail, Phone, Clock, CheckCircle } from "lucide-react"

export default async function ComplaintsPage() {
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
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Zwroty i Reklamacje</h1>
            <p className="text-lg opacity-90">Polityka zwrotów i procedura składania reklamacji</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">§1 Postanowienia ogólne</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Niniejsza polityka określa zasady zwrotów towarów oraz procedurę składania i rozpatrywania reklamacji
                w sklepie internetowym DiRENBER.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. DiRENBER zobowiązuje się do zapewnienia najwyższej jakości produktów i obsługi klienta.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. W przypadku jakichkolwiek problemów z zamówieniem, prosimy o kontakt z naszym zespołem.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§2 Prawo odstąpienia od umowy</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Zgodnie z art. 38 pkt 4 ustawy o prawach konsumenta, prawo odstąpienia od umowy nie przysługuje w
                przypadku umów zawieranych w ramach działalności gospodarczej.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Sklep DiRENBER prowadzi sprzedaż hurtową wyłącznie dla przedsiębiorców (B2B), dlatego standardowe
                prawo odstąpienia od umowy nie ma zastosowania.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. W wyjątkowych sytuacjach możliwy jest zwrot towaru po wcześniejszym uzgodnieniu warunków z DiRENBER.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§3 Warunki zwrotu towaru</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Zwrot towaru możliwy jest wyłącznie po wcześniejszym uzgodnieniu z działem obsługi klienta DiRENBER.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Towar podlegający zwrotowi musi spełniać następujące warunki:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Nie był używany ani noszony</li>
                <li>Posiada oryginalne metki i opakowanie</li>
                <li>Jest w stanie nienaruszonym</li>
                <li>Zwrot następuje w ciągu 7 dni od daty otrzymania przesyłki</li>
              </ul>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. Koszty zwrotu towaru ponosi Klient, chyba że zwrot wynika z wady produktu lub błędu DiRENBER.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§4 Podstawy reklamacji</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. DiRENBER odpowiada za wady fizyczne i prawne towaru zgodnie z przepisami Kodeksu Cywilnego.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Reklamacja może zostać złożona w przypadku:
              </p>
              <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
                <li>Wady produkcyjnej (uszkodzenie, defekt materiału, błąd szycia)</li>
                <li>Niezgodności towaru z zamówieniem (inny kolor, rozmiar, model)</li>
                <li>Uszkodzenia mechanicznego powstałego podczas transportu</li>
                <li>Braków w przesyłce (brakujące produkty)</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">§5 Procedura składania reklamacji</h2>

              <div className="bg-muted/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[#8B1538]" />
                  Krok 1: Zgłoszenie reklamacji
                </h3>
                <p className="text-muted-foreground mb-4">
                  Skontaktuj się z nami w ciągu 7 dni od otrzymania przesyłki poprzez:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    Email:{" "}
                    <a href="mailto:direnber@wp.pl" className="text-[#8B1538] hover:underline">
                      direnber@wp.pl
                    </a>
                  </li>
                  <li>
                    Telefon:{" "}
                    <a href="tel:+48535204804" className="text-[#8B1538] hover:underline">
                      535 204 804
                    </a>
                  </li>
                  <li>
                    WhatsApp:{" "}
                    <a
                      href="https://wa.me/48535204804"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B1538] hover:underline"
                    >
                      535 204 804
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[#8B1538]" />
                  Krok 2: Przygotowanie dokumentacji
                </h3>
                <p className="text-muted-foreground mb-4">Zgłoszenie reklamacyjne powinno zawierać:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Numer zamówienia</li>
                  <li>Datę zakupu</li>
                  <li>Szczegółowy opis wady lub problemu</li>
                  <li>Zdjęcia produktu pokazujące wadę (minimum 2-3 zdjęcia)</li>
                  <li>Oczekiwania Klienta (wymiana, naprawa, zwrot pieniędzy)</li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[#8B1538]" />
                  Krok 3: Rozpatrzenie reklamacji
                </h3>
                <p className="text-muted-foreground mb-4">
                  DiRENBER rozpatruje reklamację w terminie 14 dni roboczych od daty otrzymania zgłoszenia wraz z
                  wymaganą dokumentacją.
                </p>
                <p className="text-muted-foreground">
                  Klient zostanie poinformowany o decyzji drogą mailową lub telefoniczną.
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[#8B1538]" />
                  Krok 4: Realizacja reklamacji
                </h3>
                <p className="text-muted-foreground mb-4">W przypadku uznania reklamacji, DiRENBER:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Wymieni towar na wolny od wad</li>
                  <li>Zwróci równowartość zapłaconej ceny</li>
                  <li>Udzieli stosownego obniżenia ceny (w uzgodnieniu z Klientem)</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8">§6 Terminy rozpatrzenia reklamacji</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. DiRENBER rozpatruje reklamacje w terminie 14 dni roboczych od daty otrzymania kompletnego zgłoszenia.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. W przypadku konieczności dodatkowych ustaleń lub ekspertyzy, termin może zostać wydłużony, o czym
                Klient zostanie poinformowany.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. Brak odpowiedzi w terminie 14 dni oznacza uznanie reklamacji.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§7 Koszty reklamacji</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. W przypadku uznania reklamacji, wszystkie koszty związane z jej realizacją ponosi DiRENBER.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Koszty odesłania wadliwego towaru zostaną zwrócone Klientowi po uznaniu reklamacji.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. W przypadku odrzucenia reklamacji, koszty transportu ponosi Klient.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§8 Pozasądowe sposoby rozpatrywania reklamacji</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Klient ma prawo skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Szczegółowe informacje dostępne są na stronie Urzędu Ochrony Konkurencji i Konsumentów:{" "}
                <a
                  href="https://www.uokik.gov.pl"
                  className="text-[#8B1538] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.uokik.gov.pl
                </a>
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. Klient może również skorzystać z platformy ODR dostępnej pod adresem:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  className="text-[#8B1538] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  ec.europa.eu/consumers/odr
                </a>
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§9 Kontakt w sprawie reklamacji</h2>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-card p-6 rounded-lg border text-center">
                  <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-[#8B1538]" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a href="mailto:direnber@wp.pl" className="text-sm text-[#8B1538] hover:underline">
                    direnber@wp.pl
                  </a>
                </div>

                <div className="bg-card p-6 rounded-lg border text-center">
                  <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-[#8B1538]" />
                  </div>
                  <h3 className="font-semibold mb-2">Telefon</h3>
                  <a href="tel:+48535204804" className="text-sm text-[#8B1538] hover:underline">
                    535 204 804
                  </a>
                </div>

                <div className="bg-card p-6 rounded-lg border text-center">
                  <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-[#8B1538]" />
                  </div>
                  <h3 className="font-semibold mb-2">Godziny</h3>
                  <p className="text-sm text-muted-foreground">Pn-Pt: 9:00-18:00</p>
                </div>
              </div>

              <div className="mt-12 p-6 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Data ostatniej aktualizacji:</strong> 10 października 2025
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Kontakt:</strong> direnber@wp.pl | 535 204 804
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Adres:</strong> DIRENBER Sp. z o.o., 67-410 Sława, Przybyszów 52
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
