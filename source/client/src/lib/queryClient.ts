import { QueryClient } from "@tanstack/react-query";

const API_BASE = (import.meta.env.VITE_API_BASE as string) ?? "";

export async function apiRequest(method: string, path: string, body?: unknown) {
  const url = `${API_BASE}${path}`.replace("__PORT_5000__", window.location.origin);
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
});
