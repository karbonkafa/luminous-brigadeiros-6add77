import { Switch, Route, Router, Link, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useEffect } from "react";
import Showcase from "@/pages/Showcase";
import Bible from "@/pages/Bible";
import Editor from "@/pages/Editor";
import NotFound from "@/pages/not-found";

function Sidebar() {
  const [location] = useHashLocation();

  const navItems = [
    { path: "/", label: "SHOWCASE", icon: "◉", desc: "Ana Sahne" },
    { path: "/bible", label: "BİBLE", icon: "◈", desc: "Karakter & Dünya" },
    { path: "/editor", label: "SENARYO", icon: "◎", desc: "Frekans Editörü" },
  ];

  return (
    <aside className="w-14 border-r flex flex-col items-center py-4 gap-1 shrink-0"
      style={{ background: "hsl(220 15% 7%)", borderColor: "hsl(220 10% 14%)" }}>
      {/* Logo */}
      <Link href="/" className="mb-4 group" data-testid="logo-link">
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" aria-label="PARAZIT: RESET">
          <circle cx="24" cy="24" r="20" stroke="hsl(36 72% 50%)" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="4" fill="hsl(36 72% 50%)" />
          <line x1="4" y1="24" x2="20" y2="24" stroke="hsl(36 72% 50%)" strokeWidth="1.5" />
          <line x1="28" y1="24" x2="44" y2="24" stroke="hsl(36 72% 50%)" strokeWidth="1.5" />
        </svg>
      </Link>

      <div className="w-6 h-px mb-2" style={{ background: "hsl(220 10% 20%)" }} />

      {navItems.map(({ path, label, icon, desc }) => {
        const isActive = path === "/" ? location === "/" : location.startsWith(path);
        return (
          <Link
            key={path}
            href={path}
            className="relative w-10 h-10 flex items-center justify-center rounded transition-all group"
            style={{
              background: isActive ? "hsl(220 12% 16%)" : "transparent",
              color: isActive ? "hsl(36 72% 55%)" : "hsl(40 4% 45%)",
              borderRight: isActive ? "2px solid hsl(36 72% 50%)" : "2px solid transparent",
            }}
            data-testid={`nav-${path.replace("/", "") || "home"}`}
          >
            <span className="text-sm">{icon}</span>
            {/* Tooltip */}
            <span className="absolute left-12 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
              style={{ background: "hsl(220 14% 14%)", border: "1px solid hsl(220 10% 22%)", color: "hsl(40 5% 70%)" }}>
              <span className="font-semibold" style={{ color: "hsl(36 72% 55%)" }}>{label}</span>
              <br />
              <span style={{ color: "hsl(40 4% 50%)" }}>{desc}</span>
            </span>
          </Link>
        );
      })}
    </aside>
  );
}

function TopBar() {
  const [location] = useHashLocation();
  const labels: Record<string, string> = { "/": "SHOWCASE", "/bible": "BİBLE", "/editor": "SENARYO EDİTÖRÜ" };
  const label = Object.entries(labels).find(([k]) => location.startsWith(k) && (k === "/" ? location === "/" : true))?.[1] || "PARAZIT: RESET";

  return (
    <header className="h-14 border-b px-4 flex items-center gap-3 shrink-0"
      style={{ background: "hsl(220 15% 7%)", borderColor: "hsl(220 10% 14%)" }}>
      <span className="text-xs tracking-[0.3em]" style={{ color: "hsl(40 4% 38%)" }}>◆</span>
      <span className="text-xs tracking-[0.2em] font-medium" style={{ color: "hsl(36 72% 55%)" }}>
        PARAZIT: RESET
      </span>
      <span className="text-xs" style={{ color: "hsl(220 10% 28%)" }}>·</span>
      <span className="text-xs tracking-[0.15em]" style={{ color: "hsl(40 4% 45%)" }}>{label}</span>
      <div className="flex-1" />
      <span className="text-xs" style={{ color: "hsl(220 10% 28%)" }}>2042</span>
    </header>
  );
}

function AppShell() {
  // Seed on first load
  useEffect(() => {
    fetch("/api/seed", { method: "POST" }).catch(() => {});
  }, []);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "hsl(220 15% 7%)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-auto">
          <Switch>
            <Route path="/" component={Showcase} />
            <Route path="/bible" component={Bible} />
            <Route path="/editor" component={Editor} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <AppShell />
      </Router>
    </QueryClientProvider>
  );
}
