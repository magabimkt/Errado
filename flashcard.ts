import type { Difficulty } from "./discipline";

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  disciplineSlug: string;
  subject: string;
  difficulty: Difficulty;
}

/**
 * Estado de revisão espaçada de um flashcard para o usuário atual.
 * A lógica do algoritmo (ex: SM-2) será implementada em src/lib
 * numa etapa futura; esta interface só define o formato do dado salvo.
 */
export interface FlashcardReviewState {
  flashcardId: string;
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  dueDate: string;
  lastReviewedAt: string | null;
}
