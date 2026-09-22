export interface SimuladoConfig {
  disciplineSlugs: string[];
  questionCount: number;
  timeLimitMinutes: number;
}

export interface SimuladoAnswer {
  questionId: string;
  selectedAlternativeId: string | null;
}

export interface SimuladoBreakdown {
  key: string;
  label: string;
  total: number;
  correct: number;
  percent: number;
}

export interface SimuladoResult {
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
  byDiscipline: SimuladoBreakdown[];
  bySubject: SimuladoBreakdown[];
  timeSpentSeconds: number;
}
