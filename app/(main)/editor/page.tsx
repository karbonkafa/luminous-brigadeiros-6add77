'use client';

import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  content: string;
}

export default function EditorPage() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const activeScenario = scenarios.find((s) => s.id === activeId);

  const handleNew = () => {
    const id = Date.now().toString();
    setScenarios([...scenarios, { id, title: 'Yeni Senaryo', description: '', content: '' }]);
    setActiveId(id);
    setTitle('Yeni Senaryo');
    setDescription('');
    setContent('');
  };

  const handleSelect = (scenario: Scenario) => {
    setActiveId(scenario.id);
    setTitle(scenario.title);
    setDescription(scenario.description);
    setContent(scenario.content);
  };

  const handleSave = () => {
    if (!activeId) return;
    setScenarios(
      scenarios.map((s) =>
        s.id === activeId ? { ...s, title, description, content } : s
      )
    );
  };

  const handleDelete = (id: string) => {
    setScenarios(scenarios.filter((s) => s.id !== id));
    if (activeId === id) {
      setActiveId(null);
      setTitle('');
      setDescription('');
      setContent('');
    }
  };

  return (
    <div className="flex h-full bg-bg-dark">
      {/* Sidebar - Scenarios */}
      <div className="w-60 border-r border-border-primary flex flex-col">
        <div className="p-4 border-b border-border-primary">
          <button
            onClick={handleNew}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded bg-accent-gold bg-opacity-20 text-accent-gold hover:bg-opacity-30 transition-all"
          >
            <Plus size={16} />
            Yeni Senaryo
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="group flex items-start gap-2 p-2 rounded hover:bg-border-primary/20 transition-all"
            >
              <button
                onClick={() => handleSelect(scenario)}
                className="flex-1 text-left"
                style={{
                  color: activeId === scenario.id ? 'hsl(36 72% 55%)' : 'inherit',
                }}
              >
                <div className="font-semibold text-sm truncate">{scenario.title}</div>
                <div className="text-xs text-text-muted truncate">{scenario.description || 'Açıklama yok'}</div>
              </button>
              <button
                onClick={() => handleDelete(scenario.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {scenarios.length === 0 && (
            <div className="p-4 text-center text-text-muted">
              <p className="text-sm">Senaryo oluşturmak için</p>
              <p className="text-sm">yukarıdaki butona tıkla</p>
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeId ? (
          <>
            {/* Toolbar */}
            <div className="p-4 border-b border-border-primary flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl glow-accent">{title}</h2>
                <p className="text-sm text-text-muted">{scenarios.length} senaryo</p>
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 rounded bg-accent-gold bg-opacity-20 text-accent-gold hover:bg-opacity-30 transition-all"
              >
                <Save size={16} />
                Kaydet
              </button>
            </div>

            {/* Content Editor */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="p-4 space-y-4 overflow-y-auto">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-bg-card border border-border-primary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="Senaryo başlığı..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-bg-card border border-border-primary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-gold transition-colors resize-none h-20"
                    placeholder="Senaryo açıklaması..."
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    İçerik
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-bg-card border border-border-primary text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-gold transition-colors resize-none h-64 font-mono text-sm"
                    placeholder="Senaryo içeriğini yazın..."
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-text-secondary mb-4">Senaryo seç veya oluştur</p>
              <button
                onClick={handleNew}
                className="px-4 py-2 rounded bg-accent-gold bg-opacity-20 text-accent-gold hover:bg-opacity-30 transition-all"
              >
                + Yeni Senaryo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
