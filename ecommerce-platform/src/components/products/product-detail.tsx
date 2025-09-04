"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/store/cart'
import { Heart, ShoppingCart, Star, Truck, Shield, Package, ChevronLeft, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

interface ProductDetailProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number
    comparePrice?: number | null
    sku: string
    quantity: number
    brand?: string | null
    featured?: boolean
    images: {
      url: string
      alt?: string | null
    }[]
    category: {
      id: string
      name: string
      slug: string
    }
    variants?: {
      id: string
      name: string
      price: number
      quantity: number
    }[]
    _count?: {
      reviews: number
    }
    _avg?: {
      reviews: {
        rating: number | null
      }
    }
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.id || '')
  const [quantity, setQuantity] = useState(1)
  const addItem = useCart((state) => state.addItem)

  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const selectedVariantData = product.variants?.find(v => v.id === selectedVariant)
  const currentPrice = selectedVariantData?.price || product.price
  const inStock = selectedVariantData ? selectedVariantData.quantity > 0 : product.quantity > 0

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: currentPrice,
      image: product.images[0]?.url || '',
      variantId: selectedVariant || undefined,
      variantName: selectedVariantData?.name,
    })
    toast.success(`${product.name} sepete eklendi!`)
  }

  const handleAddToWishlist = () => {
    toast.success(`${product.name} favorilere eklendi!`)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Görseller */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            {product.images[selectedImage] && (
              <Image
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].alt || product.name}
                fill
                className="object-cover"
                priority
              />
            )}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  aria-label="Önceki görsel"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  aria-label="Sonraki görsel"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail'ler */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ürün Bilgileri */}
        <div className="space-y-6">
          {/* Başlık ve Marka */}
          <div>
            {product.brand && (
              <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
            )}
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-muted-foreground mt-2">SKU: {product.sku}</p>
          </div>

          {/* Değerlendirme */}
          {product._avg?.reviews?.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= product._avg.reviews.rating!
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm">
                {product._avg.reviews.rating.toFixed(1)} ({product._count?.reviews || 0} değerlendirme)
              </span>
            </div>
          )}

          {/* Fiyat */}
          <div className="space-y-2">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold">{formatPrice(currentPrice)}</span>
              {product.comparePrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                  <Badge variant="destructive">-{discount}%</Badge>
                </>
              )}
            </div>
            {inStock ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Package className="h-3 w-3 mr-1" />
                Stokta var
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                Stokta yok
              </Badge>
            )}
          </div>

          {/* Varyantlar */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <Label>Renk Seçimi</Label>
              <RadioGroup value={selectedVariant} onValueChange={setSelectedVariant}>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={variant.id} id={variant.id} />
                      <Label
                        htmlFor={variant.id}
                        className="flex-1 cursor-pointer p-2 border rounded-md hover:bg-muted"
                      >
                        <span className="font-medium">{variant.name}</span>
                        {variant.quantity === 0 && (
                          <span className="text-xs text-muted-foreground ml-2">(Tükendi)</span>
                        )}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Aksiyonlar */}
          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Sepete Ekle
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Özellikler */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Hızlı Teslimat</p>
                <p className="text-sm text-muted-foreground">2-3 iş günü içinde kargo</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Güvenli Alışveriş</p>
                <p className="text-sm text-muted-foreground">256-bit SSL güvenlik</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Kolay İade</p>
                <p className="text-sm text-muted-foreground">14 gün içinde ücretsiz iade</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detaylı Bilgiler */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Açıklama</TabsTrigger>
            <TabsTrigger value="features">Özellikler</TabsTrigger>
            <TabsTrigger value="reviews">Yorumlar ({product._count?.reviews || 0})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose prose-sm max-w-none">
              {product.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="features" className="mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Genel Özellikler</h4>
                  <dl className="space-y-1">
                    <div className="flex justify-between py-1 border-b">
                      <dt className="text-sm text-muted-foreground">Marka</dt>
                      <dd className="text-sm font-medium">{product.brand}</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <dt className="text-sm text-muted-foreground">Kategori</dt>
                      <dd className="text-sm font-medium">{product.category.name}</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <dt className="text-sm text-muted-foreground">Stok Kodu</dt>
                      <dd className="text-sm font-medium">{product.sku}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Henüz yorum yapılmamış.</p>
              <Button className="mt-4">İlk Yorumu Yap</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}