# Modern E-Ticaret Platformu

Modern teknolojilerle geliştirilmiş, tam özellikli bir e-ticaret platformu.

## 🚀 Özellikler

### 🛍️ Alışveriş Özellikleri
- **Ürün Kataloğu**: Detaylı ürün sayfaları, çoklu görsel desteği
- **Gelişmiş Arama ve Filtreleme**: Kategori, fiyat, marka bazlı filtreleme
- **Sepet Yönetimi**: Gerçek zamanlı sepet güncellemeleri
- **Favoriler**: Ürünleri favorilere ekleme
- **Ürün İncelemeleri**: Kullanıcı yorumları ve puanlama sistemi

### 👤 Kullanıcı Özellikleri
- **Güvenli Kimlik Doğrulama**: NextAuth ile email/şifre ve OAuth desteği
- **Kullanıcı Profili**: Profil yönetimi, adres defteri
- **Sipariş Takibi**: Sipariş geçmişi ve takip sistemi
- **Bildirimler**: E-posta bildirimleri

### 💳 Ödeme ve Teslimat
- **Stripe Entegrasyonu**: Güvenli ödeme işlemleri
- **Çoklu Ödeme Yöntemleri**: Kredi kartı, havale/EFT
- **Kargo Takibi**: Gerçek zamanlı kargo takibi
- **Adres Yönetimi**: Çoklu teslimat adresi desteği

### 🎨 Tasarım ve UX
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Dark/Light Tema**: Kullanıcı tercihi ile tema değiştirme
- **Modern UI**: Tailwind CSS ile şık ve modern arayüz
- **Hızlı Yükleme**: Next.js optimizasyonları

### 🔧 Yönetici Paneli
- **Ürün Yönetimi**: Ürün ekleme, düzenleme, silme
- **Sipariş Yönetimi**: Sipariş durumu güncelleme
- **Kullanıcı Yönetimi**: Kullanıcı rolleri ve yetkileri
- **Raporlama**: Satış raporları ve analizler

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL/SQLite, Prisma ORM
- **Payment**: Stripe
- **Deployment**: Vercel/Railway

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repo-url>
cd ecommerce-platform
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın**
```bash
cp .env.example .env
# .env dosyasını düzenleyin
```

4. **Veritabanını kurun**
```bash
npm run db:init
```

5. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 🔐 Varsayılan Kullanıcılar

- **Admin**: admin@example.com / admin123
- **Test Kullanıcı**: user@example.com / user123

## 📝 Lisans

MIT

## 🤝 Katkıda Bulunma

Pull request'ler kabul edilir. Büyük değişiklikler için önce bir issue açınız.