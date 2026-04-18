import { useState } from "react";
import { CHARACTERS, type Character } from "@/lib/characters";
import { Link } from "wouter";

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400 tracking-wider font-medium">{label}</span>
        <span style={{ color: "hsl(36 72% 55%)" }} className="font-bold tabular-nums">{value}</span>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-[1px]"
            style={{
              background: i < value ? "hsl(36 72% 50%)" : "hsl(220 10% 20%)",
              opacity: i < value ? 1 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CharacterModal({ char, onClose }: { char: Character; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-lg overflow-hidden"
        style={{ background: "hsl(220 14% 10%)", border: "1px solid hsl(220 10% 20%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 h-[520px]">
          {/* Portrait */}
          <div className="relative overflow-hidden">
            <img src={char.portrait} alt={char.name} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, hsl(220 14% 10%))" }} />
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col gap-4 overflow-y-auto">
            <div>
              <p className="text-xs tracking-[0.2em] mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                CHARACTER DOSSIER
              </p>
              <h2 className="text-3xl font-bold tracking-wide" style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(36 72% 55%)" }}>
                {char.name}
              </h2>
              <p className="italic text-sm mt-0.5" style={{ color: "hsl(40 5% 65%)" }}>{char.subtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs tracking-wider px-2 py-1 rounded" style={{ background: "hsl(220 12% 16%)", border: "1px solid hsl(220 10% 25%)", color: "hsl(185 55% 45%)" }}>
                {char.faction}
              </span>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "hsl(40 5% 68%)" }}>{char.bio}</p>

            <blockquote className="text-sm italic border-l-2 pl-3" style={{ borderColor: "hsl(36 72% 40%)", color: "hsl(36 72% 60%)" }}>
              {char.quote}
            </blockquote>

            <div className="space-y-3 mt-1">
              {char.stats.map((s) => <StatBar key={s.label} label={s.label} value={s.value} />)}
            </div>

            {char.connections.length > 0 && (
              <div>
                <p className="text-xs tracking-[0.2em] mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>BAĞLANTILAR</p>
                <div className="space-y-1.5">
                  {char.connections.map((c) => (
                    <div key={c.name} className="flex items-start gap-2 text-sm">
                      <span style={{ color: "hsl(36 72% 55%)" }} className="font-semibold shrink-0">{c.name}</span>
                      <span style={{ color: "hsl(40 4% 50%)" }}>— {c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-white transition-colors"
          style={{ background: "hsl(220 14% 14%)" }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default function Showcase() {
  const [selected, setSelected] = useState<Character | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "hsl(220 15% 5%)" }}>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(185 55% 15% / 0.4) 0%, transparent 70%)",
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-8 py-24 text-center">
          {/* Logo SVG */}
          <div className="flex justify-center mb-6">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="PARAZIT: RESET">
              <circle cx="24" cy="24" r="20" stroke="hsl(36 72% 50%)" strokeWidth="1.5" />
              <circle cx="24" cy="24" r="14" stroke="hsl(185 55% 38%)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="24" cy="24" r="4" fill="hsl(36 72% 50%)" />
              <line x1="4" y1="24" x2="20" y2="24" stroke="hsl(36 72% 50%)" strokeWidth="1.5" />
              <line x1="28" y1="24" x2="44" y2="24" stroke="hsl(36 72% 50%)" strokeWidth="1.5" />
            </svg>
          </div>

          <p className="text-xs tracking-[0.35em] mb-3" style={{ color: "hsl(185 55% 45%)" }}>2042 · NEOİR · OYUN + DİZİ</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-[0.05em] mb-4"
            style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(36 72% 55%)" }}>
            PARAZIT:<br />RESET
          </h1>
          <p className="text-lg italic max-w-lg mx-auto" style={{ color: "hsl(40 5% 58%)" }}>
            "İnsan olmak öğrenilen bir şey mi, yoksa hatırlanan bir şey mi?"
          </p>

          <div className="flex justify-center gap-3 mt-8">
            <Link href="/bible" className="px-5 py-2.5 rounded text-sm font-medium tracking-wide transition-all"
              style={{ background: "hsl(36 72% 50%)", color: "hsl(220 15% 7%)" }}
              data-testid="link-bible">
              Bible'a Git →
            </Link>
            <Link href="/editor" className="px-5 py-2.5 rounded text-sm font-medium tracking-wide border transition-all"
              style={{ borderColor: "hsl(185 55% 30%)", color: "hsl(185 55% 55%)" }}
              data-testid="link-editor">
              Senaryo Editörü
            </Link>
          </div>
        </div>
      </div>

      {/* Karakterler */}
      <div className="max-w-6xl mx-auto px-8 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.3em]" style={{ color: "hsl(var(--muted-foreground))" }}>KARAKTERLER</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, hsl(220 10% 22%), transparent)" }} />
          <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>8 AJAN</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CHARACTERS.map((char) => (
            <button
              key={char.code}
              className="char-card rounded-lg overflow-hidden text-left group relative"
              style={{ aspectRatio: "9/14", border: "1px solid hsl(220 10% 16%)" }}
              onClick={() => setSelected(char)}
              data-testid={`card-character-${char.code}`}
            >
              <img
                src={char.cardImage}
                alt={char.name}
                className="w-full h-full object-cover object-top absolute inset-0"
              />
              <div className="absolute inset-0" style={{
                background: `linear-gradient(to top, hsl(220 15% 5%) 0%, transparent 50%)`,
              }} />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="font-bold text-sm tracking-wider" style={{ fontFamily: "'DM Serif Display', serif", color: char.colorPrimary }}>
                  {char.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "hsl(40 4% 55%)" }}>{char.subtitle}</p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.3)" }}>
                <span className="text-xs tracking-wider px-3 py-1.5 rounded" style={{ background: "hsl(220 14% 12%)", color: "hsl(36 72% 55%)" }}>
                  DOSYA AÇ
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dünya özeti */}
      <div className="border-t max-w-none" style={{ borderColor: "hsl(220 10% 14%)" }}>
        <div className="max-w-4xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "2042 · Dünya", desc: "Megakorporasyonlar şehirleri yönetiyor. Bedenler, organlar ve nöral veri birer ticari emtia. Şirket duvarlarının dışı 'Bölge'." },
            { title: "Parazit Hastalığı", desc: "Nöral arayüz teknolojisinin yarattığı kimlik parçalanması sendromu. Şirketler varlığını inkâr ediyor. Voss araştırıyor." },
            { title: "Frekanslar", desc: "Hikayeler 'Frekans' adı verilen bölümler halinde anlatılıyor. Her frekans, karakterlerin geçmişiyle yüzleştiği bir an." },
          ].map((item) => (
            <div key={item.title} className="space-y-2">
              <h3 className="text-sm font-semibold tracking-wide" style={{ color: "hsl(36 72% 55%)" }}>
                ◆ {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(40 4% 55%)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Character modal */}
      {selected && <CharacterModal char={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
