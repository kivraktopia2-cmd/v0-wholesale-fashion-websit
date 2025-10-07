"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Menu, X, Search, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Category {
  id: string
  name_pl: string
  slug: string
}

interface StorefrontHeaderProps {
  categories: Category[]
}

export function StorefrontHeader({ categories }: StorefrontHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("direnber_cart") || "[]")
      setCartCount(cart.length)
    }

    updateCartCount()

    window.addEventListener("storage", updateCartCount)
    const interval = setInterval(updateCartCount, 1000)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      clearInterval(interval)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/produkty?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b dark:border-neutral-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="bg-white dark:bg-white rounded-md p-1">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/649706fd-96fd-4da2-aa86-4d85c8fb4fee-ZR0Pn1xPuqmI2elBiwUbNf3u9ijP2V.jpg"
                alt="DiRENBER"
                width={140}
                height={56}
                className="object-contain h-10 md:h-14 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-medium transition-all rounded-md relative group ${
                isActive("/")
                  ? "text-[#8B1538] bg-[#8B1538]/5"
                  : "text-gray-700 dark:text-gray-300 hover:text-[#8B1538] dark:hover:text-[#8B1538]"
              }`}
            >
              Strona Główna
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B1538] transition-all group-hover:w-full" />
            </Link>

            <Link
              href="/o-nas"
              className={`px-4 py-2 text-sm font-medium transition-all rounded-md relative group ${
                isActive("/o-nas")
                  ? "text-[#8B1538] bg-[#8B1538]/5"
                  : "text-gray-700 dark:text-gray-300 hover:text-[#8B1538] dark:hover:text-[#8B1538]"
              }`}
            >
              O Nas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B1538] transition-all group-hover:w-full" />
            </Link>

            <Link
              href="/kontakt"
              className={`px-4 py-2 text-sm font-medium transition-all rounded-md relative group ${
                isActive("/kontakt")
                  ? "text-[#8B1538] bg-[#8B1538]/5"
                  : "text-gray-700 dark:text-gray-300 hover:text-[#8B1538] dark:hover:text-[#8B1538]"
              }`}
            >
              Kontakt
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B1538] transition-all group-hover:w-full" />
            </Link>

            <Link
              href="/produkty"
              className={`px-4 py-2 text-sm font-medium transition-all rounded-md relative group ${
                isActive("/produkty")
                  ? "text-[#8B1538] bg-[#8B1538]/5"
                  : "text-gray-700 dark:text-gray-300 hover:text-[#8B1538] dark:hover:text-[#8B1538]"
              }`}
            >
              Sklep
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B1538] transition-all group-hover:w-full" />
            </Link>

            {/* Collection Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionDropdownOpen(true)}
              onMouseLeave={() => setCollectionDropdownOpen(false)}
            >
              <button
                className={`px-4 py-2 text-sm font-medium transition-all rounded-md relative group flex items-center gap-1 ${
                  collectionDropdownOpen
                    ? "text-[#8B1538] bg-[#8B1538]/5"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#8B1538] dark:hover:text-[#8B1538]"
                }`}
              >
                Kolekcja
                <ChevronDown className={`h-4 w-4 transition-transform ${collectionDropdownOpen ? "rotate-180" : ""}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B1538] transition-all group-hover:w-full" />
              </button>

              {/* Dropdown Menu */}
              {collectionDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[500px] bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg z-[100] p-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/produkty"
                      className="block select-none rounded-md p-3 text-sm font-bold leading-none no-underline outline-none transition-colors hover:bg-[#8B1538]/10 hover:text-[#8B1538] dark:text-gray-300 dark:hover:text-[#8B1538] bg-[#8B1538]/5 text-[#8B1538] col-span-2 text-center"
                    >
                      Wszystkie Produkty
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/kategoria/${category.slug}`}
                        className="block select-none rounded-md p-3 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-[#8B1538]/5 hover:text-[#8B1538] dark:text-gray-300 dark:hover:text-[#8B1538]"
                      >
                        {category.name_pl}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Search, Cart, Profile, Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Box - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input
                type="search"
                placeholder="Szukaj produktów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 pr-10 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:border-[#8B1538] focus:ring-[#8B1538]"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 h-full px-3 hover:bg-transparent hover:text-[#8B1538] dark:text-gray-300"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Shopping Cart */}
            <Link href="/koszyk">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 relative border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white transition-colors bg-transparent dark:border-[#8B1538] dark:text-[#8B1538] dark:hover:bg-[#8B1538] dark:hover:text-white"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Koszyk</span>
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#8B1538] hover:bg-[#8B1538]">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-[#8B1538] dark:hover:text-[#8B1538]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t dark:border-neutral-800">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 relative">
              <Input
                type="search"
                placeholder="Szukaj produktów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:border-[#8B1538] focus:ring-[#8B1538]"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent hover:text-[#8B1538] dark:text-gray-300"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Mobile Navigation */}
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive("/")
                    ? "text-[#8B1538] bg-[#8B1538]/5"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#8B1538] hover:bg-[#8B1538]/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Strona Główna
              </Link>
              <Link
                href="/o-nas"
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive("/o-nas")
                    ? "text-[#8B1538] bg-[#8B1538]/5"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#8B1538] hover:bg-[#8B1538]/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                O Nas
              </Link>
              <Link
                href="/kontakt"
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive("/kontakt")
                    ? "text-[#8B1538] bg-[#8B1538]/5"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#8B1538] hover:bg-[#8B1538]/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
              <Link
                href="/produkty"
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive("/produkty")
                    ? "text-[#8B1538] bg-[#8B1538]/5"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#8B1538] hover:bg-[#8B1538]/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sklep
              </Link>

              {/* Mobile Collection Dropdown */}
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Kolekcja</div>
                <div className="flex flex-col gap-1 pl-4">
                  <Link
                    href="/produkty"
                    className="py-2 text-sm font-bold text-[#8B1538] hover:text-[#8B1538]/80 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wszystkie
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/kategoria/${category.slug}`}
                      className="py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#8B1538] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name_pl}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
