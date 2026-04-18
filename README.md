# PARAZIT: RESET — Üretim Platformu

2042 yılında, megakorporasyonların şehirleri yönettiği ve beyin-bilgisayar arayüzünün sıradan bir ürün haline geldiği bir dünya. Sekiz karakter. Bir frekans. Sonsuz olasılıklar.

## 🚀 Teknoloji Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Database:** PostgreSQL + Prisma ORM
- **Styling:** Tailwind CSS + Custom 2042 Theme
- **UI:** shadcn/ui + Radix UI
- **Forms:** React Hook Form + Zod Validation
- **Animations:** Framer Motion

## 📦 Kurulum

### Gereklilikler
- Node.js 18+
- PostgreSQL 14+

### Adımlar

```bash
# Bağımlılıkları yükle
npm install

# Veritabanını kur
npm run db:push

# Seed data'yı yükle (karakterler)
npm run db:seed

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama **http://localhost:3000** adresinde çalışacak.

## 📁 Proje Yapısı

```
parazit-reset-next/
├── app/                   # Next.js App Router
│   ├── (main)/           # Sayfa layout'u
│   │   ├── page.tsx      # Showcase
│   │   ├── bible/        # Bible (Karakterler)
│   │   └── editor/       # Senaryo Editörü
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/           # React bileşenleri
│   ├── layout/          # Sidebar, Header
│   └── characters/      # Character cards
├── lib/                 # Yardımcı fonksiyonlar
│   ├── db.ts           # Prisma client
│   ├── validation.ts   # Zod schemas
│   └── utils.ts        # Utilities
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── seed.js         # Seed script
└── public/             # Static assets

```

## 🎨 Özellikler

### Sayfa 1: SHOWCASE (◉)
- Ana karakter grid'i
- Her karakterin temel bilgisi ve istatistikleri
- "Detayları Gör" linki Bible'a

### Sayfa 2: BİBLE (◈)
- Tam karakter profilleri
- İstatistikler (10'lu skaladaki değerler)
- Biyografi ve alıntılar
- İlişki ağı (diğer karakterlerle bağlantılar)
- Karakter seçici sidebar

### Sayfa 3: SENARYO EDİTÖRÜ (◎)
- Yeni senaryo oluşturma
- Başlık, açıklama, içerik düzenleme
- Senaryo listesi
- Kaydet/Sil işlemleri

## 🗄️ Veritabanı

### Characters
- `code` - Karakter kodu (COLT, VEIL, vb.)
- `name` - Tam adı
- `subtitle` - Açıklaması
- `faction` - Ait olduğu grup
- `bio` - Biyografi
- `quote` - Karakteristik alıntı
- `colorPrimary/Secondary` - Tema renkleri

### Stats
- Her karakter için 4 istatistik
- Label + Value (0-10)

### Connections
- Karakterler arası ilişkiler
- Bağlantı açıklaması

### Scenarios
- Kullanıcı tarafından oluşturulan senaryolar
- Title, description, content

## 🔧 Geliştirme Komutları

```bash
# Dev sunucusu
npm run dev

# Build (production)
npm run build

# Production'da çalıştır
npm start

# Type checking
npm run check

# Database studio (interaktif)
npm run db:studio

# Seed database
npm run db:seed
```

## 🎯 2042 Teması

Uygulama özel bir 2042 color scheme'i kullanır:
- **Arka Plan:** Koyu gri (HSL 220 15% 7%)
- **Vurgu:** Altın/Orange (HSL 36 72% 50%)
- **İkincil:** Teal (HSL 166 100% 35%)
- **Typography:** DM Serif Display + Satoshi

## 📝 Karakterler (8 Total)

1. **COLT** — Eski Şirket Operatifi
2. **VEIL/FAYE** — AI varlık
3. **DR. VOSS** — Nörolog
4. **FLETCHER** — Mafya Lideri
5. **BULLET** — Fletcher'ın Sağ Kolu
6. **ECHO** — Kaybolan Kız
7. **GREY** — Şirket Temsilcisi
8. **DUTCH** — Bölge Rehberi

---

**2042'de seni bekliyorum.**
