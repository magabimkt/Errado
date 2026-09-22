"use client";

import { useEffect, useState } from "react";
import type { FlashcardReviewState } from "@/types";
import { getItem, storageKeys } from "@/lib/storage";

export function useFlashcardReviews(): Record<string, FlashcardReviewState> {
  const [reviews, setReviews] = useState<Record<string, FlashcardReviewState>>({});

  useEffect(() => {
    setReviews(
      getItem<Record<string, FlashcardReviewState>>(storageKeys.flashcardReviews, {})
    );
  }, []);

  return reviews;
}
