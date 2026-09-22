"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { SimuladoSetup } from "@/components/simulado/simulado-setup";
import { SimuladoRunner } from "@/components/simulado/simulado-runner";
import { SimuladoResults } from "@/components/simulado/simulado-results";
import { allQuestions } from "@/data/questions";
import { disciplines } from "@/config/edital";
import { buildSimulado, computeSimuladoResult } from "@/lib/simulado";
import { recordQuestionAttempt } from "@/lib/progress-actions";
import type { Question, SimuladoAnswer, SimuladoConfig, SimuladoResult } from "@/types";

type Phase = "setup" | "running" | "results";

export default function SimuladosPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(30);
  const [result, setResult] = useState<SimuladoResult | null>(null);

  function handleStart(config: SimuladoConfig) {
    const selected = buildSimulado(allQuestions, config);
    setActiveQuestions(selected);
    setTimeLimitMinutes(config.timeLimitMinutes);
    setPhase("running");
  }

  function handleFinish(answers: SimuladoAnswer[], timeSpentSeconds: number) {
    for (const question of activeQuestions) {
      const answer = answers.find((a) => a.questionId === question.id);
      if (!answer?.selectedAlternativeId) continue;
      recordQuestionAttempt({
        questionId: question.id,
        selectedAlternativeId: answer.selectedAlternativeId,
        correct: answer.selectedAlternativeId === question.correctAlternativeId,
      });
    }

    setResult(
      computeSimuladoResult(activeQuestions, answers, timeSpentSeconds, disciplines)
    );
    setPhase("results");
  }

  function handleRestart() {
    setActiveQuestions([]);
    setResult(null);
    setPhase("setup");
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-content px-6 py-10">
        <h1 className="text-3xl font-bold">Simulados</h1>
        <p className="mt-1 text-ink-muted">
          Prova cronometrada com correção automática e desempenho detalhado.
        </p>

        <div className="mt-6">
          {phase === "setup" && (
            <SimuladoSetup availableCount={allQuestions.length} onStart={handleStart} />
          )}

          {phase === "running" && (
            <SimuladoRunner
              questions={activeQuestions}
              timeLimitMinutes={timeLimitMinutes}
              onFinish={handleFinish}
            />
          )}

          {phase === "results" && result && (
            <SimuladoResults result={result} onRestart={handleRestart} />
          )}
        </div>
      </main>
    </div>
  );
}
