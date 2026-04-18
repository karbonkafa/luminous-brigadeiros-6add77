import Link from 'next/link';
import { getStatColor } from '@/lib/utils';

interface CharacterCardProps {
  code: string;
  name: string;
  subtitle: string;
  faction: string;
  colorPrimary: string;
  colorSecondary: string;
  bio: string;
  stats: Array<{ label: string; value: number }>;
}

export function CharacterCard({
  code,
  name,
  subtitle,
  faction,
  colorPrimary,
  colorSecondary,
  bio,
  stats,
}: CharacterCardProps) {
  return (
    <Link href={`/bible?char=${code}`}>
      <div
        className="group cursor-pointer rounded-lg overflow-hidden border transition-all hover:border-accent-gold hover:shadow-lg"
        style={{
          borderColor: colorSecondary,
          backgroundColor: 'hsl(220 12% 10%)',
        }}
      >
        {/* Header */}
        <div
          className="p-4 border-b"
          style={{
            borderColor: colorSecondary,
            background: `linear-gradient(135deg, ${colorPrimary}20, ${colorSecondary}10)`,
          }}
        >
          <div
            className="text-lg font-bold tracking-wider glow-accent mb-1"
            style={{ color: colorPrimary }}
          >
            {name}
          </div>
          <div className="text-xs text-text-secondary mb-2">{subtitle}</div>
          <div className="text-xs px-2 py-1 rounded inline-block" style={{ background: colorSecondary + '30', color: colorPrimary }}>
            {faction}
          </div>
        </div>

        {/* Bio */}
        <div className="p-4">
          <p className="text-xs text-text-secondary line-clamp-3 mb-4">
            {bio}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2">
            {stats.slice(0, 4).map((stat) => (
              <div key={stat.label} className="text-xs">
                <div className="text-text-muted mb-1">{stat.label}</div>
                <div className="w-full bg-border-primary rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${(stat.value / 10) * 100}%`,
                      background: colorPrimary,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-4 py-2 border-t text-xs text-text-muted group-hover:text-accent-gold transition-colors"
          style={{ borderColor: colorSecondary }}
        >
          Detayları Gör →
        </div>
      </div>
    </Link>
  );
}
