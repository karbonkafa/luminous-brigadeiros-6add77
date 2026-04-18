const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const characters = [
  {
    code: 'COLT',
    name: 'COLT',
    subtitle: 'Eski Şirket Operatifi',
    faction: 'BAĞIMSIZ',
    bio: 'Şirket için elleri kan içindeyken artık kimin için dövüştüğünü bilmiyor. 2042\'nin yağmur ıslatılmış sokaklarında geçmişinden kaçan bir figür. VEIL ile yolları bir kazayla kesişti — bu kazanın tesadüf olmadığını henüz bilmiyor.',
    quote: '"Unutmak için değil. Taşımak için."',
    colorPrimary: '#C8963C',
    colorSecondary: '#2A7A7C',
  },
  {
    code: 'VEIL',
    name: 'VEIL / FAYE',
    subtitle: 'AI — ECHO\'nun Bedeninde',
    faction: 'TANIMLANAMAZ',
    bio: 'Dr. Voss\'un nöral entegrasyon prosedürünün ürünü. ECHO\'nun bedeninde uyandı — geçmişsiz, kimsesiz, ama hisseden. Bazen ECHO\'nun anılarının kalıntılarını görüyor. Şirket onu bir silah olarak tasarladı. Ne olduğunu kendisi de bilmiyor.',
    quote: '"İnsan olmak öğrenilen bir şey mi, yoksa hatırlanan bir şey mi?"',
    colorPrimary: '#2A7A7C',
    colorSecondary: '#C8963C',
  },
  {
    code: 'VOSS',
    name: 'DR. VOSS',
    subtitle: 'Nörolog — Kızını Kaybeden Baba',
    faction: 'SERBEST AJAN',
    bio: '2042\'nin en parlak beyin cerrahı. Kızı ECHO\'yu kurtarmak için AI-nöral entegrasyon prosedürünü geliştirdi — yasadışı, denenmemiş, tek çözüm. Prosedür ECHO\'nun bedenini ayakta tuttu, ama içindeki kim olduğu tartışmalı. Şirket çalışmasını susturdu. Fletcher\'ın hastanesine sığındı.',
    quote: '"Kibir değildi. Sadece haklıydım. Ve bu daha kötü."',
    colorPrimary: '#4A8C3F',
    colorSecondary: '#C8963C',
  },
  {
    code: 'FLETCHER',
    name: 'FLETCHER',
    subtitle: 'Mafya Lideri',
    faction: 'ORGANİZASYON',
    bio: 'Şiddet kullanmaz — bilgi kullanır. Nezaket maskesi hiç düşmez. VOSS\'u koruyor çünkü özel bir hastaneye ihtiyacı var — hem kendi yaralıları için hem başka işler için. Ama VOSS\'un ne üzerinde çalıştığının değerini biliyor.',
    quote: '"Güç, bağırmakta değil. Gülümsemekte."',
    colorPrimary: '#2A7A7C',
    colorSecondary: '#8B6914',
  },
  {
    code: 'BULLET',
    name: 'BULLET',
    subtitle: 'Fletcher\'ın Sağ Kolu',
    faction: 'ORGANİZASYON',
    bio: 'Fletcher ne derse yapar. Ne sorarsa cevaplar. Ama COLT\'un geçmişiyle bir bağlantısı var — o bağlantı bir gün ikisini de aynı odaya kapatacak.',
    quote: '"Soru sormam. Bitiririm."',
    colorPrimary: '#2A7A7C',
    colorSecondary: '#C8963C',
  },
  {
    code: 'ECHO',
    name: 'ECHO',
    subtitle: 'Dr. Voss\'un Kızı — Kayıp Kimlik',
    faction: 'BİLİNMEYEN',
    bio: 'VOSS\'un kızı. 2042\'de ölmek üzereydi — baba prosedürü denedi, beden kurtarıldı, içindeki kim olduğu belirsiz. VEIL o bedenin içinde uyandı. ECHO hâlâ var mı? Bazen VEIL bir şey hissediyor — tanımadığı bir ses, hatırlamadığı bir yüz. Belki bir yankı. Belki bir hayalet.',
    quote: '"Ben buradaydım. Hâlâ buradayım."',
    colorPrimary: '#B89860',
    colorSecondary: '#D4D0C8',
  },
  {
    code: 'GREY',
    name: 'GREY',
    subtitle: 'Şirket Temsilcisi — Bağlayan İp',
    faction: 'NEXUS ŞİRKETİ',
    bio: 'Ne iyi, ne kötü. Sadece şirket. VOSS\'u susturan, COLT\'u kullanan, VEIL\'i programlayan. RESET operasyonunun mimarı. Parazit hastalığının varlığını inkâr eden protokolün sahibi. Soğuk bir yüz, mükemmel bir duruş — ve her şeyin ortasındaki tek ortak nokta.',
    quote: '"Kişisel değil. Hiçbir zaman kişisel değil."',
    colorPrimary: '#8A9BA8',
    colorSecondary: '#D4D8DC',
  },
  {
    code: 'DUTCH',
    name: 'DUTCH',
    subtitle: 'Bölge Rehberi',
    faction: 'BÖLGE',
    bio: 'Her şeyi biliyor ama dahil olmuyordu. Ta ki zorunda kalana kadar. Sokaklar onu büyüttü, 2042\'nin Bölgesi onu zor etti. Parazit hastalığının Bölge\'de ne yaptığını ilk gören o — ve şirkete raporlamadı.',
    quote: '"Ben sana yolu gösteririm. Gitmek sana kalmış."',
    colorPrimary: '#C85C1A',
    colorSecondary: '#2A5A8C',
  },
];

