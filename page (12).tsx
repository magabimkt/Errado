"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { search, type SearchResultItem } from "@/lib/search";

const TYPE_LABELS: Record<SearchResultItem["type"], string> = {
  disciplina: "Disciplina",
  modulo: "Módulo",
  aula: "Aula",
  questao: "Questão",
  flashcard: "Flashcard",
};

export default function PesquisaPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => search(query), [query]);

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-content px-6 py-10">
        <h1 className="text-3xl font-bold">Pesquisa</h1>
        <p className="mt-1 text-ink-muted">
          Busque por disciplina, módulo, aula, questão ou flashcard.
        </p>

        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite ao menos 2 letras..."
          className="mt-6 w-full rounded border border-line bg-paper px-4 py-2.5 text-sm"
        />

        <div className="mt-6 flex flex-col gap-2">
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="text-sm text-ink-muted">Nenhum resultado encontrado.</p>
          )}

          {results.map((r, i) => (
            <Link
              key={`${r.type}-${i}`}
              href={r.href}
              className="rounded border border-line bg-paper p-3 transition-colors hover:border-teal"
            >
              <span className="font-mono text-xs uppercase text-teal">
                {TYPE_LABELS[r.type]}
              </span>
              <p className="mt-0.5 text-sm font-medium">{r.title}</p>
              {r.subtitle && (
                <p className="text-xs text-ink-muted">{r.subtitle}</p>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
