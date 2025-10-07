import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Heart, Sparkles, Users, Zap } from "lucide-react"
import { StorefrontHeader } from "@/components/storefront/storefront-header"
import { StorefrontFooter } from "@/components/storefront/storefront-footer"
import { createClient } from "@/lib/supabase/server"

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from("categories").select("*").order("display_order")

  return (
    <div className="min-h-screen bg-white">
      <StorefrontHeader categories={categories || []} />

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-0g2ofTlg4CqVCJ1nz7Tek91t148ACx.png"
            alt="Direnber Fashion"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">O Direnber Sp. z o.o.</h1>
            <p className="text-lg md:text-xl mb-8 text-balance leading-relaxed">
              Wysokiej jakości, stylowa i przystępna cenowo moda od zaufanego polskiego i europejskiego producenta
            </p>
            <Button asChild size="lg" className="bg-[#8B1538] hover:bg-[#6B1028] text-white">
              <Link href="/produkty">Odkryj Nasze Kolekcje</Link>
            </Button>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Nasza Historia</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    W Direnber Sp. z o.o. jesteśmy czymś więcej niż tylko dostawcą odzieży; jesteśmy bezpośrednim
                    producentem i niezawodnym partnerem dla butików i sprzedawców detalicznych w Polsce i całej Europie.
                  </p>
                  <p>
                    Założona z wizją wprowadzenia na rynek wysokiej jakości, stylowych i przystępnych cenowo produktów
                    modowych, nasza firma łączy turecką wiedzę tekstylną z podejściem skoncentrowanym na kliencie.
                  </p>
                  <p>
                    W przeciwieństwie do pośredników, zarządzamy całym procesem produkcyjnym od projektu do produkcji,
                    zapewniając, że każdy element spełnia najwyższe standardy rzemiosła i jakości.
                  </p>
                  <p>
                    Ten bezpośredni model produkcji pozwala nam oferować konkurencyjne ceny, szybkie terminy dostaw i
                    elastyczność w dostosowywaniu się do unikalnych potrzeb naszych klientów.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-06%20at%2016.11.53-OPHwO39yjl67p4Ih5jy0ekgWbzWVGc.jpeg"
                  alt="Direnber Fashion Style"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-card p-8 rounded-lg border">
                <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-[#8B1538]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nasza Misja</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Direnber zobowiązuje się do dostarczania wysokiej jakości, stylowych i przystępnych cenowo produktów
                  modowych naszym partnerom w całej Europie, oferując prosty i wydajny model produkcji, który buduje
                  zaufanie i sukces.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg border">
                <div className="w-12 h-12 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-[#8B1538]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nasza Wizja</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dzięki solidnym fundamentom opartym na zaufaniu, jakości i innowacjach, Direnber nadal rozwija się
                  jako wiodąca marka modowa pochodzenia tureckiego w Polsce i zobowiązuje się wspierać sukces naszych
                  partnerów na każdym kroku.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Nasze Wartości</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8B1538]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#8B1538]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Zaufanie</h3>
                <p className="text-muted-foreground text-sm">Budowanie silnych i niezawodnych partnerstw</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8B1538]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-[#8B1538]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Jakość</h3>
                <p className="text-muted-foreground text-sm">Rzemiosło i dbałość o szczegóły w każdym elemencie</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8B1538]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-[#8B1538]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innowacja</h3>
                <p className="text-muted-foreground text-sm">
                  Dostosowywanie się do rynku i unikalnych potrzeb klientów
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8B1538]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#8B1538]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Klient w Centrum</h3>
                <p className="text-muted-foreground text-sm">Dostarczanie spersonalizowanych rozwiązań dla partnerów</p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Solutions */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden order-2 md:order-1">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-Yy6cO76eKY9Tm3cElJTWTnHPoAlDgz.png"
                  alt="Direnber Strategic Fashion"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                  Rozwiązania Szyte na Miarę dla Twojego Biznesu
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Oferujemy usługi produkcji na zamówienie i pod marką własną, ściśle współpracując z butikami i
                    sprzedawcami detalicznymi w celu tworzenia unikalnych kolekcji.
                  </p>
                  <p>
                    Nasz zespół projektantów i producentów pracuje z Tobą na każdym etapie - od koncepcji po realizację
                    - aby stworzyć produkty, które idealnie pasują do Twojej marki i wizji.
                  </p>
                  <p>
                    Dzięki elastycznym minimalnym zamówieniom i szybkim czasom realizacji, możemy wspierać zarówno małe
                    butiki, jak i większych sprzedawców detalicznych w rozwijaniu ich unikalnej oferty produktowej.
                  </p>
                </div>
                <Button asChild size="lg" className="mt-6 bg-[#8B1538] hover:bg-[#6B1028]">
                  <Link href="/kontakt">Skontaktuj się z Nami</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-[#8B1538] text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Gotowy na Współpracę?</h2>
            <p className="text-lg mb-8 text-balance leading-relaxed opacity-90">
              Dołącz do setek zadowolonych partnerów w całej Europie. Skontaktuj się z nami już dziś, aby dowiedzieć się
              więcej o naszych produktach i usługach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/produkty">Przeglądaj Produkty</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link href="/kontakt">Skontaktuj się</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <StorefrontFooter />
    </div>
  )
}
