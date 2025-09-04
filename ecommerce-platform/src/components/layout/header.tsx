"use client"

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Search, Menu, User, Heart, Package, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from 'next-themes'
import { useCart } from '@/store/cart'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const totalItems = useCart((state) => state.getTotalItems())

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <span className="font-bold text-xl">E-Store</span>
          </Link>

          {/* Arama Çubuğu - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Ürün ara..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Sağ Menü */}
          <div className="flex items-center space-x-4">
            {/* Mobil Arama Butonu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Tema Değiştirici */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Tema değiştir</span>
            </Button>

            {/* Favoriler */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favoriler</span>
              </Link>
            </Button>

            {/* Kullanıcı Menüsü */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Kullanıcı menüsü</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">Giriş Yap</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/register">Kayıt Ol</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profilim</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Siparişlerim</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sepet */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Sepet</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobil Arama - Açılır */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Ürün ara..."
                className="pl-10 w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Kategoriler Menüsü */}
      <nav className="border-t">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8 overflow-x-auto py-3 text-sm">
            <li>
              <Link href="/products?category=elektronik" className="hover:text-primary whitespace-nowrap">
                Elektronik
              </Link>
            </li>
            <li>
              <Link href="/products?category=giyim" className="hover:text-primary whitespace-nowrap">
                Giyim
              </Link>
            </li>
            <li>
              <Link href="/products?category=ev-yasam" className="hover:text-primary whitespace-nowrap">
                Ev & Yaşam
              </Link>
            </li>
            <li>
              <Link href="/products?category=spor-outdoor" className="hover:text-primary whitespace-nowrap">
                Spor & Outdoor
              </Link>
            </li>
            <li>
              <Link href="/products?category=kitap-hobi" className="hover:text-primary whitespace-nowrap">
                Kitap & Hobi
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}