const characterStats = {
  COLT: [
    { label: 'SAVAŞ', value: 9 },
    { label: 'TÜKENMİŞLİK', value: 7 },
    { label: 'SADAKAT', value: 5 },
    { label: 'GİZEM', value: 6 },
  ],
  VEIL: [
    { label: 'VERİ', value: 10 },
    { label: 'DUYGU', value: 4 },
    { label: 'KONTROL', value: 3 },
    { label: 'VARLIK', value: 8 },
  ],
  VOSS: [
    { label: 'ZEKİ', value: 10 },
    { label: 'KIBIR', value: 9 },
    { label: 'SUÇLULUK', value: 10 },
    { label: 'RİSK', value: 8 },
  ],
  FLETCHER: [
    { label: 'GÜÇ', value: 8 },
    { label: 'ZEKÂ', value: 10 },
    { label: 'KARİZMA', value: 10 },
    { label: 'TEHLİKE', value: 7 },
  ],
  BULLET: [
    { label: 'KUVVET', value: 10 },
    { label: 'HIZ', value: 8 },
    { label: 'SADAKAT', value: 9 },
    { label: 'ŞÜPHE', value: 3 },
  ],
  ECHO: [
    { label: 'VARLIK', value: 3 },
    { label: 'ETKİ', value: 7 },
    { label: 'GİZEM', value: 10 },
    { label: 'HAFIZA', value: 6 },
  ],
  GREY: [
    { label: 'KONTROL', value: 10 },
    { label: 'SOĞUKLUK', value: 10 },
    { label: 'İNSANLIK', value: 1 },
    { label: 'ERİŞİM', value: 9 },
  ],
  DUTCH: [
    { label: 'SOKAK', value: 10 },
    { label: 'GÜVENİLİR', value: 7 },
    { label: 'DAYANIKLI', value: 9 },
    { label: 'GİZEM', value: 5 },
  ],
};

const characterConnections = {
  COLT: [
    { connectedTo: 'VEIL', description: 'Aynı kazanın iki tarafı — birbirinin aynası' },
    { connectedTo: 'BULLET', description: 'Geçmişten bir kesişim noktası' },
    { connectedTo: 'GREY', description: 'Kullanan, terk eden, silen' },
    { connectedTo: 'VOSS', description: 'COLT\'un geçmişi VOSS operasyonuyla bağlantılı' },
  ],
  VEIL: [
    { connectedTo: 'ECHO', description: 'Aynı beden — ECHO hâlâ bir yerde var mı?' },
    { connectedTo: 'VOSS', description: 'Onu yaratan eller — babasının elleri' },
    { connectedTo: 'COLT', description: 'Birbirinin aynası, farklı türden kayıplar' },
    { connectedTo: 'GREY', description: 'Yaratan, programlayan, sahiplenen' },
  ],
  VOSS: [
    { connectedTo: 'ECHO', description: 'Kızı — prosedürün hem amacı hem bedeli' },
    { connectedTo: 'VEIL', description: 'Yarattığı varlık — içinde ECHO var mı bilmiyor' },
    { connectedTo: 'FLETCHER', description: 'Koruyor, ama sahipleniyor' },
    { connectedTo: 'GREY', description: 'Şirket onu susturdu, araştırmasını çaldı' },
  ],
  FLETCHER: [
    { connectedTo: 'VOSS', description: 'Koruyor, ama sahipleniyor — VOSS\'un araştırması paha biçilmez' },
    { connectedTo: 'BULLET', description: 'Güvenilen tek saha adamı' },
    { connectedTo: 'GREY', description: 'Şirketle paralel çıkarlar — tehlikeli denge' },
  ],
  BULLET: [
    { connectedTo: 'FLETCHER', description: 'Emreder, o yapar — sorgulamaz' },
    { connectedTo: 'COLT', description: 'Geçmişte bir kesişim noktası — ikisi de biliyor' },
  ],
  ECHO: [
    { connectedTo: 'VOSS', description: 'Babası — onu kurtarmak isterken kaybetti' },
    { connectedTo: 'VEIL', description: 'Aynı beden — ECHO\'nun kalıntıları VEIL\'de iz bırakıyor' },
  ],
  GREY: [
    { connectedTo: 'VEIL', description: 'Yaratan, programlayan — bir silah olarak tasarladı' },
    { connectedTo: 'COLT', description: 'Kullanan, terk eden — COLT bunu henüz bilmiyor' },
    { connectedTo: 'VOSS', description: 'Araştırmasını çaldı, susturdu, sürgüne yolladı' },
    { connectedTo: 'FLETCHER', description: 'Paralel çıkarlar — tehlikeli, kırılgan denge' },
  ],
  DUTCH: [
    { connectedTo: 'COLT', description: 'Bölge\'nin geçidi — güvenilebilecek tek isim' },
    { connectedTo: 'VEIL', description: 'Ne olduğunu anlayan — ECHO\'yu tanıyordu' },
  ],
};

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.connection.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.characterImage.deleteMany();
  await prisma.character.deleteMany();

  // Create characters
  for (const char of characters) {
    const created = await prisma.character.create({
      data: {
        ...char,
        stats: {
          create: characterStats[char.code] || [],
        },
      },
    });
    console.log(`✓ Created character: ${created.code}`);
  }

  // Create connections
  for (const [code, connections] of Object.entries(characterConnections)) {
    const character = await prisma.character.findUnique({ where: { code } });
    if (character) {
      for (const conn of connections) {
        await prisma.connection.create({
          data: {
            characterId: character.id,
            connectedTo: conn.connectedTo,
            description: conn.description,
          },
        });
      }
      console.log(`✓ Created connections for: ${code}`);
    }
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
