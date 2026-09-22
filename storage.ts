/**
 * Camada de abstração sobre o armazenamento local do progresso do usuário.
 *
 * Hoje usa apenas localStorage. Quando a sincronização remota for
 * implementada, só esta função precisa mudar — o resto do app continua
 * chamando getItem/setItem normalmente.
 */

const NAMESPACE = "aca-ibge";

function buildKey(key: string): string {
  return `${NAMESPACE}:${key}`;
}

export function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(buildKey(key));
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(buildKey(key), JSON.stringify(value));
  } catch {
    // Armazenamento indisponível ou cheio — falha silenciosa por ora.
    // Uma etapa futura pode adicionar um aviso visível ao usuário.
  }
}

export function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(buildKey(key));
}

export const storageKeys = {
  progress: "progress",
  favorites: "favorites",
  flashcardReviews: "flashcard-reviews",
} as const;
