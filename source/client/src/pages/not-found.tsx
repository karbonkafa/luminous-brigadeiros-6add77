import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <p className="text-6xl mb-4" style={{ color: "hsl(220 10% 22%)" }}>◊</p>
      <h1 className="text-xl font-bold mb-2" style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(36 72% 50%)" }}>
        Frekans Bulunamadı
      </h1>
      <p className="text-sm mb-6" style={{ color: "hsl(40 4% 45%)" }}>Bu sinyal kayıp.</p>
      <Link href="/" className="px-4 py-2 rounded text-sm" style={{ background: "hsl(36 72% 50%)", color: "hsl(220 15% 7%)" }}>
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
