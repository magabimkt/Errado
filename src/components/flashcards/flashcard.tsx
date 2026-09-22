"use client";

import { useState } from "react";
import type { Flashcard as FlashcardType } from "@/types";
import { recordFlashcardReview } from "@/lib/progress-actions";

export function Flashcard({
  flashcard,
  onReviewed,
}: {
  flashcard: FlashcardType;
  onReviewed: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  function handleReview(knew: boolean) {
    recordFlashcardReview(flashcard.id, knew);
    setFlipped(false);
    onReviewed();
  }

  return (
    <div>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[220px] w-full flex-col items-center justify-center rounded border border-line bg-paper p-8 text-center transition-colors hover:border-teal"
      >
        <span className="mb-3 font-mono text-xs uppercase text-ink-muted">
          {flipped ? "Verso" : "Frente"} · {flashcard.subject}
        </span>
        <p className="text-lg">{flipped ? flashcard.back : flashcard.front}</p>
        {!flipped && (
          <span className="mt-4 text-xs text-ink-muted">Toque para virar</span>
        )}
      </button>

      {flipped && (
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => handleReview(false)}
            className="rounded border border-brick px-4 py-2 text-sm text-brick transition-colors hover:bg-brick-light"
          >
            Não sabia
          </button>
          <button
            onClick={() => handleReview(true)}
            className="rounded bg-teal px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-teal-dark"
          >
            Sabia
          </button>
        </div>
      )}
    </div>
  );
}
