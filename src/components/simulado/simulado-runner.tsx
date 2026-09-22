"use client";

import { useEffect, useRef, useState } from "react";
import type { Question, SimuladoAnswer } from "@/types";

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function SimuladoRunner({
  questions,
  timeLimitMinutes,
  onFinish,
}: {
  questions: Question[];
  timeLimitMinutes: number;
  onFinish: (answers: SimuladoAnswer[], timeSpentSeconds: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [secondsLeft, setSecondsLeft] = useState(timeLimitMinutes * 60);
  const startedAt = useRef(Date.now());
  const finished = useRef(false);

  function handleFinish() {
    if (finished.current) return;
    finished.current = true;
    const timeSpentSeconds = Math.round((Date.now() - startedAt.current) / 1000);
    const finalAnswers: SimuladoAnswer[] = questions.map((q) => ({
      questionId: q.id,
      selectedAlternativeId: answers[q.id] ?? null,
    }));
    onFinish(finalAnswers, timeSpentSeconds);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQuestion = questions[index]!;
  const selected = answers[currentQuestion.id] ?? null;
  const answeredCount = Object.values(answers).filter((v) => v !== null).length;

  return (
    <div>
      <div className="flex items-center justify-between rounded border border-line bg-paper px-4 py-3">
        <span className="font-mono text-sm text-ink-muted">
          {answeredCount}/{questions.length} respondidas
        </span>
        <span
          className={`font-mono text-lg font-medium ${
            secondsLeft <= 60 ? "text-brick" : "text-teal"
          }`}
        >
          {formatTime(secondsLeft)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {questions.map((q, i) => {
          const isAnswered = answers[q.id] != null;
          return (
            <button
              key={q.id}
              onClick={() => setIndex(i)}
              className={`h-8 w-8 rounded text-xs font-mono transition-colors ${
                i === index
                  ? "bg-teal text-paper"
                  : isAnswered
                    ? "bg-teal-light text-teal"
                    : "border border-line text-ink-muted"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded border border-line bg-paper p-5">
        <p className="text-xs text-ink-muted">
          {currentQuestion.subject} · {currentQuestion.subtopic}
        </p>
        <p className="mt-3 leading-relaxed">{currentQuestion.statement}</p>

        <div className="mt-4 flex flex-col gap-2">
          {currentQuestion.alternatives.map((alt) => (
            <button
              key={alt.id}
              onClick={() =>
                setAnswers((a) => ({ ...a, [currentQuestion.id]: alt.id }))
              }
              className={`rounded border px-4 py-2 text-left text-sm transition-colors ${
                selected === alt.id
                  ? "border-teal bg-teal-light"
                  : "border-line hover:border-teal"
              }`}
            >
              {alt.text}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="rounded border border-line px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Anterior
          </button>
          <button
            onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
            disabled={index === questions.length - 1}
            className="rounded border border-line px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Próxima
          </button>
        </div>
        <button
          onClick={handleFinish}
          className="rounded bg-brick px-4 py-1.5 text-sm font-medium text-paper transition-colors hover:opacity-90"
        >
          Finalizar simulado
        </button>
      </div>
    </div>
  );
}
