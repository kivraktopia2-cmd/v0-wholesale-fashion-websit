import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { createClient } from "@/lib/supabase/server"
import { Shield } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Polityka Prywatności - DiRENBER | Ochrona Danych Osobowych RODO",
  description:
    "Polityka prywatności DiRENBER - zasady przetwarzania danych osobowych zgodnie z RODO. DIRENBER Sp. z o.o. Administrator danych. Bezpieczna hurtownia odzieży damskiej.",
  keywords: ["polityka prywatności", "RODO", "ochrona danych osobowych", "DiRENBER", "prywatność"],
  alternates: {
    canonical: "https://direnber.eu/polityka-prywatnosci",
  },
}

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
            <p className="text-lg opacity-90">Ochrona Twoich danych osobowych zgodnie z RODO</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">§1 POSTANOWIENIA OGÓLNE</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Polityka prywatności zawiera zasady dotyczące przetwarzania danych osobowych przez Sklep, w tym
                podstawy, cele i zakres przetwarzania danych osobowych oraz prawa osób, których dane dotyczą, a także
                informacje w zakresie stosowania plików cookies oraz narzędzi analitycznych.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Administratorem danych osobowych zbieranych za pośrednictwem Sklepu Internetowego jest DIRENBER Sp. z
                o.o. z siedzibą przy ul. Przybyszów 52, 67-410 Sława, NIP: [NIP], REGON: [REGON], KRS: [KRS], Telefon:
                535 204 804, E-mail: direnber@wp.pl, zwana dalej „Administratorem".
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                3. Dane osobowe w Sklepie Internetowym przetwarzane są przez Administratora zgodnie z obowiązującymi
                przepisami prawa, w szczególności zgodnie z rozporządzeniem Parlamentu Europejskiego i Rady (UE)
                2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
                osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne
                rozporządzenie o ochronie danych) - zwane dalej „RODO".
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                4. Korzystanie ze Sklepu Internetowego, w tym dokonywanie zakupów jest dobrowolne. Podobnie związane z
                tym podanie danych osobowych przez korzystającego ze Sklepu Internetowego Klienta jest dobrowolne, z
                wyjątkiem:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>
                  <strong>zawierania umów</strong> - niepodanie w przypadkach i w zakresie wskazanym na stronie Sklepu
                  Internetowego oraz w Regulaminie Sklepu Internetowego i niniejszej polityce prywatności danych
                  osobowych niezbędnych do zawarcia i wykonania Umowy Sprzedaży skutkuje brakiem możliwości zawarcia
                  tejże umowy. Podanie danych osobowych jest w takim wypadku wymogiem umownym.
                </li>
                <li>
                  <strong>obowiązków ustawowych</strong> - podanie danych osobowych jest wymogiem ustawowym wynikającym
                  z powszechnie obowiązujących przepisów prawa nakładających na Administratora obowiązek przetwarzania
                  danych osobowych (np. przetwarzanie danych w celu prowadzenia ksiąg podatkowych lub rachunkowych).
                </li>
              </ul>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                5. Administrator dokłada szczególnej staranności w celu ochrony interesów osób, których przetwarzane
                przez niego dane osobowe dotyczą, a w szczególności jest odpowiedzialny i zapewnia, że zbierane przez
                niego dane są przetwarzane zgodnie z prawem, zbierane dla oznaczonych, zgodnych z prawem celów,
                merytorycznie poprawne i adekwatne w stosunku do celów przetwarzania oraz przechowywane w sposób
                zapewniający odpowiednie bezpieczeństwo.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§2 PODSTAWY PRZETWARZANIA DANYCH</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Administrator uprawniony jest do przetwarzania danych osobowych w przypadkach, gdy spełniony jest co
                najmniej jeden z poniższych warunków:
              </p>
              <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
                <li>
                  osoba, której dane dotyczą wyraziła zgodę na przetwarzanie swoich danych osobowych w jednym lub
                  większej liczbie określonych celów (art. 6 ust. 1 lit. a) RODO);
                </li>
                <li>
                  przetwarzanie jest niezbędne do wykonania umowy, której stroną jest osoba, której dane dotyczą, lub do
                  podjęcia działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy (art. 6 ust. 1 lit. b)
                  RODO);
                </li>
                <li>
                  przetwarzanie jest niezbędne do wypełnienia obowiązku prawnego ciążącego na Administratorze (art. 6
                  ust. 1 lit. c) RODO);
                </li>
                <li>
                  przetwarzanie jest niezbędne do celów wynikających z prawnie uzasadnionych interesów realizowanych
                  przez Administratora lub przez stronę trzecią (art. 6 ust. 1 lit. f) RODO).
                </li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">§3 CEL, PODSTAWA, OKRES I ZAKRES PRZETWARZANIA DANYCH</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">1. Realizacja zamówień</h3>
              <div className="bg-muted/30 rounded-lg p-6 mb-6">
                <p className="mb-2 text-muted-foreground">
                  <strong>Cel:</strong> Realizacja umowy sprzedaży, wysyłka produktów, kontakt w sprawie zamówienia
                </p>
                <p className="mb-2 text-muted-foreground">
                  <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. b) RODO (wykonanie umowy)
                </p>
                <p className="mb-2 text-muted-foreground">
                  <strong>Okres przechowywania:</strong> Przez czas trwania umowy oraz przez okres przedawnienia
                  roszczeń (6 lat)
                </p>
                <p className="text-muted-foreground">
                  <strong>Zakres danych:</strong> Imię, nazwisko, adres email, numer telefonu, adres dostawy, nazwa
                  firmy, NIP (opcjonalnie)
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-6">2. Wystawienie faktury VAT</h3>
              <div className="bg-muted/30 rounded-lg p-6 mb-6">
                <p className="mb-2 text-muted-foreground">
                  <strong>Cel:</strong> Wystawienie faktury VAT, prowadzenie księgowości
                </p>
                <p className="mb-2 text-muted-foreground">
                  <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. c) RODO (obowiązek prawny)
                </p>
                <p className="mb-2 text-muted-foreground">
                  <strong>Okres przechowywania:</strong> 5 lat od końca roku podatkowego (zgodnie z ustawą o
                  rachunkowości)
                </p>
                <p className="text-muted-foreground">
                  <strong>Zakres danych:</strong> Imię, nazwisko/nazwa firmy, adres, NIP
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-6">3. Marketing bezpośredni</h3>
              <div className="bg-muted/30 rounded-lg p-6 mb-6">
                <p className="mb-2 text-muted-foreground">
                  <strong>Cel:</strong> Wysyłka informacji handlowych, newsletter
                </p>
                <p className="mb-2 text-muted-foreground">
                  <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes) lub zgoda
                  (art. 6 ust. 1 lit. a) RODO)
                </p>
                <p className="mb-2 text-muted-foreground">
                  <strong>Okres przechowywania:</strong> Do momentu wycofania zgody lub wniesienia sprzeciwu
                </p>
                <p className="text-muted-foreground">
                  <strong>Zakres danych:</strong> Adres email, imię
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-6">4. Rozpatrywanie reklamacji i zwrotów</h3>
              <div className="bg-muted/30 rounded-lg p-6 mb-6">
                <p className="mb-2 text-muted-foreground">
                  <strong>Cel:</strong> Rozpatrzenie reklamacji, realizacja zwrotów
                </p>
                <p className="mb-2 text-muted-foreground">
                  <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. c) RODO (obowiązek prawny)
                </p>
                <p className="mb-2 text-muted-foreground">
                  <strong>Okres przechowywania:</strong> Przez okres przedawnienia roszczeń (6 lat)
                </p>
                <p className="text-muted-foreground">
                  <strong>Zakres danych:</strong> Dane kontaktowe, dane zamówienia
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8">§4 ODBIORCY DANYCH OSOBOWYCH</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Dane osobowe mogą być przekazywane następującym kategoriom odbiorców:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>
                  <strong>Firmy kurierskie i spedycyjne</strong> - w zakresie niezbędnym do realizacji dostawy
                  zamówionych produktów
                </li>
                <li>
                  <strong>Dostawcy usług IT</strong> - w zakresie niezbędnym do utrzymania infrastruktury technicznej
                  (hosting, poczta elektroniczna)
                </li>
                <li>
                  <strong>Biuro rachunkowe</strong> - w zakresie niezbędnym do prowadzenia księgowości i rozliczeń
                  podatkowych
                </li>
                <li>
                  <strong>Dostawcy usług płatniczych</strong> - w zakresie niezbędnym do obsługi płatności
                </li>
                <li>
                  <strong>Organy państwowe</strong> - w przypadkach przewidzianych przepisami prawa (np. organy
                  podatkowe, organy ścigania)
                </li>
              </ul>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                2. Administrator nie przekazuje danych osobowych do państw trzecich (poza Europejski Obszar
                Gospodarczy).
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§5 PRAWA OSÓB, KTÓRYCH DANE DOTYCZĄ</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Każda osoba, której dane są przetwarzane przez Administratora, ma następujące prawa:
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Prawo dostępu do danych (art. 15 RODO)</h4>
                  <p className="text-sm text-muted-foreground">
                    Prawo do uzyskania informacji o przetwarzanych danych osobowych oraz otrzymania kopii tych danych.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Prawo do sprostowania danych (art. 16 RODO)</h4>
                  <p className="text-sm text-muted-foreground">
                    Prawo do żądania poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych osobowych.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Prawo do usunięcia danych (art. 17 RODO)</h4>
                  <p className="text-sm text-muted-foreground">
                    Prawo do żądania usunięcia danych osobowych („prawo do bycia zapomnianym"), jeżeli nie istnieją
                    nadrzędne prawnie uzasadnione podstawy przetwarzania.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Prawo do ograniczenia przetwarzania (art. 18 RODO)</h4>
                  <p className="text-sm text-muted-foreground">
                    Prawo do żądania ograniczenia przetwarzania danych osobowych w określonych sytuacjach.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Prawo do przenoszenia danych (art. 20 RODO)</h4>
                  <p className="text-sm text-muted-foreground">
                    Prawo do otrzymania danych osobowych w ustrukturyzowanym, powszechnie używanym formacie oraz prawo
                    do przesłania tych danych innemu administratorowi.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Prawo do sprzeciwu (art. 21 RODO)</h4>
                  <p className="text-sm text-muted-foreground">
                    Prawo do wniesienia sprzeciwu wobec przetwarzania danych osobowych, w szczególności w celach
                    marketingowych.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Prawo do cofnięcia zgody (art. 7 ust. 3 RODO)</h4>
                  <p className="text-sm text-muted-foreground">
                    Prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego
                    dokonano przed cofnięciem zgody.
                  </p>
                </div>
              </div>

              <p className="mb-6 text-muted-foreground leading-relaxed">
                W celu realizacji powyższych praw należy skontaktować się z Administratorem pod adresem email:
                direnber@wp.pl lub telefonicznie: 535 204 804.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§6 PRAWO DO WNIESIENIA SKARGI</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Osobie, której dane dotyczą, przysługuje prawo wniesienia skargi do organu nadzorczego zajmującego
                się ochroną danych osobowych.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                2. W Polsce organem nadzorczym jest Prezes Urzędu Ochrony Danych Osobowych z siedzibą przy ul. Stawki 2,
                00-193 Warszawa.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§7 PLIKI COOKIES</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Strona internetowa wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania serwisu,
                dostosowania treści do preferencji użytkownika oraz analizy ruchu.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                2. Szczegółowe informacje dotyczące plików cookies, w tym sposób ich wyłączenia, znajdują się w{" "}
                <a href="/polityka-cookies" className="text-[#8B1538] hover:underline font-semibold">
                  Polityce Cookies
                </a>
                .
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§8 BEZPIECZEŃSTWO DANYCH</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające ochronę danych
                osobowych odpowiednią do zagrożeń oraz kategorii danych objętych ochroną, a w szczególności zabezpiecza
                dane przed ich udostępnieniem osobom nieupoważnionym, zabraniem przez osobę nieuprawnioną,
                przetwarzaniem z naruszeniem obowiązujących przepisów oraz zmianą, utratą, uszkodzeniem lub
                zniszczeniem.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Administrator zapewnia w szczególności, że:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Dane przesyłane przez formularz zamówienia są szyfrowane za pomocą protokołu SSL/TLS</li>
                <li>Dostęp do danych osobowych mają wyłącznie upoważnione osoby zobowiązane do zachowania poufności</li>
                <li>Stosowane są regularne kopie zapasowe danych</li>
                <li>Infrastruktura IT jest chroniona przed nieautoryzowanym dostępem</li>
                <li>Przeprowadzane są regularne audyty bezpieczeństwa</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">§9 ZMIANY POLITYKI PRYWATNOŚCI</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                1. Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności, co może wynikać ze
                zmiany przepisów prawa, rozwoju technologii lub zmiany zakresu świadczonych usług.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                2. O wszelkich zmianach Użytkownicy zostaną poinformowani poprzez komunikat na stronie internetowej.
                Aktualna wersja Polityki Prywatności jest zawsze dostępna na stronie internetowej.
              </p>

              <div className="mt-12 p-6 bg-gradient-to-br from-[#8B1538]/5 to-[#6B1028]/5 rounded-lg border border-[#8B1538]/20">
                <h3 className="font-bold text-lg mb-4">Dane kontaktowe Administratora</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Nazwa:</strong> DIRENBER Sp. z o.o.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Adres:</strong> Przybyszów 52, 67-410 Sława, Polska
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Email:</strong> direnber@wp.pl
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Telefon:</strong> 535 204 804
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Data ostatniej aktualizacji:</strong> 10 października 2025
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
