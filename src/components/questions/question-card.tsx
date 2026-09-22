"use client";

import { useState } from "react";
import type { Question } from "@/types";
import { recordQuestionAttempt } from "@/lib/progress-actions";

const difficultyLabel: Record<Question["difficulty"], string> = {
  facil: "Fácil",
  medio: "Médio",
  dificil: "Difícil",
};

export function QuestionCard({ question }: { question: Question }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const isCorrect = selectedId === question.correctAlternativeId;

  function handleSelect(alternativeId: string) {
    if (answered) return;
    setSelectedId(alternativeId);
  }

  function handleSubmit() {
    if (!selectedId || answered) return;
    setAnswered(true);
    recordQuestionAttempt({
      questionId: question.id,
      selectedAlternativeId: selectedId,
      correct: selectedId === question.correctAlternativeId,
    });
  }

  return (
    <div className="rounded border border-line bg-paper p-5">
      <div className="flex items-center justify-between text-xs text-ink-muted">
        <span>
          {question.subject} · {question.subtopic}
        </span>
        <span className="font-mono uppercase">
          {difficultyLabel[question.difficulty]}
        </span>
      </div>

      <p className="mt-3 leading-relaxed">{question.statement}</p>

      <div className="mt-4 flex flex-col gap-2">
        {question.alternatives.map((alt) => {
          const isSelected = selectedId === alt.id;
          const isRightAnswer = alt.id === question.correctAlternativeId;

          let stateClasses = "border-line hover:border-teal";
          if (answered && isRightAnswer) {
            stateClasses = "border-teal bg-teal-light";
          } else if (answered && isSelected && !isRightAnswer) {
            stateClasses = "border-brick bg-brick-light";
          } else if (isSelected) {
            stateClasses = "border-teal";
          }

          return (
            <button
              key={alt.id}
              onClick={() => handleSelect(alt.id)}
              disabled={answered}
              className={`rounded border px-4 py-2 text-left text-sm transition-colors ${stateClasses}`}
            >
              {alt.text}
            </button>
          );
        })}
      </div>

      {!answered ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedId}
          className="mt-4 rounded bg-teal px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-teal-dark disabled:opacity-40"
        >
          Responder
        </button>
      ) : (
        <div className="mt-4 rounded border border-line bg-paper p-4">
          <p className={`font-medium ${isCorrect ? "text-teal" : "text-brick"}`}>
            {isCorrect ? "Você acertou." : "Você errou."}
          </p>
          <p className="mt-2 text-sm text-ink-muted">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
