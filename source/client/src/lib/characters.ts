import { CHARACTER_IMAGES } from "./characterImages";

export interface Character {
  code: string;
  name: string;
  subtitle: string;
  faction: string;
  bio: string;
  quote: string;
  colorPrimary: string;
  colorSecondary: string;
  connections: { name: string; desc: string }[];
  stats: { label: string; value: number }[];
  cardImage: string;
  portrait: string;
}

export const CHARACTERS: Character[] = [
  {
    code: "COLT",
    name: "COLT",
    subtitle: "Eski Şirket Operatifi",
    faction: "BAĞIMSIZ",
    bio: "Şirket için elleri kan içindeyken artık kimin için dövüştüğünü bilmiyor. 2042'nin yağmur ıslatılmış sokaklarında geçmişinden kaçan bir figür. VEIL ile yolları bir kazayla kesişti — bu kazanın tesadüf olmadığını henüz bilmiyor.",
    quote: '"Unutmak için değil. Taşımak için."',
    colorPrimary: "#C8963C",
    colorSecondary: "#2A7A7C",
    connections: [
      { name: "VEIL", desc: "Aynı kazanın iki tarafı — birbirinin aynası" },
      { name: "BULLET", desc: "Geçmişten bir kesişim noktası" },
      { name: "GREY", desc: "Kullanan, terk eden, silen" },
      { name: "DR. VOSS", desc: "COLT'un geçmişi VOSS operasyonuyla bağlantılı" },
    ],
    stats: [
      { label: "SAVAŞ", value: 9 },
      { label: "TÜKENMİŞLİK", value: 7 },
      { label: "SADAKAT", value: 5 },
      { label: "GİZEM", value: 6 },
    ],
    cardImage: CHARACTER_IMAGES.COLT.card,
    portrait: CHARACTER_IMAGES.COLT.portrait,
  },
  {
    code: "VEIL",
    name: "VEIL / FAYE",
    subtitle: "AI — ECHO'nun Bedeninde",
    faction: "TANIMLANAMAZ",
    bio: "Dr. Voss'un nöral entegrasyon prosedürünün ürünü. ECHO'nun bedeninde uyandı — geçmişsiz, kimsesiz, ama hisseden. Bazen ECHO'nun anılarının kalıntılarını görüyor. Şirket onu bir silah olarak tasarladı. Ne olduğunu kendisi de bilmiyor.",
    quote: '"İnsan olmak öğrenilen bir şey mi, yoksa hatırlanan bir şey mi?"',
    colorPrimary: "#2A7A7C",
    colorSecondary: "#C8963C",
    connections: [
      { name: "ECHO", desc: "Aynı beden — ECHO hâlâ bir yerde var mı?" },
      { name: "DR. VOSS", desc: "Onu yaratan eller — babasının elleri" },
      { name: "COLT", desc: "Birbirinin aynası, farklı türden kayıplar" },
      { name: "GREY", desc: "Yaratan, programlayan, sahiplenen" },
    ],
    stats: [
      { label: "VERİ", value: 10 },
      { label: "DUYGU", value: 4 },
      { label: "KONTROL", value: 3 },
      { label: "VARLIK", value: 8 },
    ],
    cardImage: CHARACTER_IMAGES.VEIL.card,
    portrait: CHARACTER_IMAGES.VEIL.portrait,
  },
  {
    code: "VOSS",
    name: "DR. VOSS",
    subtitle: "Nörolog — Kızını Kaybeden Baba",
    faction: "SERBEST AJAN",
    bio: "2042'nin en parlak beyin cerrahı. Kızı ECHO'yu kurtarmak için AI-nöral entegrasyon prosedürünü geliştirdi — yasadışı, denenmemiş, tek çözüm. Prosedür ECHO'nun bedenini ayakta tuttu, ama içindeki kim olduğu tartışmalı. Şirket çalışmasını susturdu. Fletcher'ın hastanesine sığındı. Bodrum katta kenevir yetiştiriyor — zevk için değil, Parazit hastalığına antidot sentezlemek için.",
    quote: '"Kibir değildi. Sadece haklıydım. Ve bu daha kötü."',
    colorPrimary: "#4A8C3F",
    colorSecondary: "#C8963C",
    connections: [
      { name: "ECHO", desc: "Kızı — prosedürün hem amacı hem bedeli" },
      { name: "VEIL", desc: "Yarattığı varlık — içinde ECHO var mı bilmiyor" },
      { name: "FLETCHER", desc: "Koruyor, ama sahipleniyor" },
      { name: "GREY", desc: "Şirket onu susturdu, araştırmasını çaldı" },
    ],
    stats: [
      { label: "ZEKİ", value: 10 },
      { label: "KIBIR", value: 9 },
      { label: "SUÇLULUK", value: 10 },
      { label: "RİSK", value: 8 },
    ],
    cardImage: CHARACTER_IMAGES.VOSS.card,
    portrait: CHARACTER_IMAGES.VOSS.portrait,
  },
  {
    code: "FLETCHER",
    name: "FLETCHER",
    subtitle: "Mafya Lideri",
    faction: "ORGANİZASYON",
    bio: "Şiddet kullanmaz — bilgi kullanır. Nezaket maskesi hiç düşmez. VOSS'u koruyor çünkü özel bir hastaneye ihtiyacı var — hem kendi yaralıları için hem başka işler için. Ama VOSS'un ne üzerinde çalıştığının değerini biliyor.",
    quote: '"Güç, bağırmakta değil. Gülümsemekte."',
    colorPrimary: "#2A7A7C",
    colorSecondary: "#8B6914",
    connections: [
      { name: "DR. VOSS", desc: "Koruyor, ama sahipleniyor — VOSS'un araştırması paha biçilmez" },
      { name: "BULLET", desc: "Güvenilen tek saha adamı" },
      { name: "GREY", desc: "Şirketle paralel çıkarlar — tehlikeli denge" },
    ],
    stats: [
      { label: "GÜÇ", value: 8 },
      { label: "ZEKÂ", value: 10 },
      { label: "KARİZMA", value: 10 },
      { label: "TEHLİKE", value: 7 },
    ],
    cardImage: CHARACTER_IMAGES.FLETCHER.card,
    portrait: CHARACTER_IMAGES.FLETCHER.portrait,
  },
  {
    code: "BULLET",
    name: "BULLET",
    subtitle: "Fletcher'ın Sağ Kolu",
    faction: "ORGANİZASYON",
    bio: "Fletcher ne derse yapar. Ne sorarsa cevaplar. Ama COLT'un geçmişiyle bir bağlantısı var — o bağlantı bir gün ikisini de aynı odaya kapatacak.",
    quote: '"Soru sormam. Bitiririm."',
    colorPrimary: "#2A7A7C",
    colorSecondary: "#C8963C",
    connections: [
      { name: "FLETCHER", desc: "Emreder, o yapar — sorgulamaz" },
      { name: "COLT", desc: "Geçmişte bir kesişim noktası — ikisi de biliyor" },
    ],
    stats: [
      { label: "KUVVET", value: 10 },
      { label: "HIZ", value: 8 },
      { label: "SADAKAT", value: 9 },
      { label: "ŞÜPHE", value: 3 },
    ],
    cardImage: CHARACTER_IMAGES.BULLET.card,
    portrait: CHARACTER_IMAGES.BULLET.portrait,
  },
  {
    code: "ECHO",
    name: "ECHO",
    subtitle: "Dr. Voss'un Kızı — Kayıp Kimlik",
    faction: "BİLİNMEYEN",
    bio: "VOSS'un kızı. 2042'de ölmek üzereydi — baba prosedürü denedi, beden kurtarıldı, içindeki kim olduğu belirsiz. VEIL o bedenin içinde uyandı. ECHO hâlâ var mı? Bazen VEIL bir şey hissediyor — tanımadığı bir ses, hatırlamadığı bir yüz. Belki bir yankı. Belki bir hayalet.",
    quote: '"Ben buradaydım. Hâlâ buradayım."',
    colorPrimary: "#B89860",
    colorSecondary: "#D4D0C8",
    connections: [
      { name: "DR. VOSS", desc: "Babası — onu kurtarmak isterken kaybetti" },
      { name: "VEIL", desc: "Aynı beden — ECHO'nun kalıntıları VEIL'de iz bırakıyor" },
    ],
    stats: [
      { label: "VARLIK", value: 3 },
      { label: "ETKİ", value: 7 },
      { label: "GİZEM", value: 10 },
      { label: "HAFIZA", value: 6 },
    ],
    cardImage: CHARACTER_IMAGES.ECHO.card,
    portrait: CHARACTER_IMAGES.ECHO.portrait,
  },
  {
    code: "GREY",
    name: "GREY",
    subtitle: "Şirket Temsilcisi — Bağlayan İp",
    faction: "NEXUS ŞİRKETİ",
    bio: "Ne iyi, ne kötü. Sadece şirket. VOSS'u susturan, COLT'u kullanan, VEIL'i programlayan. RESET operasyonunun mimarı. Parazit hastalığının varlığını inkâr eden protokolün sahibi. Soğuk bir yüz, mükemmel bir duruş — ve her şeyin ortasındaki tek ortak nokta.",
    quote: '"Kişisel değil. Hiçbir zaman kişisel değil."',
    colorPrimary: "#8A9BA8",
    colorSecondary: "#D4D8DC",
    connections: [
      { name: "VEIL", desc: "Yaratan, programlayan — bir silah olarak tasarladı" },
      { name: "COLT", desc: "Kullanan, terk eden — COLT bunu henüz bilmiyor" },
      { name: "DR. VOSS", desc: "Araştırmasını çaldı, susturdu, sürgüne yolladı" },
      { name: "FLETCHER", desc: "Paralel çıkarlar — tehlikeli, kırılgan denge" },
    ],
    stats: [
      { label: "KONTROL", value: 10 },
      { label: "SOĞUKLUK", value: 10 },
      { label: "İNSANLIK", value: 1 },
      { label: "ERİŞİM", value: 9 },
    ],
    cardImage: CHARACTER_IMAGES.GREY.card,
    portrait: CHARACTER_IMAGES.GREY.portrait,
  },
  {
    code: "DUTCH",
    name: "DUTCH",
    subtitle: "Bölge Rehberi",
    faction: "BÖLGE",
    bio: "Her şeyi biliyor ama dahil olmuyordu. Ta ki zorunda kalana kadar. Sokaklar onu büyüttü, 2042'nin Bölgesi onu zor etti. Parazit hastalığının Bölge'de ne yaptığını ilk gören o — ve şirkete raporlamadı.",
    quote: '"Ben sana yolu gösteririm. Gitmek sana kalmış."',
    colorPrimary: "#C85C1A",
    colorSecondary: "#2A5A8C",
    connections: [
      { name: "COLT", desc: "Bölge'nin geçidi — güvenilebilecek tek isim" },
      { name: "VEIL", desc: "Ne olduğunu anlayan — ECHO'yu tanıyordu" },
    ],
    stats: [
      { label: "SOKAK", value: 10 },
      { label: "GÜVENİLİR", value: 7 },
      { label: "DAYANIKLI", value: 9 },
      { label: "GİZEM", value: 5 },
    ],
    cardImage: CHARACTER_IMAGES.DUTCH.card,
    portrait: CHARACTER_IMAGES.DUTCH.portrait,
  },
];
