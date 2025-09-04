import Link from 'next/link'
import { Package, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span className="font-bold text-xl">E-Store</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Modern e-ticaret deneyimi. En kaliteli ürünler, hızlı teslimat ve güvenli alışveriş.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary">
                  Ürünler
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div>
            <h3 className="font-semibold mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help/shipping" className="text-muted-foreground hover:text-primary">
                  Kargo Bilgileri
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="text-muted-foreground hover:text-primary">
                  İade ve Değişim
                </Link>
              </li>
              <li>
                <Link href="/help/faq" className="text-muted-foreground hover:text-primary">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Gizlilik Politikası
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@estore.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>0850 123 45 67</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 E-Store. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}