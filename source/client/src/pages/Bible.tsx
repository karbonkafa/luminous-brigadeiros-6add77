import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CHARACTERS } from "@/lib/characters";
import type { LoreEntry } from "@shared/schema";

const LORE_CATS = [
  { key: "all", label: "Tümü" },
  { key: "teknoloji", label: "Teknoloji" },
  { key: "organizasyon", label: "Organizasyon" },
  { key: "bölge", label: "Bölge" },
  { key: "hastalık", label: "Hastalık" },
  { key: "tarih", label: "Tarih" },
];

const FACTION_COLORS: Record<string, string> = {
  "BAĞIMSIZ": "#C8963C",
  "TANIMLANAMAZ": "#2A7A7C",
  "SERBEST AJAN": "#4A8C3F",
  "ORGANİZASYON": "#2A7A7C",
  "BİLİNMEYEN": "#B89860",
  "NEXUS ŞİRKETİ": "#8A9BA8",
  "BÖLGE": "#C85C1A",
};

const REFERENCES = [
  {
    title: "Cowboy Bebop",
    type: "Anime / Dizi",
    color: "#C8963C",
    desc: "Ana referans. Bölüm yapısı, karakter dinamikleri, müzikal atmosfer. Her bölüm kendi içinde tamamlanmış ama büyük arco taşıyor. Jazz-noir tonu, gezgin karakterler, geçmişin yükü.",
    elements: ["Frekans = Bölüm adlandırması", "COLT = Spike Spiegel", "VEIL / FAYE = Faye Valentine", "Terk edilmiş istasyon = Bebop gemisi"],
  },
  {
    title: "Replaced",
    type: "Video Oyunu",
    color: "#2A7A7C",
    desc: "Oyun referansı. Retrofütüristik estetik, AI kimlik sorunu, neon-noir görsel dil. Bedenin ele geçirilmesi, gerçeklik katmanları, pixel-sinematik atmosfer.",
    elements: ["AI beden ele geçirme mekaniği", "Distopik şehir katmanları", "Kimlik ve özgür irade teması"],
  },
  {
    title: "The Gentlemen",
    type: "Film / Guy Ritchie",
    color: "#4A8C3F",
    desc: "Anlatı yapısı ve mafya estetiği referansı. Kırık zaman çizgisi, güvenilmez anlatıcı, bilgi = güç dinamiği. Şiddetin arkasındaki nezaket maskesi.",
    elements: ["FLETCHER karakteri", "BULLET = Bullet Tooth Tony", "Diyalog ritmi", "Bilgi > kuvvet"],
  },
  {
    title: "Breaking Bad",
    type: "Dizi",
    color: "#4A8C3F",
    desc: "DR. VOSS karakterinin DNA'sı. Parlak bir adamın sisteme yenik düşüp sistemi kendi çıkarı için kullanması. Ama VOSS'u Walter White'tan ayıran şey: Walter güç istedi, VOSS sadece kızını kurtarmak istedi.",
    elements: ["DR. VOSS arco'su", "Hastanede yasadışı üretim", "Düşüş değil, seçim"],
  },
  {
    title: "Dr. Strange",
    type: "Marvel / Film",
    color: "#8A9BA8",
    desc: "DR. VOSS'un yüzey karakteri için referans. En iyi cerrah, en büyük ego, en derin düşüş. Kibrin trajedi üretme kapasitesi.",
    elements: ["VOSS'un başlangıç profili", "Cerrah kimliği", "Kibir → pişmanlık arco'su"],
  },
  {
    title: "Ghost in the Shell",
    type: "Anime / Film",
    color: "#2A7A7C",
    desc: "VEIL'in felsefi arka planı. Beden, kimlik ve bilinç üçgeni. Bir AI ne zaman insan olur — ya da olabilir mi? Teknoloji ve varoluş sorusu.",
    elements: ["VEIL'in kimlik sorgusu", "Nöral arayüz dünyası", "Beden ≠ kimlik"],
  },
  {
    title: "Game of Thrones / LotR / Star Wars",
    type: "Evren Referansı",
    color: "#C8963C",
    desc: "Hedef evren büyüklüğü. Kendi mitolojisini, coğrafyasını ve kurallarını olan bir dünya. Her karakter bir parçanın sahibi. Her bölüm bir tuğla.",
    elements: ["Bölge coğrafyası", "Fraksiyon sistemi", "Uzun soluklu evren kurgusu"],
  },
];

