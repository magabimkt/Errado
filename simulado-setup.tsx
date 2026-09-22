"use client";

import { useState } from "react";
import { disciplines } from "@/config/edital";
import type { SimuladoConfig } from "@/types";

const QUESTION_COUNT_OPTIONS = [10, 20, 30, 60];
const TIME_LIMIT_OPTIONS = [15, 30, 45, 60];

export function SimuladoSetup({
  availableCount,
  onStart,
}: {
  availableCount: number;
  onStart: (config: SimuladoConfig) => void;
}) {
  const [disciplineSlugs, setDisciplineSlugs] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(30);

  function toggleDiscipline(slug: string) {
    setDisciplineSlugs((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]
    );
  }

  return (
    <div className="rounded border border-line bg-paper p-6">
      <h2 className="font-display text-xl font-semibold">Configurar simulado</h2>

      <div className="mt-5">
        <p className="text-sm font-medium">Disciplinas</p>
        <p className="text-xs text-ink-muted">Nenhuma selecionada = todas as disciplinas.</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {disciplines.map((d) => (
            <button
              key={d.slug}
              onClick={() => toggleDiscipline(d.slug)}
              className={`rounded border px-3 py-1.5 text-sm transition-colors ${
                disciplineSlugs.includes(d.slug)
                  ? "border-teal bg-teal-light text-teal"
                  : "border-line text-ink-muted hover:border-teal"
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Número de questões</label>
          <select
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="mt-1 w-full rounded border border-line bg-paper px-3 py-2 text-sm"
          >
            {QUESTION_COUNT_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} questões
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Tempo</label>
          <select
            value={timeLimitMinutes}
            onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
            className="mt-1 w-full rounded border border-line bg-paper px-3 py-2 text-sm"
          >
            {TIME_LIMIT_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m} minutos
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => onStart({ disciplineSlugs, questionCount, timeLimitMinutes })}
        disabled={availableCount === 0}
        className="mt-6 w-full rounded bg-teal px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-teal-dark disabled:opacity-40"
      >
        Iniciar simulado
      </button>

      {availableCount === 0 && (
        <p className="mt-2 text-sm text-ink-muted">
          Ainda não há questões cadastradas no banco para montar um simulado.
        </p>
      )}
    </div>
  );
}
