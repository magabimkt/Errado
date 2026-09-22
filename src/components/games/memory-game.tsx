"use client";

import { useEffect, useRef, useState } from "react";
import type { Flashcard } from "@/types";
import { buildMemoryDeck, type MemoryCard } from "@/lib/games";

function gridColsClass(totalCards: number): string {
  if (totalCards <= 12) return "grid-cols-3";
  if (totalCards <= 20) return "grid-cols-4";
  return "grid-cols-5";
}

export function MemoryGame({
  flashcards,
  onRestart,
}: {
  flashcards: Flashcard[];
  onRestart: () => void;
}) {
  const [deck, setDeck] = useState<MemoryCard[]>(() => buildMemoryDeck(flashcards));
  const [flippedKeys, setFlippedKeys] = useState<string[]>([]);
  const [matchedCardIds, setMatchedCardIds] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const startedAt = useRef(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const busy = useRef(false);

  const totalPairs = flashcards.length;
  const finished = matchedCardIds.size === totalPairs && totalPairs > 0;

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.round((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [finished]);

  function handleFlip(card: MemoryCard) {
    if (busy.current) return;
    if (flippedKeys.includes(card.key) || matchedCardIds.has(card.cardId)) return;
    if (flippedKeys.length === 2) return;

    const nextFlipped = [...flippedKeys, card.key];
    setFlippedKeys(nextFlipped);

    if (nextFlipped.length === 2) {
      busy.current = true;
      setMoves((m) => m + 1);
      const [firstKey, secondKey] = nextFlipped;
      const first = deck.find((c) => c.key === firstKey)!;
      const second = deck.find((c) => c.key === secondKey)!;

      const isMatch = first.cardId === second.cardId && first.side !== second.side;

      setTimeout(
        () => {
          if (isMatch) {
            setMatchedCardIds((prev) => new Set(prev).add(first.cardId));
          }
          setFlippedKeys([]);
          busy.current = false;
        },
        isMatch ? 400 : 800
      );
    }
  }

  function handleRestartSameCards() {
    setDeck(buildMemoryDeck(flashcards));
    setFlippedKeys([]);
    setMatchedCardIds(new Set());
    setMoves(0);
    startedAt.current = Date.now();
    setElapsedSeconds(0);
    busy.current = false;
  }

  if (finished) {
    return (
      <div className="rounded border border-line bg-paper p-6 text-center">
        <p className="text-sm text-ink-muted">Concluído!</p>
        <p className="mt-1 font-mono text-4xl font-medium text-teal">{elapsedSeconds}s</p>
        <p className="mt-2 text-sm text-ink-muted">{moves} tentativas · {totalPairs} pares</p>
        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={handleRestartSameCards}
            className="rounded border border-line px-4 py-2 text-sm"
          >
            Jogar de novo
          </button>
          <button
            onClick={onRestart}
            className="rounded bg-teal px-4 py-2 text-sm font-medium text-paper hover:bg-teal-dark"
          >
            Trocar assunto
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between font-mono text-sm text-ink-muted">
        <span>
          {matchedCardIds.size}/{totalPairs} pares · {moves} tentativas
        </span>
        <span>{elapsedSeconds}s</span>
      </div>

      <div className={`grid gap-2 ${gridColsClass(deck.length)}`}>
        {deck.map((card) => {
          const isFlipped = flippedKeys.includes(card.key);
          const isMatched = matchedCardIds.has(card.cardId);
          const isRevealed = isFlipped || isMatched;

          return (
            <button
              key={card.key}
              onClick={() => handleFlip(card)}
              disabled={isMatched}
              className={`flex min-h-[84px] items-center justify-center rounded border p-2 text-center text-xs leading-snug transition-colors ${
                isMatched
                  ? "border-teal bg-teal-light opacity-60"
                  : isRevealed
                    ? "border-teal bg-teal-light"
                    : "border-line bg-paper hover:border-teal"
              }`}
            >
              {isRevealed ? card.text : "?"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