const ROADMAP = [
  {
    phase: "FAZ 01",
    title: "Dünya Kurulumu",
    status: "aktif",
    color: "#C8963C",
    items: [
      "✓ Proje adı: PARAZIT: RESET",
      "✓ Yıl: 2042, distopik megakent",
      "✓ 8 ana karakter + kod adları",
      "✓ Temel fraksiyon sistemi (NEXUS / Organizasyon / Bölge / Bağımsız)",
      "✓ Parazit hastalığı mekanizması",
      "✓ VOSS / ECHO / VEIL üçgeni",
      "✓ RESET arc tezi (3 anlam)",
      "✓ Frekans 00 — ameliyat öncesi gece sahnesi",
      "→ Frekans yapısı (bölüm listesi)",
      "→ Dünya coğrafyası detaylandırma",
    ],
  },
  {
    phase: "FAZ 02",
    title: "Oyun Tasarımı",
    status: "bekliyor",
    color: "#2A7A7C",
    items: [
      "Oyun mekaniği: Replaced referanslı",
      "Bölüm yapısı: Her Frekans = oyun bölümü",
      "Karakter seçim / perspektif sistemi",
      "Nöral arayüz oyun mekaniği",
      "VOSS: hastane + kenevir sistemi",
      "GDD (Oyun Tasarım Dokümanı)",
    ],
  },
  {
    phase: "FAZ 03",
    title: "Senaryo — 1. Sezon",
    status: "bekliyor",
    color: "#4A8C3F",
    items: [
      "Frekans 00 — Baba (yazıldı ✓)",
      "Frekans 01 — Pilot: VEIL uyanışı",
      "Frekans 02–06 — Karakter tanıtımları",
      "Frekans 07–10 — Orta yapı: bağlantılar açılıyor",
      "Frekans 11–12 — Final: RESET çakışması",
      "Sezon sonu: VEIL tam hafızaya kavuşuyor",
    ],
  },
  {
    phase: "FAZ 04",
    title: "Görsel Geliştirme",
    status: "devam ediyor",
    color: "#B89860",
    items: [
      "✓ 8 karakter portresi (Midjourney)",
      "✓ Karakter kartları (Yield artbook stili)",
      "✓ Mood board + karakter kanon görseli",
      "→ Dünya görselleri: Bölge, NEXUS şehri, hastane",
      "→ Ara sahneler için konsept görseller",
      "→ Açılış sekansı konsepti",
    ],
  },
  {
    phase: "FAZ 05",
    title: "Platform & Prodüksiyon",
    status: "devam ediyor",
    color: "#8A9BA8",
    items: [
      "✓ Web platform: Bible + Editör + Showcase",
      "✓ Senaryo editörü: Frekanslar + post-it sistemi",
      "→ Pitch deck hazırlama",
      "→ Pilot senaryo finalizasyonu",
      "→ Oyun prototype / demo",
    ],
  },
];

