export interface LessonProgress {
  lessonSlug: string;
  completed: boolean;
  favorited: boolean;
  completedAt: string | null;
}

export interface QuestionAttempt {
  questionId: string;
  selectedAlternativeId: string;
  correct: boolean;
  answeredAt: string;
}

export interface StudySession {
  id: string;
  startedAt: string;
  endedAt: string | null;
  minutesStudied: number;
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  questionAttempts: QuestionAttempt[];
  studySessions: StudySession[];
  streakDays: number;
  lastStudyDate: string | null;
}
