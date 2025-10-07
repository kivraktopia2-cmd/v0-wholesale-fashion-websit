import Link from "next/link"
import { MessageCircle } from "lucide-react"

export function StorefrontFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#8B1538" }}>
              DiRENBER
            </h2>
            <p className="text-gray-400">Passion & Fashion</p>
            <p className="text-gray-400 text-sm mt-2">Hurtownia odzieży damskiej najwyższej jakości</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Nawigacja</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Strona Główna
                </Link>
              </li>
              <li>
                <Link href="/produkty" className="text-gray-400 hover:text-white transition-colors">
                  Wszystkie Produkty
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="text-gray-400 hover:text-white transition-colors">
                  O Nas
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/koszyk" className="text-gray-400 hover:text-white transition-colors">
                  Koszyk
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: direnber@wp.pl</li>
              <li className="text-gray-400">Tel: 535 204 804</li>
              <li>
                <a
                  href="https://wa.me/48535204804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li className="text-gray-400 text-sm mt-4">
                DIRENBER Sp. z o.o.
                <br />
                67-410 Sława, Przybyszów 52
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">&copy; 2025 DiRENBER. Wszelkie prawa zastrzeżone.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/polityka-prywatnosci" className="text-gray-400 hover:text-white transition-colors">
                Polityka Prywatności
              </Link>
              <Link href="/regulamin" className="text-gray-400 hover:text-white transition-colors">
                Regulamin
              </Link>
              <Link href="/polityka-cookies" className="text-gray-400 hover:text-white transition-colors">
                Polityka Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