export default function Bible() {
  const [activeTab, setActiveTab] = useState<"karakterler" | "dünya" | "bağlantılar" | "referanslar" | "yol-haritası">("karakterler");
  const [activeLoreCat, setActiveLoreCat] = useState("all");
  const [expandedChar, setExpandedChar] = useState<string | null>(null);

  const { data: lore = [] } = useQuery<LoreEntry[]>({
    queryKey: ["/api/lore"],
    queryFn: () => apiRequest("GET", "/api/lore"),
  });

  const filteredLore = activeLoreCat === "all" ? lore : lore.filter((l) => l.category === activeLoreCat);

  const TABS = [
    { key: "karakterler", label: "Karakterler" },
    { key: "dünya", label: "Dünya" },
    { key: "bağlantılar", label: "Bağlantılar" },
    { key: "referanslar", label: "Referanslar" },
    { key: "yol-haritası", label: "Yol Haritası" },
  ] as const;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] mb-1" style={{ color: "hsl(185 55% 45%)" }}>PROJE BİBLE</p>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(36 72% 55%)" }}>
          PARAZIT: RESET
        </h1>
        <p className="text-sm mt-1 italic" style={{ color: "hsl(40 4% 50%)" }}>2042 · Nöir · Distopik Gelecek</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-8 border-b overflow-x-auto" style={{ borderColor: "hsl(220 10% 18%)" }}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className="px-4 py-2.5 text-sm font-medium tracking-wider whitespace-nowrap transition-colors border-b-2 -mb-px"
            style={{
              color: activeTab === tab.key ? "hsl(36 72% 55%)" : "hsl(40 4% 45%)",
              borderColor: activeTab === tab.key ? "hsl(36 72% 50%)" : "transparent",
            }}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            data-testid={`tab-${tab.key}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* KARAKTERLER */}
      {activeTab === "karakterler" && (
        <div className="space-y-3">
          {CHARACTERS.map((char) => (
            <div
              key={char.code}
              className="rounded-lg overflow-hidden"
              style={{ background: "hsl(220 14% 10%)", border: "1px solid hsl(220 10% 16%)" }}
            >
              <button
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/[0.02] transition-colors"
                onClick={() => setExpandedChar(expandedChar === char.code ? null : char.code)}
                data-testid={`char-row-${char.code}`}
              >
                <div className="w-12 h-14 rounded overflow-hidden shrink-0">
                  <img src={char.portrait} alt={char.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold tracking-wide text-sm" style={{ fontFamily: "'DM Serif Display', serif", color: char.colorPrimary }}>
                      {char.name}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{
                      background: "hsl(220 12% 16%)",
                      border: `1px solid ${char.colorPrimary}40`,
                      color: FACTION_COLORS[char.faction] || "#aaa",
                    }}>
                      {char.faction}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "hsl(40 4% 50%)" }}>{char.subtitle}</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  {char.stats.slice(0, 2).map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-lg font-bold tabular-nums" style={{ color: char.colorPrimary, lineHeight: 1 }}>{s.value}</div>
                      <div className="text-xs" style={{ color: "hsl(40 4% 40%)" }}>{s.label.slice(0, 4)}</div>
                    </div>
                  ))}
                </div>
                <span className="text-xs ml-2" style={{ color: "hsl(40 4% 40%)" }}>
                  {expandedChar === char.code ? "▲" : "▼"}
                </span>
              </button>

              {expandedChar === char.code && (
                <div className="border-t px-4 pb-4 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4"
                  style={{ borderColor: "hsl(220 10% 16%)" }}>
                  <div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(40 5% 65%)" }}>{char.bio}</p>
                    <blockquote className="text-sm italic border-l-2 pl-3" style={{ borderColor: char.colorPrimary + "80", color: char.colorPrimary }}>
                      {char.quote}
                    </blockquote>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs tracking-wider mb-2" style={{ color: "hsl(40 4% 40%)" }}>BAĞLANTILAR</p>
                    {char.connections.map((c) => (
                      <div key={c.name} className="flex items-start gap-2 text-sm">
                        <span className="font-semibold shrink-0" style={{ color: char.colorPrimary }}>◆ {c.name}</span>
                        <span style={{ color: "hsl(40 4% 48%)" }}>{c.desc}</span>
                      </div>
                    ))}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {char.stats.map((s) => (
                        <div key={s.label}>
                          <div className="flex justify-between text-xs mb-0.5">
                            <span style={{ color: "hsl(40 4% 45%)" }}>{s.label}</span>
                            <span style={{ color: char.colorPrimary }} className="font-bold">{s.value}</span>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div key={i} className="h-1 flex-1 rounded-[1px]"
                                style={{ background: i < s.value ? char.colorPrimary : "hsl(220 10% 20%)" }} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* DÜNYA LORU */}
      {activeTab === "dünya" && (
        <div>
          {/* Dünya kurulum özeti */}
          <div className="mb-6 p-5 rounded-lg" style={{ background: "hsl(220 14% 10%)", border: "1px solid hsl(220 10% 16%)" }}>
            <p className="text-xs tracking-[0.25em] mb-3" style={{ color: "hsl(185 55% 45%)" }}>DÜNYA KURULUMU</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-1" style={{ color: "hsl(36 72% 55%)" }}>Zaman & Mekân</p>
                <p style={{ color: "hsl(40 5% 55%)" }}>2042. Megakorporasyonların şehirleri yönettiği distopik bir gelecek. Bedenler, organlar ve nöral veri birer ticari emtia. NEXUS Şirketi en büyük güç.</p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: "hsl(36 72% 55%)" }}>Merkezi Çatışma</p>
                <p style={{ color: "hsl(40 5% 55%)" }}>Nöral arayüz teknolojisi insanlara Parazit hastalığını bulaştırıyor. Şirket inkâr ediyor. VOSS'un antidotu var — ama bu bilgi herkesin düzenini bozar.</p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: "hsl(36 72% 55%)" }}>Merkezi Soru</p>
                <p style={{ color: "hsl(40 5% 55%)" }}>Bir şeyi sıfırlamak onu yok eder mi, yoksa özünü ortaya çıkarır mı? Geçmişin olmadan kim olabilirsin — ve geçmişin varken kim olmayı seçersin?</p>
              </div>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {LORE_CATS.map((cat) => (
              <button
                key={cat.key}
                className="px-3 py-1 rounded text-xs font-medium tracking-wide transition-colors"
                style={{
                  background: activeLoreCat === cat.key ? "hsl(36 72% 50%)" : "hsl(220 12% 14%)",
                  color: activeLoreCat === cat.key ? "hsl(220 15% 7%)" : "hsl(40 4% 55%)",
                  border: "1px solid",
                  borderColor: activeLoreCat === cat.key ? "transparent" : "hsl(220 10% 20%)",
                }}
                onClick={() => setActiveLoreCat(cat.key)}
                data-testid={`lore-cat-${cat.key}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filteredLore.length === 0 ? (
            <div className="text-center py-16" style={{ color: "hsl(40 4% 38%)" }}>
              <p className="text-4xl mb-3">◊</p>
              <p className="text-sm">Bu kategoride kayıt yok</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLore.map((entry) => (
                <div key={entry.id} className="p-4 rounded-lg"
                  style={{ background: "hsl(220 14% 10%)", border: "1px solid hsl(220 10% 16%)" }}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm" style={{ color: "hsl(36 72% 55%)" }}>{entry.title}</h3>
                    <span className="text-xs px-1.5 py-0.5 rounded ml-2 shrink-0" style={{ background: "hsl(220 12% 16%)", color: "hsl(185 55% 45%)" }}>
                      {entry.category}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(40 4% 58%)" }}>{entry.content}</p>
                  {entry.tags && JSON.parse(entry.tags).length > 0 && (
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {(JSON.parse(entry.tags) as string[]).map((tag) => (
                        <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ background: "hsl(220 10% 16%)", color: "hsl(40 4% 45%)" }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BAĞLANTILAR */}
      {activeTab === "bağlantılar" && (
        <div className="space-y-4">
          {/* GREY merkez kutusu */}
          <div className="p-4 rounded-lg mb-6 text-center" style={{ background: "hsl(220 14% 10%)", border: "1px solid hsl(220 10% 22%)" }}>
            <p className="text-xs tracking-[0.3em] mb-1" style={{ color: "hsl(40 4% 40%)" }}>MERKEZ NOKTA</p>
            <p className="text-sm font-bold" style={{ color: "#8A9BA8" }}>GREY — herkesi bağlayan ip</p>
            <p className="text-xs mt-1" style={{ color: "hsl(40 4% 42%)" }}>VOSS'u susturan · COLT'u kullanan · VEIL'i programlayan · RESET operasyonunun mimarı</p>
          </div>

          <p className="text-sm mb-4" style={{ color: "hsl(40 4% 48%)" }}>
            Karakterler arasındaki ilişki ağı. Her bağlantı bir hikaye ipucu.
          </p>
          {CHARACTERS.map((char) => (
            char.connections.length > 0 && (
              <div key={char.code} className="flex items-start gap-4 py-3 border-b last:border-0"
                style={{ borderColor: "hsl(220 10% 15%)" }}>
                <div className="w-10 h-12 rounded overflow-hidden shrink-0">
                  <img src={char.portrait} alt={char.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1">
                  <span className="font-bold text-sm" style={{ color: char.colorPrimary }}>{char.name}</span>
                  <div className="mt-1.5 space-y-1">
                    {char.connections.map((c) => (
                      <div key={c.name} className="flex items-center gap-2 text-sm">
                        <div className="w-12 h-px shrink-0" style={{ background: `${char.colorPrimary}60` }} />
                        <span style={{ color: "hsl(40 4% 60%)" }}>
                          <span className="font-medium" style={{ color: "hsl(40 6% 72%)" }}>{c.name}</span>
                          {" — "}{c.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* REFERANSLAR */}
      {activeTab === "referanslar" && (
        <div className="space-y-4">
          <p className="text-sm mb-6" style={{ color: "hsl(40 4% 48%)" }}>
            Projenin beslendği kaynaklar. Her referans belirli bir karaktere, mekanizmaya veya tona katkı sağlıyor.
          </p>
          {REFERENCES.map((ref) => (
            <div key={ref.title} className="p-4 rounded-lg"
              style={{ background: "hsl(220 14% 10%)", border: `1px solid ${ref.color}30` }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-sm" style={{ fontFamily: "'DM Serif Display', serif", color: ref.color }}>
                    {ref.title}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "hsl(40 4% 42%)" }}>{ref.type}</p>
                </div>
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: ref.color }} />
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(40 5% 58%)" }}>{ref.desc}</p>
              <div className="flex flex-wrap gap-2">
                {ref.elements.map((el) => (
                  <span key={el} className="text-xs px-2 py-0.5 rounded"
                    style={{ background: `${ref.color}15`, color: ref.color, border: `1px solid ${ref.color}30` }}>
                    {el}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* YOL HARİTASI */}
      {activeTab === "yol-haritası" && (
        <div className="space-y-4">
          <p className="text-sm mb-6" style={{ color: "hsl(40 4% 48%)" }}>
            Projenin üretim yol haritası. Oyun önce, dizi sonra.
          </p>

          {/* Arc tezi özeti */}
          <div className="p-4 rounded-lg mb-6" style={{ background: "hsl(220 14% 10%)", border: "1px solid hsl(36 72% 30%)" }}>
            <p className="text-xs tracking-[0.3em] mb-2" style={{ color: "hsl(36 72% 50%)" }}>ARC TEZİ — PARAZIT: RESET</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded" style={{ background: "hsl(220 12% 13%)" }}>
                <p className="font-semibold mb-1" style={{ color: "#2A7A7C" }}>VEIL'in RESET'i</p>
                <p style={{ color: "hsl(40 5% 52%)" }}>Hafıza silme. AI bedenin kontrolünü aldı. ECHO hâlâ var mı?</p>
              </div>
              <div className="p-3 rounded" style={{ background: "hsl(220 12% 13%)" }}>
                <p className="font-semibold mb-1" style={{ color: "#8A9BA8" }}>Şirketin RESET'i</p>
                <p style={{ color: "hsl(40 5% 52%)" }}>Sistem sıfırlama. Parazit bölgelerini temizle, kanıtları sil.</p>
              </div>
              <div className="p-3 rounded" style={{ background: "hsl(220 12% 13%)" }}>
                <p className="font-semibold mb-1" style={{ color: "#C8963C" }}>COLT'un RESET'i</p>
                <p style={{ color: "hsl(40 5% 52%)" }}>Yeniden başlama. Unutmadan nasıl başlarsın?</p>
              </div>
            </div>
            <p className="text-xs mt-3 italic" style={{ color: "hsl(40 5% 40%)" }}>
              "Geçmişin olmadan kim olabilirsin — ve geçmişin varken kim olmayı seçersin?"
            </p>
          </div>

          {ROADMAP.map((phase) => (
            <div key={phase.phase} className="rounded-lg overflow-hidden"
              style={{ border: `1px solid ${phase.color}30` }}>
              <div className="flex items-center gap-3 px-4 py-3"
                style={{ background: `${phase.color}12` }}>
                <span className="text-xs font-bold tracking-[0.2em]" style={{ color: phase.color }}>{phase.phase}</span>
                <span className="font-semibold text-sm" style={{ color: "hsl(40 5% 75%)" }}>{phase.title}</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: phase.status === "aktif" ? `${phase.color}25` : phase.status === "devam ediyor" ? "hsl(185 55% 12%)" : "hsl(220 12% 16%)",
                    color: phase.status === "aktif" ? phase.color : phase.status === "devam ediyor" ? "hsl(185 55% 50%)" : "hsl(40 4% 42%)",
                    border: `1px solid ${phase.status === "aktif" ? phase.color + "40" : phase.status === "devam ediyor" ? "hsl(185 55% 25%)" : "hsl(220 10% 22%)"}`,
                  }}>
                  {phase.status === "aktif" ? "● Aktif" : phase.status === "devam ediyor" ? "◐ Devam Ediyor" : "○ Bekliyor"}
                </span>
              </div>
              <div className="px-4 pb-4 pt-2 grid grid-cols-1 md:grid-cols-2 gap-1">
                {phase.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 py-0.5 text-sm">
                    <span style={{ color: item.startsWith("✓") ? phase.color : item.startsWith("→") ? "hsl(185 55% 40%)" : "hsl(40 4% 35%)" }}>
                      {item.startsWith("✓") ? "" : item.startsWith("→") ? "" : "·"}
                    </span>
                    <span style={{ color: item.startsWith("✓") ? "hsl(40 5% 60%)" : item.startsWith("→") ? "hsl(40 5% 52%)" : "hsl(40 4% 38%)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
