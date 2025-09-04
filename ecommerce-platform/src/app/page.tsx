import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { ProductCard } from '@/components/products/product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Shield, CreditCard, HeadphonesIcon } from 'lucide-react'

// Geçici veri - gerçek uygulamada API'den gelecek
const featuredProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    slug: 'iphone-15-pro-max-256gb',
    price: 67999,
    comparePrice: 69999,
    images: [{ url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', alt: 'iPhone 15 Pro Max' }],
    brand: 'Apple',
    featured: true,
    _count: { reviews: 245 },
    _avg: { reviews: { rating: 4.8 } }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    price: 54999,
    comparePrice: 59999,
    images: [{ url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800', alt: 'Samsung Galaxy S24 Ultra' }],
    brand: 'Samsung',
    featured: true,
    _count: { reviews: 189 },
    _avg: { reviews: { rating: 4.7 } }
  },
  {
    id: '3',
    name: 'Nike Air Max 270 Spor Ayakkabı',
    slug: 'nike-air-max-270',
    price: 3299,
    comparePrice: 3799,
    images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', alt: 'Nike Air Max 270' }],
    brand: 'Nike',
    featured: true,
    _count: { reviews: 567 },
    _avg: { reviews: { rating: 4.6 } }
  },
  {
    id: '4',
    name: 'Dyson V15 Detect Kablosuz Süpürge',
    slug: 'dyson-v15-detect',
    price: 24999,
    comparePrice: 27999,
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', alt: 'Dyson V15' }],
    brand: 'Dyson',
    featured: true,
    _count: { reviews: 128 },
    _avg: { reviews: { rating: 4.9 } }
  },
]

const newProducts = [
  {
    id: '5',
    name: 'MacBook Pro 16" M3 Max',
    slug: 'macbook-pro-16-m3-max',
    price: 124999,
    comparePrice: 129999,
    images: [{ url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', alt: 'MacBook Pro' }],
    brand: 'Apple',
    _count: { reviews: 89 },
    _avg: { reviews: { rating: 4.9 } }
  },
  {
    id: '6',
    name: 'The North Face Puffer Mont',
    slug: 'north-face-puffer-mont',
    price: 11999,
    comparePrice: 13999,
    images: [{ url: 'https://images.unsplash.com/photo-1547328415-88d5d89ea3b6?w=800', alt: 'North Face Puffer' }],
    brand: 'The North Face',
    _count: { reviews: 234 },
    _avg: { reviews: { rating: 4.7 } }
  },
  {
    id: '7',
    name: 'LEGO Creator Expert Porsche 911',
    slug: 'lego-creator-porsche-911',
    price: 6299,
    comparePrice: 6999,
    images: [{ url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800', alt: 'LEGO Porsche' }],
    brand: 'LEGO',
    _count: { reviews: 156 },
    _avg: { reviews: { rating: 4.8 } }
  },
  {
    id: '8',
    name: 'Garmin Fenix 7X Sapphire Solar',
    slug: 'garmin-fenix-7x-sapphire',
    price: 32999,
    comparePrice: 35999,
    images: [{ url: 'https://images.unsplash.com/photo-1523395243481-163f8f6155ab?w=800', alt: 'Garmin Fenix' }],
    brand: 'Garmin',
    _count: { reviews: 78 },
    _avg: { reviews: { rating: 4.9 } }
  },
]

const categories = [
  {
    name: 'Elektronik',
    slug: 'elektronik',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    productCount: 1250
  },
  {
    name: 'Giyim',
    slug: 'giyim',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    productCount: 3400
  },
  {
    name: 'Ev & Yaşam',
    slug: 'ev-yasam',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400',
    productCount: 890
  },
  {
    name: 'Spor & Outdoor',
    slug: 'spor-outdoor',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    productCount: 567
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Özellikler */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Hızlı Teslimat</h3>
                <p className="text-sm text-muted-foreground">Siparişleriniz aynı gün kargoda</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Güvenli Alışveriş</h3>
                <p className="text-sm text-muted-foreground">256-bit SSL güvenlik sertifikası</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Kolay Ödeme</h3>
                <p className="text-sm text-muted-foreground">Kredi kartı ve havale seçenekleri</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <HeadphonesIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">7/24 Destek</h3>
                <p className="text-sm text-muted-foreground">Müşteri hizmetlerimiz her zaman yanınızda</p>
              </div>
            </div>
          </div>
        </section>

        {/* Öne Çıkan Ürünler */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Öne Çıkan Ürünler</h2>
              <Button variant="ghost" asChild>
                <Link href="/products?featured=true">
                  Tümünü Gör
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Kategoriler */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Kategoriler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products?category=${category.slug}`}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 transition-colors" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.productCount} ürün</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Yeni Ürünler */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Yeni Ürünler</h2>
              <Button variant="ghost" asChild>
                <Link href="/products?sort=newest">
                  Tümünü Gör
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Bölümü */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hemen Üye Ol, Özel Fırsatları Kaçırma!
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Üyelere özel indirimler ve kampanyalardan ilk sen haberdar ol.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/register">Üye Ol</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">Alışverişe Başla</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}