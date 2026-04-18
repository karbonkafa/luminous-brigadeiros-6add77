'use client';

import { usePathname } from 'next/navigation';

const labels: Record<string, string> = {
  '/': 'SHOWCASE',
  '/bible': 'BİBLE',
  '/editor': 'SENARYO EDİTÖRÜ',
};

export function Header() {
  const pathname = usePathname();
  const currentLabel = Object.entries(labels).find(([path]) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  })?.[1] || 'PARAZIT: RESET';

  return (
    <header
      className="h-14 border-b px-4 flex items-center gap-3 shrink-0"
      style={{
        background: 'hsl(220 15% 7%)',
        borderColor: 'hsl(220 10% 14%)',
      }}
    >
      <span className="text-xs tracking-[0.3em]" style={{ color: 'hsl(40 4% 38%)' }}>
        ◆
      </span>
      <span className="text-xs tracking-[0.2em] font-medium" style={{ color: 'hsl(36 72% 55%)' }}>
        PARAZIT: RESET
      </span>
      <span className="text-xs" style={{ color: 'hsl(220 10% 28%)' }}>
        ·
      </span>
      <span className="text-xs tracking-[0.15em]" style={{ color: 'hsl(40 4% 45%)' }}>
        {currentLabel}
      </span>
      <div className="flex-1" />
      <span className="text-xs" style={{ color: 'hsl(220 10% 28%)' }}>
        2042
      </span>
    </header>
  );
}
