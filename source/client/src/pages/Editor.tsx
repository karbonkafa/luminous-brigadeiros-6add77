import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CHARACTERS } from "@/lib/characters";
import type { Frequency, Scene, Postit } from "@shared/schema";

const STATUS_LABELS = { taslak: "Taslak", "yazılıyor": "Yazılıyor", tamamlandı: "Tamamlandı" };
const STATUS_COLORS = {
  taslak: { bg: "hsl(220 12% 16%)", text: "hsl(40 4% 50%)" },
  "yazılıyor": { bg: "hsl(36 60% 18%)", text: "hsl(36 72% 60%)" },
  tamamlandı: { bg: "hsl(105 35% 14%)", text: "hsl(105 50% 50%)" },
};
const POSTIT_CATS = ["genel", "karakter", "dünya", "hikaye", "referans"];
const POSTIT_COLORS = ["amber", "teal", "green", "white", "orange"];

export default function Editor() {
  const [activeFreqId, setActiveFreqId] = useState<number | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<number | null>(null);
  const [showNewFreq, setShowNewFreq] = useState(false);
  const [showNewScene, setShowNewScene] = useState(false);
  const [showNewPostit, setShowNewPostit] = useState(false);
  const [newFreqTitle, setNewFreqTitle] = useState("");
  const [newFreqLogline, setNewFreqLogline] = useState("");
  const [newSceneTitle, setNewSceneTitle] = useState("");
  const [newPostitContent, setNewPostitContent] = useState("");
  const [newPostitColor, setNewPostitColor] = useState("amber");
  const [newPostitCat, setNewPostitCat] = useState("genel");
  const [sceneContent, setSceneContent] = useState("");
  const [saveTimer, setSaveTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const { data: frequencies = [] } = useQuery<Frequency[]>({
    queryKey: ["/api/frequencies"],
    queryFn: () => apiRequest("GET", "/api/frequencies"),
  });

  const { data: scenes = [] } = useQuery<Scene[]>({
    queryKey: ["/api/frequencies", activeFreqId, "scenes"],
    queryFn: () => apiRequest("GET", `/api/frequencies/${activeFreqId}/scenes`),
    enabled: activeFreqId !== null,
  });

  const { data: postits = [] } = useQuery<Postit[]>({
    queryKey: ["/api/postits"],
    queryFn: () => apiRequest("GET", "/api/postits"),
  });

  const createFreq = useMutation({
    mutationFn: (data: { number: number; title: string; logline: string }) =>
      apiRequest("POST", "/api/frequencies", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/frequencies"] });
      setShowNewFreq(false);
      setNewFreqTitle("");
      setNewFreqLogline("");
    },
  });

  const createScene = useMutation({
    mutationFn: (data: { frequencyId: number; title: string; order: number }) =>
      apiRequest("POST", "/api/scenes", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/frequencies", activeFreqId, "scenes"] });
      setShowNewScene(false);
      setNewSceneTitle("");
    },
  });

  const updateScene = useMutation({
    mutationFn: ({ id, ...data }: { id: number; content?: string; notes?: string }) =>
      apiRequest("PATCH", `/api/scenes/${id}`, data),
  });

  const createPostit = useMutation({
    mutationFn: (data: { content: string; category: string; color: string; pinned: boolean; frequencyId: null }) =>
      apiRequest("POST", "/api/postits", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/postits"] });
      setShowNewPostit(false);
      setNewPostitContent("");
    },
  });

  const deletePostit = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/postits/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/postits"] }),
  });

  const activeFreq = frequencies.find((f) => f.id === activeFreqId);
  const activeScene = scenes.find((s) => s.id === activeSceneId);

  function handleSceneContentChange(value: string) {
    setSceneContent(value);
    if (saveTimer) clearTimeout(saveTimer);
    setSaveTimer(setTimeout(() => {
      if (activeSceneId) {
        updateScene.mutate({ id: activeSceneId, content: value });
      }
    }, 1000));
  }

  function openScene(scene: Scene) {
    setActiveSceneId(scene.id);
    setSceneContent(scene.content);
  }

  const POSTIT_BG: Record<string, string> = {
    amber: "hsl(36 60% 18%)",
    teal: "hsl(185 40% 14%)",
    green: "hsl(105 35% 14%)",
    white: "hsl(220 12% 16%)",
    orange: "hsl(22 50% 16%)",
  };
  const POSTIT_BORDER: Record<string, string> = {
    amber: "hsl(36 72% 50%)",
    teal: "hsl(185 55% 38%)",
    green: "hsl(105 50% 40%)",
    white: "hsl(40 5% 60%)",
    orange: "hsl(22 80% 50%)",
  };

  return (
    <div className="flex h-full" style={{ height: "calc(100vh - 56px)" }}>

      {/* ── Sol: Frekans listesi ── */}
      <div className="w-52 border-r flex flex-col shrink-0" style={{ borderColor: "hsl(220 10% 18%)", background: "hsl(220 14% 9%)" }}>
        <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: "hsl(220 10% 18%)" }}>
          <span className="text-xs tracking-[0.2em]" style={{ color: "hsl(185 55% 45%)" }}>FREKANSLAR</span>
          <button
            className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold transition-colors hover:opacity-80"
            style={{ background: "hsl(36 72% 50%)", color: "hsl(220 15% 7%)" }}
            onClick={() => setShowNewFreq(true)}
            data-testid="button-new-frequency"
          >+</button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {frequencies.map((f) => (
            <button
              key={f.id}
              className="w-full text-left p-2.5 rounded text-xs transition-colors"
              style={{
                background: activeFreqId === f.id ? "hsl(220 12% 16%)" : "transparent",
                borderRight: activeFreqId === f.id ? "2px solid hsl(36 72% 50%)" : "2px solid transparent",
                color: activeFreqId === f.id ? "hsl(36 72% 55%)" : "hsl(40 4% 52%)",
              }}
              onClick={() => { setActiveFreqId(f.id); setActiveSceneId(null); }}
              data-testid={`freq-item-${f.id}`}
            >
              <div className="font-medium">Frekans {f.number.toString().padStart(2, "0")}</div>
              <div className="truncate mt-0.5" style={{ color: "hsl(40 4% 40%)" }}>{f.title}</div>
              <div className="mt-1">
                <span className="px-1.5 py-0.5 rounded text-[10px]"
                  style={{ background: STATUS_COLORS[f.status as keyof typeof STATUS_COLORS]?.bg, color: STATUS_COLORS[f.status as keyof typeof STATUS_COLORS]?.text }}>
                  {STATUS_LABELS[f.status as keyof typeof STATUS_LABELS]}
                </span>
              </div>
            </button>
          ))}

          {frequencies.length === 0 && (
            <p className="text-center py-6 text-xs" style={{ color: "hsl(40 4% 35%)" }}>
              Henüz frekans yok.<br />+ ile ekle.
            </p>
          )}
        </div>

        {/* Yeni Frekans */}
        {showNewFreq && (
          <div className="p-3 border-t space-y-2" style={{ borderColor: "hsl(220 10% 18%)" }}>
            <input
              autoFocus
              className="w-full px-2 py-1.5 rounded text-xs outline-none"
              style={{ background: "hsl(220 12% 16%)", border: "1px solid hsl(220 10% 25%)", color: "hsl(40 5% 75%)" }}
              placeholder="Frekans adı..."
              value={newFreqTitle}
              onChange={(e) => setNewFreqTitle(e.target.value)}
              data-testid="input-new-frequency-title"
            />
            <input
              className="w-full px-2 py-1.5 rounded text-xs outline-none"
              style={{ background: "hsl(220 12% 16%)", border: "1px solid hsl(220 10% 25%)", color: "hsl(40 5% 75%)" }}
              placeholder="Logline..."
              value={newFreqLogline}
              onChange={(e) => setNewFreqLogline(e.target.value)}
              data-testid="input-new-frequency-logline"
            />
            <div className="flex gap-1.5">
              <button
                className="flex-1 py-1.5 rounded text-xs font-medium transition-opacity hover:opacity-80"
                style={{ background: "hsl(36 72% 50%)", color: "hsl(220 15% 7%)" }}
                onClick={() => createFreq.mutate({ number: frequencies.length + 1, title: newFreqTitle, logline: newFreqLogline })}
                data-testid="button-save-frequency"
              >Kaydet</button>
              <button className="flex-1 py-1.5 rounded text-xs" style={{ background: "hsl(220 12% 16%)", color: "hsl(40 4% 50%)" }}
                onClick={() => setShowNewFreq(false)}>İptal</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Orta: Sahne editörü ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {!activeFreqId ? (
          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <p className="text-5xl mb-4" style={{ color: "hsl(220 10% 25%)" }}>◈</p>
              <p className="text-sm" style={{ color: "hsl(40 4% 38%)" }}>Sol panelden bir Frekans seç veya yeni oluştur</p>
            </div>
          </div>
        ) : !activeSceneId ? (
          <div className="flex-1 flex flex-col">
            {/* Frekans başlığı */}
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "hsl(220 10% 18%)" }}>
              <div>
                <p className="text-xs tracking-wider mb-0.5" style={{ color: "hsl(185 55% 45%)" }}>FREKANS {activeFreq?.number.toString().padStart(2, "0")}</p>
                <h2 className="text-lg font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(36 72% 55%)" }}>{activeFreq?.title}</h2>
                <p className="text-xs italic mt-0.5" style={{ color: "hsl(40 4% 48%)" }}>{activeFreq?.logline}</p>
              </div>
              <button
                className="px-3 py-1.5 rounded text-xs font-medium transition-opacity hover:opacity-80"
                style={{ background: "hsl(185 55% 25%)", color: "hsl(185 55% 70%)" }}
                onClick={() => setShowNewScene(true)}
                data-testid="button-new-scene"
              >+ Sahne Ekle</button>
            </div>

            {/* Sahneler grid */}
            <div className="flex-1 p-4 overflow-y-auto">
              {showNewScene && (
                <div className="mb-4 p-3 rounded-lg" style={{ background: "hsl(220 14% 11%)", border: "1px solid hsl(220 10% 20%)" }}>
                  <input
                    autoFocus
                    className="w-full bg-transparent outline-none text-sm mb-2"
                    style={{ color: "hsl(40 5% 75%)", borderBottom: "1px solid hsl(220 10% 22%)" }}
                    placeholder="Sahne adı..."
                    value={newSceneTitle}
                    onChange={(e) => setNewSceneTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newSceneTitle.trim()) {
                        createScene.mutate({ frequencyId: activeFreqId!, title: newSceneTitle, order: scenes.length });
                      }
                    }}
                    data-testid="input-new-scene-title"
                  />
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 rounded text-xs" style={{ background: "hsl(36 72% 50%)", color: "hsl(220 15% 7%)" }}
                      onClick={() => newSceneTitle.trim() && createScene.mutate({ frequencyId: activeFreqId!, title: newSceneTitle, order: scenes.length })}
                      data-testid="button-save-scene">
                      Ekle
                    </button>
                    <button className="px-3 py-1 rounded text-xs" style={{ color: "hsl(40 4% 45%)" }}
                      onClick={() => setShowNewScene(false)}>İptal</button>
                  </div>
                </div>
              )}

              {scenes.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-3xl mb-3" style={{ color: "hsl(220 10% 25%)" }}>☰</p>
                  <p className="text-sm" style={{ color: "hsl(40 4% 38%)" }}>Bu frekans için henüz sahne yok</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {scenes.map((scene, i) => (
                    <button
                      key={scene.id}
                      className="p-3 rounded-lg text-left transition-all hover:border-amber-700/40"
                      style={{ background: "hsl(220 14% 11%)", border: "1px solid hsl(220 10% 18%)" }}
                      onClick={() => openScene(scene)}
                      data-testid={`scene-card-${scene.id}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold tabular-nums" style={{ color: "hsl(36 72% 45%)" }}>
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium" style={{ color: "hsl(40 5% 72%)" }}>{scene.title}</span>
                      </div>
                      {scene.content ? (
                        <p className="text-xs line-clamp-2" style={{ color: "hsl(40 4% 45%)" }}>{scene.content}</p>
                      ) : (
                        <p className="text-xs italic" style={{ color: "hsl(40 4% 35%)" }}>Boş sahne — yaz...</p>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ── Sahne Editörü ── */
          <div className="flex-1 flex flex-col">
            {/* Editör header */}
            <div className="px-4 py-3 border-b flex items-center gap-3" style={{ borderColor: "hsl(220 10% 18%)" }}>
              <button
                className="text-xs transition-colors hover:opacity-80"
                style={{ color: "hsl(40 4% 45%)" }}
                onClick={() => setActiveSceneId(null)}
              >← Sahneler</button>
              <div className="w-px h-4" style={{ background: "hsl(220 10% 22%)" }} />
              <span className="text-sm font-medium" style={{ color: "hsl(40 5% 68%)" }}>{activeScene?.title}</span>
              {updateScene.isPending && (
                <span className="text-xs ml-auto" style={{ color: "hsl(40 4% 40%)" }}>Kaydediliyor...</span>
              )}
            </div>

            {/* Editör body */}
            <div className="flex-1 flex overflow-hidden">
              <textarea
                className="flex-1 p-6 bg-transparent outline-none resize-none prose-noir leading-relaxed"
                style={{
                  color: "hsl(40 5% 72%)",
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "0.9375rem",
                  lineHeight: "1.8",
                }}
                placeholder="Sahneyi yaz...&#10;&#10;[EXT. BÖLGE SOKAKLARI — GECE]&#10;&#10;Yağmur... "
                value={sceneContent}
                onChange={(e) => handleSceneContentChange(e.target.value)}
                data-testid="textarea-scene-content"
              />

              {/* Karakter paneli */}
              <div className="w-44 border-l overflow-y-auto shrink-0 p-3" style={{ borderColor: "hsl(220 10% 18%)", background: "hsl(220 14% 9%)" }}>
                <p className="text-xs tracking-[0.2em] mb-3" style={{ color: "hsl(185 55% 40%)" }}>KARAKTERLER</p>
                {CHARACTERS.map((c) => (
                  <button
                    key={c.code}
                    className="w-full flex items-center gap-2 p-1.5 rounded mb-1 text-left hover:bg-white/5 transition-colors"
                    onClick={() => {
                      const insertion = `\n${c.name.toUpperCase()}\n`;
                      setSceneContent((prev) => prev + insertion);
                    }}
                    data-testid={`char-insert-${c.code}`}
                  >
                    <div className="w-6 h-8 rounded overflow-hidden shrink-0">
                      <img src={c.portrait} alt={c.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <span className="text-xs font-medium" style={{ color: c.colorPrimary }}>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Sağ: Post-it paneli ── */}
      <div className="w-56 border-l flex flex-col shrink-0" style={{ borderColor: "hsl(220 10% 18%)", background: "hsl(220 14% 9%)" }}>
        <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: "hsl(220 10% 18%)" }}>
          <span className="text-xs tracking-[0.2em]" style={{ color: "hsl(36 72% 50%)" }}>POST-İT</span>
          <button
            className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold transition-opacity hover:opacity-80"
            style={{ background: "hsl(36 72% 50%)", color: "hsl(220 15% 7%)" }}
            onClick={() => setShowNewPostit(!showNewPostit)}
            data-testid="button-new-postit"
          >+</button>
        </div>

        {showNewPostit && (
          <div className="p-3 border-b space-y-2" style={{ borderColor: "hsl(220 10% 18%)" }}>
            <textarea
              autoFocus
              className="w-full p-2 rounded text-xs outline-none resize-none"
              style={{ background: "hsl(220 12% 16%)", border: "1px solid hsl(220 10% 25%)", color: "hsl(40 5% 75%)", minHeight: "72px" }}
              placeholder="Notunu yaz..."
              value={newPostitContent}
              onChange={(e) => setNewPostitContent(e.target.value)}
              data-testid="textarea-new-postit"
            />
            <div className="flex gap-1 flex-wrap">
              {POSTIT_COLORS.map((c) => (
                <button key={c} className="w-5 h-5 rounded-full transition-transform hover:scale-110"
                  style={{ background: POSTIT_BG[c], border: `2px solid ${newPostitColor === c ? POSTIT_BORDER[c] : "transparent"}` }}
                  onClick={() => setNewPostitColor(c)} />
              ))}
            </div>
            <select
              className="w-full px-2 py-1 rounded text-xs outline-none"
              style={{ background: "hsl(220 12% 16%)", border: "1px solid hsl(220 10% 25%)", color: "hsl(40 5% 65%)" }}
              value={newPostitCat}
              onChange={(e) => setNewPostitCat(e.target.value)}
              data-testid="select-postit-category"
            >
              {POSTIT_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              className="w-full py-1.5 rounded text-xs font-medium"
              style={{ background: "hsl(36 72% 50%)", color: "hsl(220 15% 7%)" }}
              onClick={() => newPostitContent.trim() && createPostit.mutate({
                content: newPostitContent, category: newPostitCat, color: newPostitColor, pinned: false, frequencyId: null
              })}
              data-testid="button-save-postit"
            >Ekle</button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {/* Pinned first */}
          {[...postits].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)).map((p) => (
            <div key={p.id} className="p-2.5 rounded relative group text-xs"
              style={{ background: POSTIT_BG[p.color] || POSTIT_BG.amber, borderTop: `2px solid ${POSTIT_BORDER[p.color] || POSTIT_BORDER.amber}` }}>
              {p.pinned && <span className="absolute top-1 right-1 text-[10px]" style={{ color: POSTIT_BORDER[p.color] }}>📌</span>}
              <p className="leading-relaxed mb-1.5" style={{ color: "hsl(40 5% 72%)" }}>{p.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] opacity-60" style={{ color: "hsl(40 4% 55%)" }}>{p.category}</span>
                <button
                  className="opacity-0 group-hover:opacity-100 text-[10px] transition-opacity"
                  style={{ color: "hsl(0 50% 55%)" }}
                  onClick={() => deletePostit.mutate(p.id)}
                  data-testid={`button-delete-postit-${p.id}`}
                >✕</button>
              </div>
            </div>
          ))}
          {postits.length === 0 && (
            <p className="text-center text-xs py-6" style={{ color: "hsl(40 4% 35%)" }}>
              Henüz not yok.<br />+ ile ekle.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
