'use client';

import { useEffect, useState } from 'react';
import { CharacterCard } from '@/components/characters/CharacterCard';

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
  connections: any[];
}

export default function ShowcasePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch('/api/characters');
        const data = await res.json();
        if (data.success) {
          setCharacters(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-accent-gold mb-4">⟳</div>
          <p className="text-text-secondary">Karakterler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border-primary">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 glow-accent">
            PARAZIT: RESET
          </h1>
          <p className="text-lg text-text-secondary mb-2">2042 - Şehirleri Kontrol Edenler</p>
          <p className="text-sm text-text-muted max-w-2xl mx-auto">
            Megakorporasyonların şehirleri yönettiği, beyin-bilgisayar arayüzünün sıradan bir ürün
            haline geldiği bir dünya. Sekiz karakter. Bir frekans. Sonsuz olasılıklar.
          </p>
        </div>
      </section>

      {/* Characters Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-display font-bold glow-accent mb-8">Karakterler</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((char) => (
            <div key={char.id} className="animate-in">
              <CharacterCard {...char} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
