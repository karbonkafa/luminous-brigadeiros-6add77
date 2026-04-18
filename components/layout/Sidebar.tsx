'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BookOpen, Zap } from 'lucide-react';

const navItems = [
  { href: '/', label: 'SHOWCASE', icon: '◉', desc: 'Ana Sahne', testId: 'nav-home' },
  { href: '/bible', label: 'BİBLE', icon: '◈', desc: 'Karakter & Dünya', testId: 'nav-bible' },
  { href: '/editor', label: 'SENARYO', icon: '◎', desc: 'Frekans Editörü', testId: 'nav-editor' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-14 border-r flex flex-col items-center py-4 gap-1 shrink-0"
      style={{
        background: 'hsl(220 15% 7%)',
        borderColor: 'hsl(220 10% 14%)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="mb-4 group" title="PARAZIT: RESET">
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="hsl(36 72% 50%)" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="4" fill="hsl(36 72% 50%)" />
          <line x1="4" y1="24" x2="20" y2="24" stroke="hsl(36 72% 50%)" strokeWidth="1.5" />
          <line x1="28" y1="24" x2="44" y2="24" stroke="hsl(36 72% 50%)" strokeWidth="1.5" />
        </svg>
      </Link>

      <div className="w-6 h-px mb-2" style={{ background: 'hsl(220 10% 20%)' }} />

      {/* Nav Items */}
      {navItems.map(({ href, label, icon, desc, testId }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className="relative w-10 h-10 flex items-center justify-center rounded transition-all group"
            style={{
              background: isActive ? 'hsl(220 12% 16%)' : 'transparent',
              color: isActive ? 'hsl(36 72% 55%)' : 'hsl(40 4% 45%)',
              borderRight: isActive ? '2px solid hsl(36 72% 50%)' : '2px solid transparent',
            }}
            title={label}
            data-testid={testId}
          >
            <span className="text-sm font-semibold">{icon}</span>

            {/* Tooltip */}
            <span
              className="absolute left-12 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
              style={{
                background: 'hsl(220 14% 14%)',
                border: '1px solid hsl(220 10% 22%)',
                color: 'hsl(40 5% 70%)',
              }}
            >
              <span className="font-semibold" style={{ color: 'hsl(36 72% 55%)' }}>
                {label}
              </span>
              <br />
              <span style={{ color: 'hsl(40 4% 50%)' }}>{desc}</span>
            </span>
          </Link>
        );
      })}
    </aside>
  );
}
