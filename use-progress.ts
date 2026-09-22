"use client";

import { useEffect, useState } from "react";
import type { UserProgress } from "@/types";
import { getItem, storageKeys } from "@/lib/storage";
import { emptyProgress } from "@/lib/stats";

export function useProgress(): UserProgress {
  const [progress, setProgress] = useState<UserProgress>(emptyProgress);

  useEffect(() => {
    setProgress(getItem<UserProgress>(storageKeys.progress, emptyProgress));
  }, []);

  return progress;
}
