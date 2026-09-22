import type {
  Discipline,
  Question,
  SimuladoAnswer,
  SimuladoBreakdown,
  SimuladoConfig,
  SimuladoResult,
} from "@/types";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

export function buildSimulado(
  allQuestions: Question[],
  config: SimuladoConfig
): Question[] {
  const pool =
    config.disciplineSlugs.length === 0
      ? allQuestions
      : allQuestions.filter((q) => config.disciplineSlugs.includes(q.disciplineSlug));

  return shuffle(pool).slice(0, config.questionCount);
}

function buildBreakdown(
  groups: Map<string, { label: string; total: number; correct: number }>
): SimuladoBreakdown[] {
  return Array.from(groups.entries()).map(([key, g]) => ({
    key,
    label: g.label,
    total: g.total,
    correct: g.correct,
    percent: g.total === 0 ? 0 : Math.round((g.correct / g.total) * 100),
  }));
}

export function computeSimuladoResult(
  questions: Question[],
  answers: SimuladoAnswer[],
  timeSpentSeconds: number,
  disciplines: Discipline[]
): SimuladoResult {
  const disciplineNames = new Map(disciplines.map((d) => [d.slug, d.name]));
  const byDisciplineMap = new Map<
    string,
    { label: string; total: number; correct: number }
  >();
  const bySubjectMap = new Map<
    string,
    { label: string; total: number; correct: number }
  >();

  let correctCount = 0;

  for (const question of questions) {
    const answer = answers.find((a) => a.questionId === question.id);
    const correct = answer?.selectedAlternativeId === question.correctAlternativeId;
    if (correct) correctCount += 1;

    const disciplineLabel = disciplineNames.get(question.disciplineSlug) ?? question.disciplineSlug;
    const disciplineEntry = byDisciplineMap.get(question.disciplineSlug) ?? {
      label: disciplineLabel,
      total: 0,
      correct: 0,
    };
    disciplineEntry.total += 1;
    if (correct) disciplineEntry.correct += 1;
    byDisciplineMap.set(question.disciplineSlug, disciplineEntry);

    const subjectEntry = bySubjectMap.get(question.subject) ?? {
      label: question.subject,
      total: 0,
      correct: 0,
    };
    subjectEntry.total += 1;
    if (correct) subjectEntry.correct += 1;
    bySubjectMap.set(question.subject, subjectEntry);
  }

  return {
    totalQuestions: questions.length,
    correctCount,
    scorePercent:
      questions.length === 0 ? 0 : Math.round((correctCount / questions.length) * 100),
    byDiscipline: buildBreakdown(byDisciplineMap),
    bySubject: buildBreakdown(bySubjectMap),
    timeSpentSeconds,
  };
}
