"use client";

import { useEffect, useRef, useState } from "react";
import type { Flashcard } from "@/types";
import { buildAssociationSet, type AssociationItem } from "@/lib/games";

export function AssociationGame({
  flashcards,
  onRestart,
}: {
  flashcards: Flashcard[];
  onRestart: () => void;
}) {
  const [set, setSet] = useState(() => buildAssociationSet(flashcards));
  const [selectedConcept, setSelectedConcept] = useState<AssociationItem | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<AssociationItem | null>(
    null
  );
  const [matchedCardIds, setMatchedCardIds] = useState<Set<string>>(new Set());
  const [wrongIds, setWrongIds] = useState<{ concept: string; definition: string } | null>(
    null
  );
  const [moves, setMoves] = useState(0);
  const startedAt = useRef(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const totalPairs = flashcards.length;
  const finished = matchedCardIds.size === totalPairs && totalPairs > 0;

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.round((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [finished]);

  useEffect(() => {
    if (!selectedConcept || !selectedDefinition) return;

    setMoves((m) => m + 1);

    if (selectedConcept.cardId === selectedDefinition.cardId) {
      setMatchedCardIds((prev) => new Set(prev).add(selectedConcept.cardId));
      setSelectedConcept(null);
      setSelectedDefinition(null);
    } else {
      setWrongIds({ concept: selectedConcept.id, definition: selectedDefinition.id });
      const timeout = setTimeout(() => {
        setWrongIds(null);
        setSelectedConcept(null);
        setSelectedDefinition(null);
      }, 600);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConcept, selectedDefinition]);

  function handleRestartSameCards() {
    setSet(buildAssociationSet(flashcards));
    setSelectedConcept(null);
    setSelectedDefinition(null);
    setMatchedCardIds(new Set());
    setWrongIds(null);
    setMoves(0);
    startedAt.current = Date.now();
    setElapsedSeconds(0);
  }

  function itemClasses(item: AssociationItem, isConcept: boolean) {
    const isMatched = matchedCardIds.has(item.cardId);
    const isSelected = isConcept
      ? selectedConcept?.id === item.id
      : selectedDefinition?.id === item.id;
    const isWrong = isConcept
      ? wrongIds?.concept === item.id
      : wrongIds?.definition === item.id;

    if (isMatched) return "border-teal bg-teal-light opacity-50 pointer-events-none";
    if (isWrong) return "border-brick bg-brick-light";
    if (isSelected) return "border-teal bg-teal-light";
    return "border-line hover:border-teal";
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
          {matchedCardIds.size}/{totalPairs} pares
        </span>
        <span>{elapsedSeconds}s</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {set.concepts.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedConcept(item)}
              disabled={matchedCardIds.has(item.cardId)}
              className={`rounded border p-3 text-left text-sm transition-colors ${itemClasses(item, true)}`}
            >
              {item.text}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {set.definitions.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedDefinition(item)}
              disabled={matchedCardIds.has(item.cardId)}
              className={`rounded border p-3 text-left text-sm transition-colors ${itemClasses(item, false)}`}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
