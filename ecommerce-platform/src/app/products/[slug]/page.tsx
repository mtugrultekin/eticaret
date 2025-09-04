import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductDetail } from '@/components/products/product-detail'
import { ProductCard } from '@/components/products/product-card'
import { notFound } from 'next/navigation'

// Geçici veri - gerçek uygulamada API'den gelecek
const getProduct = async (slug: string) => {
  // Simüle edilmiş ürün verisi
  const products = {
    'iphone-15-pro-max-256gb': {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      slug: 'iphone-15-pro-max-256gb',
      description: `Apple iPhone 15 Pro Max, teknolojinin zirvesini temsil ediyor. A17 Pro çip ile güçlendirilmiş bu cihaz, mobil oyun ve profesyonel içerik üretimi için mükemmel performans sunuyor.

## Öne Çıkan Özellikler

- **A17 Pro Çip**: 3 nanometre teknolojisi ile üretilmiş, sınıfının en güçlü işlemcisi
- **Titanium Tasarım**: Hafif ama dayanıklı titanium çerçeve
- **48MP Ana Kamera**: ProRAW ve ProRes video desteği
- **Action Button**: Özelleştirilebilir yeni buton
- **USB-C**: Hızlı veri transferi ve şarj

## Teknik Özellikler

- Ekran: 6.7" Super Retina XDR OLED
- Depolama: 256GB
- RAM: 8GB
- Batarya: 4422 mAh
- İşletim Sistemi: iOS 17`,
      price: 67999,
      comparePrice: 69999,
      sku: 'IPH15PM256',
      quantity: 25,
      brand: 'Apple',
      featured: true,
      images: [
        { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', alt: 'iPhone 15 Pro Max' },
        { url: 'https://images.unsplash.com/photo-1695048064678-f34a5c033980?w=800', alt: 'iPhone 15 Pro Max' },
        { url: 'https://images.unsplash.com/photo-1695729618912-95b7b2e20ab9?w=800', alt: 'iPhone 15 Pro Max' },
      ],
      category: {
        id: '1',
        name: 'Elektronik',
        slug: 'elektronik'
      },
      variants: [
        { id: 'v1', name: 'Natural Titanium', price: 67999, quantity: 10 },
        { id: 'v2', name: 'Blue Titanium', price: 67999, quantity: 8 },
        { id: 'v3', name: 'White Titanium', price: 67999, quantity: 5 },
        { id: 'v4', name: 'Black Titanium', price: 67999, quantity: 2 },
      ],
      _count: { reviews: 245 },
      _avg: { reviews: { rating: 4.8 } }
    }
  }

  return products[slug] || null
}

// Benzer ürünler
const relatedProducts = [
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
    id: '4',
    name: 'AirPods Pro 2. Nesil',
    slug: 'airpods-pro-2-nesil',
    price: 9499,
    comparePrice: 9999,
    images: [{ url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800', alt: 'AirPods Pro' }],
    brand: 'Apple',
    _count: { reviews: 567 },
    _avg: { reviews: { rating: 4.6 } }
  },
]

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li><a href="/" className="text-muted-foreground hover:text-primary">Ana Sayfa</a></li>
              <li><span className="text-muted-foreground">/</span></li>
              <li><a href="/products" className="text-muted-foreground hover:text-primary">Ürünler</a></li>
              <li><span className="text-muted-foreground">/</span></li>
              <li><a href={`/products?category=${product.category.slug}`} className="text-muted-foreground hover:text-primary">{product.category.name}</a></li>
              <li><span className="text-muted-foreground">/</span></li>
              <li className="text-foreground">{product.name}</li>
            </ol>
          </nav>
        </div>

        {/* Ürün Detayı */}
        <ProductDetail product={product} />

        {/* Benzer Ürünler */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Benzer Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}