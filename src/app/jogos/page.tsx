"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { GameSetup, type GameType } from "@/components/games/game-setup";
import { AssociationGame } from "@/components/games/association-game";
import { MemoryGame } from "@/components/games/memory-game";
import type { Flashcard } from "@/types";
import { allFlashcards } from "@/data/flashcards";

export default function JogosPage() {
  const [gameType, setGameType] = useState<GameType | null>(null);
  const [roundFlashcards, setRoundFlashcards] = useState<Flashcard[]>([]);

  function handleStart(type: GameType, cards: Flashcard[]) {
    setGameType(type);
    setRoundFlashcards(cards);
  }

  function handleRestart() {
    setGameType(null);
    setRoundFlashcards([]);
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-content px-6 py-10">
        <h1 className="text-3xl font-bold">Jogos</h1>
        <p className="mt-1 text-ink-muted">
          Associação e jogo da memória para fixar conceitos por disciplina.
        </p>

        <div className="mt-6">
          {allFlashcards.length === 0 ? (
            <p className="text-sm text-ink-muted">
              Ainda não há flashcards cadastrados — os jogos usam o mesmo
              banco de flashcards, então aparecerão aqui assim que houver
              conteúdo.
            </p>
          ) : gameType === null ? (
            <GameSetup onStart={handleStart} />
          ) : gameType === "associacao" ? (
            <AssociationGame flashcards={roundFlashcards} onRestart={handleRestart} />
          ) : (
            <MemoryGame flashcards={roundFlashcards} onRestart={handleRestart} />
          )}
        </div>
      </main>
    </div>
  );
}
