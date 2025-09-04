"use client"

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, Shield, Truck } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart()

  const handleQuantityChange = (productId: string, newQuantity: number, variantId?: string) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity, variantId)
  }

  const handleRemoveItem = (productId: string, variantId?: string) => {
    removeItem(productId, variantId)
    toast.success('Ürün sepetten kaldırıldı')
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 500 ? 0 : 29.90
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-4">Sepetiniz Boş</h1>
            <p className="text-muted-foreground mb-8">
              Henüz sepetinize ürün eklemediniz. Hemen alışverişe başlayın!
            </p>
            <Button asChild size="lg">
              <Link href="/products">Alışverişe Başla</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Alışveriş Sepeti ({items.length} Ürün)</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sepet Ürünleri */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.productId}-${item.variantId}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Ürün Görseli */}
                    <Link href={`/products/${item.productId}`} className="shrink-0">
                      <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    
                    {/* Ürün Bilgileri */}
                    <div className="flex-1">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="font-medium hover:underline">{item.name}</h3>
                      </Link>
                      {item.variantName && (
                        <p className="text-sm text-muted-foreground">{item.variantName}</p>
                      )}
                      <p className="text-lg font-semibold mt-1">{formatPrice(item.price)}</p>
                    </div>
                    
                    {/* Miktar ve İşlemler */}
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.productId, item.variantId)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1, item.variantId)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 1, item.variantId)}
                          className="w-16 h-8 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1, item.variantId)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart}>
                Sepeti Temizle
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">Alışverişe Devam Et</Link>
              </Button>
            </div>
          </div>
          
          {/* Sipariş Özeti */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kargo</span>
                    <span>{shipping === 0 ? 'Ücretsiz' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>KDV (%18)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Toplam</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
                
                {shipping > 0 && (
                  <p className="text-sm text-muted-foreground mt-4">
                    500 TL ve üzeri alışverişlerde kargo ücretsiz!
                  </p>
                )}
                
                <Button className="w-full mt-6" size="lg" asChild>
                  <Link href="/checkout">Ödemeye Geç</Link>
                </Button>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Güvenli ödeme</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Hızlı teslimat</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* İndirim Kodu */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <p className="text-sm font-medium mb-2">İndirim Kodu</p>
                <div className="flex gap-2">
                  <Input placeholder="Kod giriniz" />
                  <Button variant="outline">Uygula</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}