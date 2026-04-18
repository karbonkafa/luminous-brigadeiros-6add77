import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Frekanslar (bölümler / episodes)
export const frequencies = sqliteTable("frequencies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  number: integer("number").notNull(),
  title: text("title").notNull(),
  logline: text("logline").notNull().default(""),
  status: text("status").notNull().default("taslak"), // taslak | yazılıyor | tamamlandı
  notes: text("notes").notNull().default(""),
});

export const insertFrequencySchema = createInsertSchema(frequencies).omit({ id: true });
export type InsertFrequency = z.infer<typeof insertFrequencySchema>;
export type Frequency = typeof frequencies.$inferSelect;

// Sahneler
export const scenes = sqliteTable("scenes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  frequencyId: integer("frequency_id").notNull(),
  order: integer("order").notNull().default(0),
  title: text("title").notNull(),
  location: text("location").notNull().default(""),
  characters: text("characters").notNull().default("[]"), // JSON array
  content: text("content").notNull().default(""),
  notes: text("notes").notNull().default(""),
});

export const insertSceneSchema = createInsertSchema(scenes).omit({ id: true });
export type InsertScene = z.infer<typeof insertSceneSchema>;
export type Scene = typeof scenes.$inferSelect;

// Post-it notlar
export const postits = sqliteTable("postits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  category: text("category").notNull().default("genel"), // genel | karakter | dünya | hikaye | referans
  color: text("color").notNull().default("amber"), // amber | teal | green | white | orange
  pinned: integer("pinned", { mode: "boolean" }).notNull().default(false),
  frequencyId: integer("frequency_id"), // null = genel
  createdAt: text("created_at").notNull().default(""),
});

export const insertPostitSchema = createInsertSchema(postits).omit({ id: true });
export type InsertPostit = z.infer<typeof insertPostitSchema>;
export type Postit = typeof postits.$inferSelect;

// Dünya notları (lore entries)
export const loreEntries = sqliteTable("lore_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category: text("category").notNull(), // teknoloji | organizasyon | bölge | hastalık | tarih
  title: text("title").notNull(),
  content: text("content").notNull(),
  tags: text("tags").notNull().default("[]"), // JSON array
});

export const insertLoreSchema = createInsertSchema(loreEntries).omit({ id: true });
export type InsertLore = z.infer<typeof insertLoreSchema>;
export type LoreEntry = typeof loreEntries.$inferSelect;
