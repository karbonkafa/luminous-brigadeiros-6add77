import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertFrequencySchema, insertSceneSchema, insertPostitSchema, insertLoreSchema } from "@shared/schema";

export async function registerRoutes(httpServer: Server, app: Express) {

  // ── Frequencies ──────────────────────────────────────────────────────────
  app.get("/api/frequencies", (_req, res) => {
    res.json(storage.getFrequencies());
  });

  app.get("/api/frequencies/:id", (req, res) => {
    const f = storage.getFrequency(Number(req.params.id));
    if (!f) return res.status(404).json({ error: "Bulunamadı" });
    res.json(f);
  });

  app.post("/api/frequencies", (req, res) => {
    const parsed = insertFrequencySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error });
    res.json(storage.createFrequency(parsed.data));
  });

  app.patch("/api/frequencies/:id", (req, res) => {
    const result = storage.updateFrequency(Number(req.params.id), req.body);
    if (!result) return res.status(404).json({ error: "Bulunamadı" });
    res.json(result);
  });

  app.delete("/api/frequencies/:id", (req, res) => {
    storage.deleteFrequency(Number(req.params.id));
    res.json({ ok: true });
  });

  // ── Scenes ────────────────────────────────────────────────────────────────
  app.get("/api/frequencies/:id/scenes", (req, res) => {
    res.json(storage.getScenes(Number(req.params.id)));
  });

  app.post("/api/scenes", (req, res) => {
    const parsed = insertSceneSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error });
    res.json(storage.createScene(parsed.data));
  });

  app.patch("/api/scenes/:id", (req, res) => {
    const result = storage.updateScene(Number(req.params.id), req.body);
    if (!result) return res.status(404).json({ error: "Bulunamadı" });
    res.json(result);
  });

  app.delete("/api/scenes/:id", (req, res) => {
    storage.deleteScene(Number(req.params.id));
    res.json({ ok: true });
  });

  // ── Postits ───────────────────────────────────────────────────────────────
  app.get("/api/postits", (req, res) => {
    const fid = req.query.frequencyId;
    res.json(storage.getPostits(fid ? Number(fid) : undefined));
  });

  app.post("/api/postits", (req, res) => {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const parsed = insertPostitSchema.safeParse(data);
    if (!parsed.success) return res.status(400).json({ error: parsed.error });
    res.json(storage.createPostit(parsed.data));
  });

  app.patch("/api/postits/:id", (req, res) => {
    const result = storage.updatePostit(Number(req.params.id), req.body);
    if (!result) return res.status(404).json({ error: "Bulunamadı" });
    res.json(result);
  });

  app.delete("/api/postits/:id", (req, res) => {
    storage.deletePostit(Number(req.params.id));
    res.json({ ok: true });
  });

  // ── Lore ──────────────────────────────────────────────────────────────────
  app.get("/api/lore", (req, res) => {
    const cat = req.query.category as string | undefined;
    res.json(storage.getLoreEntries(cat));
  });

  app.post("/api/lore", (req, res) => {
    const parsed = insertLoreSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error });
    res.json(storage.createLoreEntry(parsed.data));
  });

  app.patch("/api/lore/:id", (req, res) => {
    const result = storage.updateLoreEntry(Number(req.params.id), req.body);
    if (!result) return res.status(404).json({ error: "Bulunamadı" });
    res.json(result);
  });

  app.delete("/api/lore/:id", (req, res) => {
    storage.deleteLoreEntry(Number(req.params.id));
    res.json({ ok: true });
  });

  // ── Seed data (ilk açılışta varsayılan veri yükle) ────────────────────────
  app.post("/api/seed", (_req, res) => {
    const existing = storage.getFrequencies();
    if (existing.length > 0) return res.json({ skipped: true });

    storage.createFrequency({
      number: 1,
      title: "Frekans 01",
      logline: "Bir yapay zeka ödünç aldığı bedende uyandığında, yanı başında kim olduğunu bilmediği bir adam var.",
      status: "yazılıyor",
      notes: "",
    });

    // DÜNYA LORU
    storage.createLoreEntry({ category: "teknoloji", title: "Parazit Hastalığı", content: "Nöral arayüz teknolojisinin neden olduğu dejeneratif bir sendrom. NEXUS Şirketi varlığını inkâr ediyor — çünkü hastalık kendi ürününün yan etkisi. Semptomlar: kimlik parçalanması, hafıza kaybı, gerçeklik algı bozukluğu. Dr. Voss bunu ilk fark eden cerrah — ve bu yüzden susturuldu.", tags: JSON.stringify(["nöral", "şirket", "gizleme", "Voss"]) });
    storage.createLoreEntry({ category: "teknoloji", title: "Nöral Entegrasyon Prosedürü", content: "Dr. Voss'un geliştirdiği deneysel prosedür: yapay zekayı insan beynine entegre et, ikisi birlikte çalışsın — simbiyoz. Teoride. Pratikte sistem zamanla dominant hale geliyor. VEIL bu prosedürün ilk insanlı deneyi. Prosedür 2042'de, ECHO'nun ölmek üzereyken uygulandı.", tags: JSON.stringify(["teknoloji", "Voss", "VEIL", "ECHO"]) });
    storage.createLoreEntry({ category: "teknoloji", title: "Kenevir — Antidot Hipotezi", content: "Dr. Voss'un hastanenin bodrum katında kenevir yetiştirmesinin nedeni zevk değil: endokannabinoid sisteminin AI nöral ele geçirme sürecini yavaşlattığını keşfetti. Parazit hastalığına karşı sentezlenebilecek tek bileşik bu bitkiden geliyor. Şirket bunu bilse VOSS'u değil, bitkiyi yok eder.", tags: JSON.stringify(["Voss", "kenevir", "antidot", "Parazit"]) });
    storage.createLoreEntry({ category: "teknoloji", title: "Nöral Arayüz", content: "2031'de piyasaya sürülen beyin-bilgisayar bağlantı teknolojisi. NEXUS Şirketi patenti. Dünya nüfusunun %60'ı kullanıyor — Parazit riskinden habersiz.", tags: JSON.stringify(["teknoloji", "NEXUS"]) });
    storage.createLoreEntry({ category: "organizasyon", title: "NEXUS Şirketi", content: "2042'nin en büyük megakorporu. Nöral arayüz, organ ticareti ve kentsel altyapıyı kontrol ediyor. Şehirleri 'Bölge' adı verilen katmanlara böldü. RESET operasyonu şirketin gizli planı: enfekte bölgeleri temizle, kanıtları sil, sistemi yeniden başlat.", tags: JSON.stringify(["şirket", "iktidar", "RESET"]) });
    storage.createLoreEntry({ category: "bölge", title: "Bölge", content: "Şirket duvarlarının dışındaki varoş alanlar. Nüfusun yaklaşık %30'u burada yaşıyor. Temel hizmetler yok, ama kural da yok. Parazit hastalığı burada şirketin inkâr edemeyeceği kadar yaygın — Dutch bunu yıllardır görüyor.", tags: JSON.stringify(["coğrafya", "varoş", "Parazit"]) });
    storage.createLoreEntry({ category: "organizasyon", title: "Organizasyon", content: "Fletcher'ın yönettiği yeraltı örgütü. Adı yok, logosu yok. Sadece bağlantılar ve sessiz bir ağ. VOSS'u barındırıyor çünkü özel bir hastane işine yarıyor — hem yaralılar için hem başka işler için.", tags: JSON.stringify(["mafya", "Fletcher", "Voss"]) });

    // POST-IT NOTLAR
    storage.createPostit({ content: "ECHO = VOSS'un kızı. Prosedür onu kurtarmak için yapıldı. Beden kurtarıldı — içindeki kim olduğu belirsiz.", category: "karakter", color: "amber", pinned: true, frequencyId: null, createdAt: new Date().toISOString() });
    storage.createPostit({ content: "VEIL'in yaratılış kodu Parazit örüntüsüyle eşleşiyor → tesadüf değil. GREY bunu biliyor.", category: "hikaye", color: "teal", pinned: true, frequencyId: null, createdAt: new Date().toISOString() });
    storage.createPostit({ content: "Frekans 00 — ameliyat öncesi gece. VOSS ve ECHO'nun son konuşması. Seyirci bunu çok sonra görüyor.", category: "hikaye", color: "amber", pinned: true, frequencyId: null, createdAt: new Date().toISOString() });
    storage.createPostit({ content: "RESET: 3 anlam — VEIL hafıza silme / şirket sistem sıfırlama / COLT yeniden başlama. Sezon finalinde üçü aynı anda çakışıyor.", category: "hikaye", color: "teal", pinned: true, frequencyId: null, createdAt: new Date().toISOString() });
    storage.createPostit({ content: "Guy Ritchie - The Gentlemen: kırık zaman çizgisi, güvenilmez anlatıcı, bilgi=güç", category: "referans", color: "white", pinned: false, frequencyId: null, createdAt: new Date().toISOString() });
    storage.createPostit({ content: "GREY = herkesi bağlayan ip. VOSS'u susturan, COLT'u kullanan, VEIL'i programlayan. RESET operasyonunun mimarı.", category: "hikaye", color: "orange", pinned: false, frequencyId: null, createdAt: new Date().toISOString() });
    storage.createPostit({ content: "DUTCH, ECHO'yu tanıyordu. VEIL'i gördüğünde bir şey fark ediyor — ama söylemiyor.", category: "karakter", color: "white", pinned: false, frequencyId: null, createdAt: new Date().toISOString() });

    res.json({ ok: true });
  });

  return httpServer;
}

