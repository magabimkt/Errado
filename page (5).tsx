"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/layout/header";
import { QuestionFiltersBar } from "@/components/questions/question-filters-bar";
import { QuestionCard } from "@/components/questions/question-card";
import { allQuestions } from "@/data/questions";
import { filterQuestions, type QuestionFilters } from "@/lib/questions";

export default function QuestoesPage() {
  const [filters, setFilters] = useState<QuestionFilters>({});
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => filterQuestions(allQuestions, filters), [filters]);
  const currentQuestion = filtered[index];

  function handleFiltersChange(next: QuestionFilters) {
    setFilters(next);
    setIndex(0);
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-content px-6 py-10">
        <h1 className="text-3xl font-bold">Questões</h1>
        <p className="mt-1 text-ink-muted">
          Banco de questões por disciplina, assunto e dificuldade.
        </p>

        <div className="mt-6">
          <QuestionFiltersBar filters={filters} onChange={handleFiltersChange} />
        </div>

        <div className="mt-6">
          {allQuestions.length === 0 ? (
            <p className="text-sm text-ink-muted">
              Ainda não há questões cadastradas no banco. A estrutura de
              filtros e prática já está pronta — as questões aparecerão aqui
              assim que forem adicionadas.
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-ink-muted">
              Nenhuma questão encontrada para os filtros selecionados.
            </p>
          ) : (
            <>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-sm text-ink-muted">
                  Questão {index + 1} de {filtered.length}
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
                    Próxima
                  </button>
                </div>
              </div>
              <QuestionCard key={currentQuestion.id} question={currentQuestion} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
