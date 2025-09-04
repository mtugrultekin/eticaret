import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin kullanıcı oluştur
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Kategoriler oluştur
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'elektronik' },
      update: {},
      create: {
        name: 'Elektronik',
        slug: 'elektronik',
        description: 'Elektronik ürünler',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'giyim' },
      update: {},
      create: {
        name: 'Giyim',
        slug: 'giyim',
        description: 'Kadın, erkek ve çocuk giyim',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'ev-yasam' },
      update: {},
      create: {
        name: 'Ev & Yaşam',
        slug: 'ev-yasam',
        description: 'Ev dekorasyonu ve yaşam ürünleri',
        image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'spor-outdoor' },
      update: {},
      create: {
        name: 'Spor & Outdoor',
        slug: 'spor-outdoor',
        description: 'Spor malzemeleri ve outdoor ekipmanları',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'kitap-hobi' },
      update: {},
      create: {
        name: 'Kitap & Hobi',
        slug: 'kitap-hobi',
        description: 'Kitaplar ve hobi ürünleri',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      },
    }),
  ])

  // Elektronik ürünler
  const elektronikProducts = [
    {
      name: 'iPhone 15 Pro Max 256GB',
      slug: 'iphone-15-pro-max-256gb',
      description: 'Apple iPhone 15 Pro Max, 256GB depolama alanı, Titanium tasarım, A17 Pro çip, 48MP kamera sistemi',
      price: 67999,
      comparePrice: 69999,
      sku: 'IPH15PM256',
      quantity: 25,
      categoryId: categories[0].id,
      brand: 'Apple',
      featured: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', alt: 'iPhone 15 Pro Max' },
          { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', alt: 'iPhone 15 Pro Max' },
        ]
      }
    },
    {
      name: 'Samsung Galaxy S24 Ultra 512GB',
      slug: 'samsung-galaxy-s24-ultra-512gb',
      description: 'Samsung Galaxy S24 Ultra, 512GB depolama, 200MP kamera, S Pen desteği, AI özellikleri',
      price: 54999,
      comparePrice: 59999,
      sku: 'SGS24U512',
      quantity: 18,
      categoryId: categories[0].id,
      brand: 'Samsung',
      featured: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800', alt: 'Samsung Galaxy S24 Ultra' },
        ]
      }
    },
    {
      name: 'MacBook Pro 16" M3 Max',
      slug: 'macbook-pro-16-m3-max',
      description: 'Apple MacBook Pro 16", M3 Max çip, 36GB RAM, 1TB SSD, Space Black',
      price: 124999,
      comparePrice: 129999,
      sku: 'MBP16M3MAX',
      quantity: 10,
      categoryId: categories[0].id,
      brand: 'Apple',
      featured: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', alt: 'MacBook Pro' },
        ]
      }
    },
    {
      name: 'Sony PlayStation 5 Slim',
      slug: 'sony-playstation-5-slim',
      description: 'Sony PlayStation 5 Slim, 1TB SSD, DualSense kontrolcü, 4K oyun desteği',
      price: 20999,
      comparePrice: 22999,
      sku: 'PS5SLIM1TB',
      quantity: 15,
      categoryId: categories[0].id,
      brand: 'Sony',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800', alt: 'PlayStation 5' },
        ]
      }
    },
    {
      name: 'AirPods Pro 2. Nesil',
      slug: 'airpods-pro-2-nesil',
      description: 'Apple AirPods Pro 2. Nesil, Aktif Gürültü Engelleme, MagSafe şarj kutusu',
      price: 9499,
      comparePrice: 9999,
      sku: 'APP2GEN',
      quantity: 50,
      categoryId: categories[0].id,
      brand: 'Apple',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800', alt: 'AirPods Pro' },
        ]
      }
    },
  ]

  // Giyim ürünleri
  const giyimProducts = [
    {
      name: 'Nike Air Max 270 Spor Ayakkabı',
      slug: 'nike-air-max-270',
      description: 'Nike Air Max 270, hava yastığı teknolojisi, nefes alan üst yapı, konforlu taban',
      price: 3299,
      comparePrice: 3799,
      sku: 'NAM270BW',
      quantity: 40,
      categoryId: categories[1].id,
      brand: 'Nike',
      featured: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', alt: 'Nike Air Max 270' },
        ]
      }
    },
    {
      name: 'Adidas Originals Oversize Hoodie',
      slug: 'adidas-originals-hoodie',
      description: 'Adidas Originals oversize hoodie, %100 pamuk, rahat kesim, kangaroo cep',
      price: 1899,
      comparePrice: 2299,
      sku: 'ADOHOODIE',
      quantity: 30,
      categoryId: categories[1].id,
      brand: 'Adidas',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', alt: 'Adidas Hoodie' },
        ]
      }
    },
    {
      name: 'Levi\'s 501 Original Fit Jean',
      slug: 'levis-501-original-fit',
      description: 'Levi\'s 501 Original Fit, klasik düz kesim, %100 pamuk denim, button fly',
      price: 2499,
      comparePrice: 2999,
      sku: 'LEV501OF',
      quantity: 35,
      categoryId: categories[1].id,
      brand: 'Levi\'s',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800', alt: 'Levi\'s 501' },
        ]
      }
    },
    {
      name: 'The North Face Puffer Mont',
      slug: 'north-face-puffer-mont',
      description: 'The North Face 1996 Retro Nuptse, 700 fill goose down, DWR kaplama',
      price: 11999,
      comparePrice: 13999,
      sku: 'TNF1996NUP',
      quantity: 20,
      categoryId: categories[1].id,
      brand: 'The North Face',
      featured: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1547328415-88d5d89ea3b6?w=800', alt: 'North Face Puffer' },
        ]
      }
    },
  ]

  // Ev & Yaşam ürünleri
  const evYasamProducts = [
    {
      name: 'Dyson V15 Detect Kablosuz Süpürge',
      slug: 'dyson-v15-detect',
      description: 'Dyson V15 Detect, lazer toz algılama, 230AW emiş gücü, 60 dakika çalışma süresi',
      price: 24999,
      comparePrice: 27999,
      sku: 'DYSV15DET',
      quantity: 12,
      categoryId: categories[2].id,
      brand: 'Dyson',
      featured: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', alt: 'Dyson V15' },
        ]
      }
    },
    {
      name: 'Nespresso Vertuo Plus Kahve Makinesi',
      slug: 'nespresso-vertuo-plus',
      description: 'Nespresso Vertuo Plus, otomatik kapsül tanıma, 5 fincan boyutu, 1.7L su tankı',
      price: 6999,
      comparePrice: 7999,
      sku: 'NESVERP',
      quantity: 25,
      categoryId: categories[2].id,
      brand: 'Nespresso',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', alt: 'Nespresso' },
        ]
      }
    },
    {
      name: 'Philips Hue Akıllı Aydınlatma Seti',
      slug: 'philips-hue-starter-kit',
      description: 'Philips Hue başlangıç seti, 3 akıllı ampul, Bridge, 16 milyon renk',
      price: 3499,
      comparePrice: 3999,
      sku: 'PHHUEKIT',
      quantity: 30,
      categoryId: categories[2].id,
      brand: 'Philips',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', alt: 'Philips Hue' },
        ]
      }
    },
  ]

  // Spor & Outdoor ürünleri
  const sporProducts = [
    {
      name: 'Garmin Fenix 7X Sapphire Solar',
      slug: 'garmin-fenix-7x-sapphire',
      description: 'Garmin Fenix 7X, solar şarj, safir cam, GPS, kalp atış ölçer, 37 gün pil ömrü',
      price: 32999,
      comparePrice: 35999,
      sku: 'GRFX7XSS',
      quantity: 8,
      categoryId: categories[3].id,
      brand: 'Garmin',
      featured: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1523395243481-163f8f6155ab?w=800', alt: 'Garmin Fenix' },
        ]
      }
    },
    {
      name: 'Decathlon Quechua 2 Kişilik Kamp Çadırı',
      slug: 'quechua-2-kisilik-cadir',
      description: 'Quechua MH100, 2 kişilik, hızlı kurulum, su geçirmez, kompakt tasarım',
      price: 1299,
      comparePrice: 1599,
      sku: 'QUMH100',
      quantity: 45,
      categoryId: categories[3].id,
      brand: 'Quechua',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', alt: 'Kamp Çadırı' },
        ]
      }
    },
  ]

  // Kitap & Hobi ürünleri
  const kitapProducts = [
    {
      name: 'Kindle Paperwhite 11. Nesil',
      slug: 'kindle-paperwhite-11',
      description: 'Kindle Paperwhite, 6.8" ekran, 300 ppi, ayarlanabilir sıcak ışık, 8GB',
      price: 4999,
      comparePrice: 5499,
      sku: 'KDLPW11',
      quantity: 20,
      categoryId: categories[4].id,
      brand: 'Amazon',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1592433384369-368c7ba9782c?w=800', alt: 'Kindle' },
        ]
      }
    },
    {
      name: 'LEGO Creator Expert Porsche 911',
      slug: 'lego-creator-porsche-911',
      description: 'LEGO Creator Expert 10295, Porsche 911 Turbo ve Targa, 1458 parça',
      price: 6299,
      comparePrice: 6999,
      sku: 'LEGO10295',
      quantity: 15,
      categoryId: categories[4].id,
      brand: 'LEGO',
      featured: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800', alt: 'LEGO Porsche' },
        ]
      }
    },
  ]

  // Tüm ürünleri veritabanına ekle
  const allProducts = [
    ...elektronikProducts,
    ...giyimProducts,
    ...evYasamProducts,
    ...sporProducts,
    ...kitapProducts,
  ]

  for (const product of allProducts) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })