"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/store/cart'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    comparePrice?: number | null
    images: {
      url: string
      alt?: string | null
    }[]
    brand?: string | null
    featured?: boolean
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

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem)
  
  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || '',
    })
    toast.success(`${product.name} sepete eklendi!`)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toast.success(`${product.name} favorilere eklendi!`)
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.images[0] && (
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              -{discount}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-2 right-2" variant="secondary">
              Öne Çıkan
            </Badge>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
          
          {/* Hızlı İşlem Butonları */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleAddToWishlist}
              className="h-10 w-10 rounded-full"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              onClick={handleAddToCart}
              className="h-10 w-10 rounded-full"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          {product.brand && (
            <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
          )}
          <h3 className="font-medium line-clamp-2 mb-2">{product.name}</h3>
          
          {/* Değerlendirme */}
          {product._avg?.reviews?.rating && (
            <div className="flex items-center space-x-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{product._avg.reviews.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">
                ({product._count?.reviews || 0})
              </span>
            </div>
          )}
          
          {/* Fiyat */}
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}