import type { Difficulty } from "./discipline";

export interface QuestionAlternative {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  disciplineSlug: string;
  subject: string;
  subtopic: string;
  difficulty: Difficulty;
  statement: string;
  alternatives: QuestionAlternative[];
  correctAlternativeId: string;
  explanation: string;
  keywords: string[];
}
