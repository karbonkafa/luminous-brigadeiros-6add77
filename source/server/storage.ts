import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq, asc } from "drizzle-orm";
import {
  frequencies, scenes, postits, loreEntries,
  type Frequency, type InsertFrequency,
  type Scene, type InsertScene,
  type Postit, type InsertPostit,
  type LoreEntry, type InsertLore,
} from "@shared/schema";

const sqlite = new Database("hollow_frequency.db");
export const db = drizzle(sqlite);

// Create tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS frequencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number INTEGER NOT NULL,
    title TEXT NOT NULL,
    logline TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'taslak',
    notes TEXT NOT NULL DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS scenes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    frequency_id INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    title TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT '',
    characters TEXT NOT NULL DEFAULT '[]',
    content TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS postits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'genel',
    color TEXT NOT NULL DEFAULT 'amber',
    pinned INTEGER NOT NULL DEFAULT 0,
    frequency_id INTEGER,
    created_at TEXT NOT NULL DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS lore_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]'
  );
`);

export interface IStorage {
  // Frequencies
  getFrequencies(): Frequency[];
  getFrequency(id: number): Frequency | undefined;
  createFrequency(data: InsertFrequency): Frequency;
  updateFrequency(id: number, data: Partial<InsertFrequency>): Frequency | undefined;
  deleteFrequency(id: number): void;

  // Scenes
  getScenes(frequencyId: number): Scene[];
  getScene(id: number): Scene | undefined;
  createScene(data: InsertScene): Scene;
  updateScene(id: number, data: Partial<InsertScene>): Scene | undefined;
  deleteScene(id: number): void;

  // Postits
  getPostits(frequencyId?: number | null): Postit[];
  createPostit(data: InsertPostit): Postit;
  updatePostit(id: number, data: Partial<InsertPostit>): Postit | undefined;
  deletePostit(id: number): void;

  // Lore
  getLoreEntries(category?: string): LoreEntry[];
  createLoreEntry(data: InsertLore): LoreEntry;
  updateLoreEntry(id: number, data: Partial<InsertLore>): LoreEntry | undefined;
  deleteLoreEntry(id: number): void;
}

export const storage: IStorage = {
  // Frequencies
  getFrequencies() {
    return db.select().from(frequencies).orderBy(asc(frequencies.number)).all();
  },
  getFrequency(id) {
    return db.select().from(frequencies).where(eq(frequencies.id, id)).get();
  },
  createFrequency(data) {
    return db.insert(frequencies).values(data).returning().get();
  },
  updateFrequency(id, data) {
    return db.update(frequencies).set(data).where(eq(frequencies.id, id)).returning().get();
  },
  deleteFrequency(id) {
    db.delete(frequencies).where(eq(frequencies.id, id)).run();
  },

  // Scenes
  getScenes(frequencyId) {
    return db.select().from(scenes).where(eq(scenes.frequencyId, frequencyId)).orderBy(asc(scenes.order)).all();
  },
  getScene(id) {
    return db.select().from(scenes).where(eq(scenes.id, id)).get();
  },
  createScene(data) {
    return db.insert(scenes).values(data).returning().get();
  },
  updateScene(id, data) {
    return db.update(scenes).set(data).where(eq(scenes.id, id)).returning().get();
  },
  deleteScene(id) {
    db.delete(scenes).where(eq(scenes.id, id)).run();
  },

  // Postits
  getPostits(frequencyId) {
    if (frequencyId === null || frequencyId === undefined) {
      return db.select().from(postits).all();
    }
    return db.select().from(postits).where(eq(postits.frequencyId, frequencyId)).all();
  },
  createPostit(data) {
    return db.insert(postits).values(data).returning().get();
  },
  updatePostit(id, data) {
    return db.update(postits).set(data).where(eq(postits.id, id)).returning().get();
  },
  deletePostit(id) {
    db.delete(postits).where(eq(postits.id, id)).run();
  },

  // Lore
  getLoreEntries(category) {
    if (category) {
      return db.select().from(loreEntries).where(eq(loreEntries.category, category)).all();
    }
    return db.select().from(loreEntries).all();
  },
  createLoreEntry(data) {
    return db.insert(loreEntries).values(data).returning().get();
  },
  updateLoreEntry(id, data) {
    return db.update(loreEntries).set(data).where(eq(loreEntries.id, id)).returning().get();
  },
  deleteLoreEntry(id) {
    db.delete(loreEntries).where(eq(loreEntries.id, id)).run();
  },
};
