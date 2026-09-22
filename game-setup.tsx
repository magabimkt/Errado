"use client";

import { useMemo, useState } from "react";
import { disciplines } from "@/config/edital";
import { allFlashcards } from "@/data/flashcards";
import { filterFlashcards, getSubjectsForDiscipline } from "@/lib/flashcards";
import { pickFlashcardsForRound } from "@/lib/games";
import type { Flashcard } from "@/types";

export type GameType = "associacao" | "memoria";

const PAIR_COUNT_OPTIONS = [4, 6, 8, 10, 12];

const GAME_TYPES: { value: GameType; label: string; description: string }[] = [
  {
    value: "associacao",
    label: "Associação",
    description: "Ligue cada conceito à sua definição correta.",
  },
  {
    value: "memoria",
    label: "Jogo da memória",
    description: "Encontre a definição que combina com cada conceito.",
  },
];

export function GameSetup({
  onStart,
}: {
  onStart: (gameType: GameType, roundFlashcards: Flashcard[]) => void;
}) {
  const [gameType, setGameType] = useState<GameType>("associacao");
  const [disciplineSlug, setDisciplineSlug] = useState("");
  const [subject, setSubject] = useState("");
  const [pairCount, setPairCount] = useState(6);

  const subjects = useMemo(
    () =>
      disciplineSlug ? getSubjectsForDiscipline(allFlashcards, disciplineSlug) : [],
    [disciplineSlug]
  );

  const available = useMemo(
    () =>
      filterFlashcards(allFlashcards, {
        disciplineSlug: disciplineSlug || undefined,
        // subject não faz parte de FlashcardFilters ainda — filtramos abaixo
      }).filter((f) => !subject || f.subject === subject),
    [disciplineSlug, subject]
  );

  const actualCount = Math.min(pairCount, available.length);

  return (
    <div className="rounded border border-line bg-paper p-6">
      <h2 className="font-display text-xl font-semibold">Escolha o jogo</h2>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {GAME_TYPES.map((g) => (
          <button
            key={g.value}
            onClick={() => setGameType(g.value)}
            className={`rounded border p-4 text-left transition-colors ${
              gameType === g.value
                ? "border-teal bg-teal-light"
                : "border-line hover:border-teal"
            }`}
          >
            <p className="font-medium">{g.label}</p>
            <p className="mt-1 text-xs text-ink-muted">{g.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium">Disciplina</label>
          <select
            value={disciplineSlug}
            onChange={(e) => {
              setDisciplineSlug(e.target.value);
              setSubject("");
            }}
            className="mt-1 w-full rounded border border-line bg-paper px-3 py-2 text-sm"
          >
            <option value="">Todas as disciplinas</option>
            {disciplines.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Assunto</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={!disciplineSlug || subjects.length === 0}
            className="mt-1 w-full rounded border border-line bg-paper px-3 py-2 text-sm disabled:opacity-40"
          >
            <option value="">Todos os assuntos</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Pares</label>
          <select
            value={pairCount}
            onChange={(e) => setPairCount(Number(e.target.value))}
            className="mt-1 w-full rounded border border-line bg-paper px-3 py-2 text-sm"
          >
            {PAIR_COUNT_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} pares
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => onStart(gameType, pickFlashcardsForRound(available, pairCount))}
        disabled={available.length < 2}
        className="mt-6 w-full rounded bg-teal px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-teal-dark disabled:opacity-40"
      >
        Jogar {actualCount > 0 ? `(${actualCount} pares)` : ""}
      </button>

      {available.length === 0 && (
        <p className="mt-2 text-sm text-ink-muted">
          Nenhum flashcard cadastrado para essa combinação de disciplina/assunto ainda.
        </p>
      )}
      {available.length > 0 && available.length < 2 && (
        <p className="mt-2 text-sm text-ink-muted">
          É preciso de pelo menos 2 flashcards para jogar.
        </p>
      )}
    </div>
  );
}
