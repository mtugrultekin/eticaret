"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Yeni Sezon İndirimleri',
    subtitle: 'Tüm ürünlerde %50\'ye varan indirimler',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600',
    link: '/products?discount=true',
    cta: 'Alışverişe Başla'
  },
  {
    id: 2,
    title: 'iPhone 15 Pro Max',
    subtitle: 'Güçlü performans, şık tasarım',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1600',
    link: '/products/iphone-15-pro-max-256gb',
    cta: 'İncele'
  },
  {
    id: 3,
    title: 'Spor & Outdoor',
    subtitle: 'Doğa ile buluşmaya hazır mısın?',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1600',
    link: '/products?category=spor-outdoor',
    cta: 'Koleksiyonu Keşfet'
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="relative h-[400px] md:h-[500lg:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8">
                {slide.subtitle}
              </p>
              <Button size="lg" asChild>
                <Link href={slide.link}>{slide.cta}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Sol/Sağ Oklar */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
        aria-label="Önceki"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
        aria-label="Sonraki"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Göstergeler */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/70'
            } rounded-full`}
            aria-label={`Slayt ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}