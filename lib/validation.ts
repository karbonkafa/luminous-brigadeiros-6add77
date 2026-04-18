import { z } from 'zod';

export const characterSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  subtitle: z.string(),
  faction: z.string(),
  bio: z.string(),
  quote: z.string(),
  colorPrimary: z.string(),
  colorSecondary: z.string(),
});

export const scenarioSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  content: z.string().optional(),
  characters: z.array(z.string()).default([]),
});

export const connectionSchema = z.object({
  connectedTo: z.string().min(1),
  description: z.string(),
});

export const statSchema = z.object({
  label: z.string().min(1),
  value: z.number().min(0).max(10),
});

export type Character = z.infer<typeof characterSchema>;
export type Scenario = z.infer<typeof scenarioSchema>;
export type Connection = z.infer<typeof connectionSchema>;
export type Stat = z.infer<typeof statSchema>;
