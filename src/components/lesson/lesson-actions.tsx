"use client";

import { useEffect, useState } from "react";
import type { LessonProgress } from "@/types";
import { getItem, storageKeys } from "@/lib/storage";
import { emptyProgress } from "@/lib/stats";
import { toggleLessonComplete, toggleLessonFavorite } from "@/lib/progress-actions";

export function LessonActions({ lessonSlug }: { lessonSlug: string }) {
  const [lessonState, setLessonState] = useState<LessonProgress | undefined>();

  useEffect(() => {
    const progress = getItem(storageKeys.progress, emptyProgress);
    setLessonState(progress.lessons[lessonSlug]);
  }, [lessonSlug]);

  function handleToggleComplete() {
    const updated = toggleLessonComplete(lessonSlug);
    setLessonState(updated.lessons[lessonSlug]);
  }

  function handleToggleFavorite() {
    const updated = toggleLessonFavorite(lessonSlug);
    setLessonState(updated.lessons[lessonSlug]);
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleToggleComplete}
        className={`rounded border px-4 py-2 text-sm font-medium transition-colors ${
          lessonState?.completed
            ? "border-teal bg-teal text-paper"
            : "border-line text-ink hover:border-teal"
        }`}
      >
        {lessonState?.completed ? "Concluída" : "Marcar como concluída"}
      </button>
      <button
        onClick={handleToggleFavorite}
        className={`rounded border px-4 py-2 text-sm font-medium transition-colors ${
          lessonState?.favorited
            ? "border-ochre bg-ochre-light text-ochre"
            : "border-line text-ink hover:border-ochre"
        }`}
      >
        {lessonState?.favorited ? "★ Favorita" : "☆ Favoritar"}
      </button>
    </div>
  );
}
