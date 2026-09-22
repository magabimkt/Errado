"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/layout/header";
import { FlashcardFiltersBar } from "@/components/flashcards/flashcard-filters-bar";
import { Flashcard } from "@/components/flashcards/flashcard";
import { allFlashcards } from "@/data/flashcards";
import { filterFlashcards, type FlashcardFilters } from "@/lib/flashcards";

export default function FlashcardsPage() {
  const [filters, setFilters] = useState<FlashcardFilters>({});
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => filterFlashcards(allFlashcards, filters), [filters]);
  const currentFlashcard = filtered[index];

  function handleFiltersChange(next: FlashcardFilters) {
    setFilters(next);
    setIndex(0);
  }

  function handleReviewed() {
    setIndex((i) => Math.min(filtered.length - 1, i + 1));
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-content px-6 py-10">
        <h1 className="text-3xl font-bold">Flashcards</h1>
        <p className="mt-1 text-ink-muted">
          Revisão ativa por disciplina e dificuldade.
        </p>

        <div className="mt-6">
          <FlashcardFiltersBar filters={filters} onChange={handleFiltersChange} />
        </div>

        <div className="mt-6">
          {allFlashcards.length === 0 ? (
            <p className="text-sm text-ink-muted">
              Ainda não há flashcards cadastrados. A estrutura de revisão
              (com repetição espaçada) já está pronta — os cartões
              aparecerão aqui assim que forem adicionados.
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-ink-muted">
              Nenhum flashcard encontrado para os filtros selecionados.
            </p>
          ) : (
            <>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-sm text-ink-muted">
                  Cartão {index + 1} de {filtered.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIndex((i) => Math.max(0, i - 1))}
                    disabled={index === 0}
                    className="rounded border border-line px-3 py-1 text-sm disabled:opacity-40"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setIndex((i) => Math.min(filtered.length - 1, i + 1))}
                    disabled={index === filtered.length - 1}
                    className="rounded border border-line px-3 py-1 text-sm disabled:opacity-40"
                  >
                    Próximo
                  </button>
                </div>
              </div>
              <Flashcard
                key={currentFlashcard.id}
                flashcard={currentFlashcard}
                onReviewed={handleReviewed}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
