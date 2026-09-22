import type { Flashcard } from "@/types";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

/**
 * Escolhe até `count` flashcards aleatórios do conjunto filtrado, para
 * montar uma rodada de jogo.
 */
export function pickFlashcardsForRound(flashcards: Flashcard[], count: number): Flashcard[] {
  return shuffle(flashcards).slice(0, count);
}

export interface AssociationItem {
  id: string;
  cardId: string;
  text: string;
}

export interface AssociationSet {
  concepts: AssociationItem[];
  definitions: AssociationItem[];
}

export function buildAssociationSet(flashcards: Flashcard[]): AssociationSet {
  return {
    concepts: shuffle(
      flashcards.map((f) => ({ id: `${f.id}-c`, cardId: f.id, text: f.front }))
    ),
    definitions: shuffle(
      flashcards.map((f) => ({ id: `${f.id}-d`, cardId: f.id, text: f.back }))
    ),
  };
}

export interface MemoryCard {
  key: string;
  cardId: string;
  side: "front" | "back";
  text: string;
}

export function buildMemoryDeck(flashcards: Flashcard[]): MemoryCard[] {
  const cards: MemoryCard[] = flashcards.flatMap((f) => [
    { key: `${f.id}-front`, cardId: f.id, side: "front" as const, text: f.front },
    { key: `${f.id}-back`, cardId: f.id, side: "back" as const, text: f.back },
  ]);
  return shuffle(cards);
}
