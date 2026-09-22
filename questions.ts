import type { Difficulty, Question } from "@/types";

export interface QuestionFilters {
  disciplineSlug?: string;
  subject?: string;
  difficulty?: Difficulty;
  keyword?: string;
}

export function filterQuestions(
  questions: Question[],
  filters: QuestionFilters
): Question[] {
  return questions.filter((q) => {
    if (filters.disciplineSlug && q.disciplineSlug !== filters.disciplineSlug) {
      return false;
    }
    if (filters.subject && q.subject !== filters.subject) {
      return false;
    }
    if (filters.difficulty && q.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.keyword) {
      const needle = filters.keyword.toLowerCase();
      const haystack = [q.statement, q.subject, q.subtopic, ...q.keywords]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });
}

export function getSubjectsForDiscipline(
  questions: Question[],
  disciplineSlug: string
): string[] {
  const subjects = new Set(
    questions.filter((q) => q.disciplineSlug === disciplineSlug).map((q) => q.subject)
  );
  return Array.from(subjects);
}
