import type { Difficulty, Flashcard } from "@/types";

export interface FlashcardFilters {
  disciplineSlug?: string;
  difficulty?: Difficulty;
}

export function filterFlashcards(
  flashcards: Flashcard[],
  filters: FlashcardFilters
): Flashcard[] {
  return flashcards.filter((f) => {
    if (filters.disciplineSlug && f.disciplineSlug !== filters.disciplineSlug) {
      return false;
    }
    if (filters.difficulty && f.difficulty !== filters.difficulty) {
      return false;
    }
    return true;
  });
}

/**
 * Quantos flashcards estão com revisão vencida (dueDate <= hoje ou nunca
 * revisados). Usado no dashboard/seção de revisões.
 */
export function getDueFlashcardIds(
  flashcards: Flashcard[],
  reviewStates: Record<string, { dueDate: string }>
): string[] {
  const today = new Date().toISOString().slice(0, 10);
  return flashcards
    .filter((f) => {
      const state = reviewStates[f.id];
      if (!state) return true;
      return state.dueDate.slice(0, 10) <= today;
    })
    .map((f) => f.id);
}

export interface UpcomingReviewCount {
  date: string;
  count: number;
}

/**
 * Quantos flashcards vencem em cada um dos próximos `days` dias —
 * usado para mostrar a previsão de carga de revisão futura.
 */
export function computeUpcomingReviewCounts(
  flashcards: Flashcard[],
  reviewStates: Record<string, { dueDate: string }>,
  days = 7
): UpcomingReviewCount[] {
  const today = new Date();
  const result: UpcomingReviewCount[] = [];

  for (let i = 1; i <= days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateKey = date.toISOString().slice(0, 10);

    const count = flashcards.filter(
      (f) => reviewStates[f.id]?.dueDate.slice(0, 10) === dateKey
    ).length;

    result.push({ date: dateKey, count });
  }

  return result;
}
