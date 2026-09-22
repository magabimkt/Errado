"use client";

import type { Difficulty } from "@/types";
import { disciplines } from "@/config/edital";
import type { FlashcardFilters } from "@/lib/flashcards";

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "facil", label: "Fácil" },
  { value: "medio", label: "Médio" },
  { value: "dificil", label: "Difícil" },
];

export function FlashcardFiltersBar({
  filters,
  onChange,
}: {
  filters: FlashcardFilters;
  onChange: (filters: FlashcardFilters) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={filters.disciplineSlug ?? ""}
        onChange={(e) =>
          onChange({ ...filters, disciplineSlug: e.target.value || undefined })
        }
        className="rounded border border-line bg-paper px-3 py-2 text-sm"
      >
        <option value="">Todas as disciplinas</option>
        {disciplines.map((d) => (
          <option key={d.slug} value={d.slug}>
            {d.name}
          </option>
        ))}
      </select>

      <select
        value={filters.difficulty ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            difficulty: (e.target.value || undefined) as Difficulty | undefined,
          })
        }
        className="rounded border border-line bg-paper px-3 py-2 text-sm"
      >
        <option value="">Todas as dificuldades</option>
        {difficulties.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
}
