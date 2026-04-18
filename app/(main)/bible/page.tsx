'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getStatColor } from '@/lib/utils';

interface Character {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  faction: string;
  bio: string;
  quote: string;
  colorPrimary: string;
  colorSecondary: string;
  stats: Array<{ label: string; value: number }>;
  connections: Array<{ connectedTo: string; description: string }>;
}

export default function BiblePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-text-secondary">Yükleniyor...</p>
        </div>
      }
    >
      <BiblePageContent />
    </Suspense>
  );
}

function BiblePageContent() {
  const searchParams = useSearchParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  const selectedCode = searchParams.get('char');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch('/api/characters');
        const data = await res.json();
        if (data.success) {
          const chars = data.data;
          setCharacters(chars);

          // Auto-select first character or from query param
          if (selectedCode) {
            const found = chars.find((c: Character) => c.code === selectedCode);
            setSelectedChar(found || chars[0]);
          } else {
            setSelectedChar(chars[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [selectedCode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-text-secondary">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-bg-dark">
      {/* Character List */}
      <div className="w-60 border-r border-border-primary overflow-y-auto">
        <div className="p-4 border-b border-border-primary sticky top-0 bg-bg-card/80 backdrop-blur">
          <h2 className="font-display text-lg glow-accent">Karakterler</h2>
        </div>
        <div className="p-2">
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={() => setSelectedChar(char)}
              className="w-full text-left p-3 rounded mb-2 transition-all"
              style={{
                background:
                  selectedChar?.id === char.id
                    ? `${char.colorPrimary}30`
                    : 'transparent',
                borderLeft:
                  selectedChar?.id === char.id
                    ? `3px solid ${char.colorPrimary}`
                    : '3px solid transparent',
                color: selectedChar?.id === char.id ? char.colorPrimary : 'inherit',
              }}
            >
              <div className="font-semibold text-sm">{char.code}</div>
              <div className="text-xs text-text-secondary">{char.subtitle}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Character Detail */}
      {selectedChar && (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
              <div
                className="text-4xl font-display font-bold mb-2"
                style={{ color: selectedChar.colorPrimary }}
              >
                {selectedChar.name}
              </div>
              <div className="text-lg text-text-secondary mb-3">{selectedChar.subtitle}</div>
              <div className="flex gap-2">
                <span
                  className="px-3 py-1 rounded text-sm"
                  style={{
                    background: selectedChar.colorSecondary + '40',
                    color: selectedChar.colorPrimary,
                  }}
                >
                  {selectedChar.faction}
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-2 pl-4 mb-8" style={{ borderColor: selectedChar.colorPrimary }}>
              <p className="text-lg italic text-text-primary">{selectedChar.quote}</p>
            </div>

            {/* Bio */}
            <section className="mb-12">
              <h3 className="text-xl font-display font-bold glow-accent mb-4">Biyografi</h3>
              <p className="text-text-secondary leading-relaxed">{selectedChar.bio}</p>
            </section>

            {/* Stats */}
            <section className="mb-12">
              <h3 className="text-xl font-display font-bold glow-accent mb-6">İstatistikler</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {selectedChar.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-text-primary">{stat.label}</span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: selectedChar.colorPrimary }}
                      >
                        {stat.value}/10
                      </span>
                    </div>
                    <div className="w-full bg-border-primary rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${(stat.value / 10) * 100}%`,
                          background: selectedChar.colorPrimary,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Connections */}
            {selectedChar.connections.length > 0 && (
              <section>
                <h3 className="text-xl font-display font-bold glow-accent mb-6">İlişkiler</h3>
                <div className="space-y-4">
                  {selectedChar.connections.map((conn, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded border"
                      style={{
                        borderColor: selectedChar.colorSecondary,
                        background: selectedChar.colorSecondary + '10',
                      }}
                    >
                      <div
                        className="font-semibold mb-2"
                        style={{ color: selectedChar.colorPrimary }}
                      >
                        ↔ {conn.connectedTo}
                      </div>
                      <p className="text-sm text-text-secondary">{conn.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
