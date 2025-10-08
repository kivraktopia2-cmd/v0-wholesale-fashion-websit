import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { createClient } from "@/lib/supabase/server"
import { Cookie } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Polityka Cookies - DiRENBER | Informacje o Plikach Cookies",
  description:
    "Polityka cookies DiRENBER - informacje o wykorzystaniu plików cookies w sklepie internetowym. Zarządzanie cookies, rodzaje plików cookies. DIRENBER Sp. z o.o.",
  keywords: ["polityka cookies", "pliki cookies", "ciasteczka", "DiRENBER", "cookies sklep internetowy"],
  alternates: {
    canonical: "https://direnber.eu/polityka-cookies",
  },
}

export default async function CookiePolicyPage() {
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
              <Cookie className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Polityka Cookies</h1>
            <p className="text-lg opacity-90">Informacje o plikach cookies w sklepie DiRENBER</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">§1 Co to są pliki cookies?</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Pliki cookies (ciasteczka) to małe pliki tekstowe zapisywane na urządzeniu użytkownika podczas
                przeglądania stron internetowych.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Cookies zawierają informacje niezbędne do prawidłowego funkcjonowania strony internetowej oraz
                umożliwiają zapamiętanie preferencji użytkownika.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. Pliki cookies nie uszkadzają urządzenia użytkownika ani plików na nim zapisanych.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§2 Rodzaje wykorzystywanych plików cookies</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">Cookies niezbędne (techniczne)</h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Są to pliki cookies konieczne do prawidłowego funkcjonowania strony internetowej. Umożliwiają:
              </p>
              <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
                <li>Zapamiętanie produktów dodanych do koszyka</li>
                <li>Utrzymanie sesji użytkownika</li>
                <li>Zapewnienie bezpieczeństwa podczas korzystania ze strony</li>
                <li>Prawidłowe wyświetlanie treści</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Cookies funkcjonalne</h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Pliki te umożliwiają zapamiętanie wybranych przez użytkownika ustawień i personalizację interfejsu:
              </p>
              <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
                <li>Preferowany język</li>
                <li>Rozmiar czcionki</li>
                <li>Ustawienia wyświetlania strony</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Cookies analityczne</h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Służą do zbierania informacji o sposobie korzystania ze strony internetowej:
              </p>
              <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
                <li>Liczba odwiedzin</li>
                <li>Źródła ruchu</li>
                <li>Czas spędzony na stronie</li>
                <li>Najczęściej odwiedzane podstrony</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">§3 Cel wykorzystania plików cookies</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Strona internetowa DiRENBER wykorzystuje pliki cookies w następujących celach:
              </p>
              <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
                <li>Zapewnienie prawidłowego działania sklepu internetowego</li>
                <li>Zapamiętanie produktów w koszyku zakupowym</li>
                <li>Dostosowanie zawartości strony do preferencji użytkownika</li>
                <li>Prowadzenie statystyk odwiedzin</li>
                <li>Zapewnienie bezpieczeństwa i wykrywanie nadużyć</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">§4 Zarządzanie plikami cookies</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików cookies w swojej przeglądarce
                internetowej.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Większość przeglądarek domyślnie akceptuje pliki cookies. Można zmienić ustawienia tak, aby
                przeglądarka blokowała cookies lub informowała o ich wysyłaniu.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. Instrukcje zarządzania plikami cookies w popularnych przeglądarkach:
              </p>

              <div className="bg-muted/30 rounded-lg p-6 mb-6">
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <strong>Google Chrome:</strong> Menu → Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie i
                    inne dane witryn
                  </li>
                  <li>
                    <strong>Mozilla Firefox:</strong> Menu → Opcje → Prywatność i bezpieczeństwo → Ciasteczka i dane
                    stron
                  </li>
                  <li>
                    <strong>Microsoft Edge:</strong> Menu → Ustawienia → Pliki cookie i uprawnienia witryny
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferencje → Prywatność → Zarządzaj danymi witryn
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8">§5 Konsekwencje wyłączenia plików cookies</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Wyłączenie plików cookies może wpłynąć na funkcjonalność strony internetowej.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. Niektóre funkcje mogą nie działać prawidłowo, w szczególności:
              </p>
              <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
                <li>Koszyk zakupowy może nie zapamiętywać dodanych produktów</li>
                <li>Nie będzie możliwe zapamiętanie preferencji użytkownika</li>
                <li>Proces składania zamówienia może być utrudniony</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8">§6 Pliki cookies podmiotów trzecich</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. Strona internetowa może wykorzystywać pliki cookies pochodzące od podmiotów trzecich, takich jak:
              </p>
              <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
                <li>Dostawcy usług analitycznych (np. Google Analytics)</li>
                <li>Dostawcy usług hostingowych</li>
                <li>Dostawcy systemów płatności</li>
              </ul>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                2. Pliki cookies podmiotów trzecich podlegają polityce prywatności tych podmiotów.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§7 Okres przechowywania plików cookies</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                1. <strong>Cookies sesyjne</strong> - przechowywane są do momentu zamknięcia przeglądarki
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                2. <strong>Cookies trwałe</strong> - przechowywane są przez określony czas (od kilku dni do kilku lat) w
                zależności od ich przeznaczenia
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                3. Użytkownik może w każdej chwili usunąć pliki cookies z poziomu przeglądarki
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§8 Kontakt</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                W przypadku pytań dotyczących Polityki Cookies prosimy o kontakt pod adresem: direnber@wp.pl lub
                telefonicznie: 535 204 804.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8">§9 Zmiany w Polityce Cookies</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Cookies. Aktualna wersja jest
                zawsze dostępna na stronie internetowej.
              </p>

              <div className="mt-12 p-6 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Data ostatniej aktualizacji:</strong> 10 października 2025
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Kontakt:</strong> direnber@wp.pl | 535 204 804
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Administrator:</strong> DIRENBER Sp. z o.o., 67-410 Sława, Przybyszów 52
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
