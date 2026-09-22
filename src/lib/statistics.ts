import type { Difficulty, Question, QuestionAttempt, StudySession } from "@/types";
import { disciplines } from "@/config/edital";

export interface AccuracyBreakdown {
  key: string;
  label: string;
  attempts: number;
  correct: number;
  percent: number;
}

function buildQuestionLookup(questions: Question[]): Map<string, Question> {
  return new Map(questions.map((q) => [q.id, q]));
}

function toBreakdown(
  groups: Map<string, { label: string; attempts: number; correct: number }>
): AccuracyBreakdown[] {
  return Array.from(groups.entries())
    .map(([key, g]) => ({
      key,
      label: g.label,
      attempts: g.attempts,
      correct: g.correct,
      percent: g.attempts === 0 ? 0 : Math.round((g.correct / g.attempts) * 100),
    }))
    .sort((a, b) => b.attempts - a.attempts);
}

export function computeAccuracyByDiscipline(
  attempts: QuestionAttempt[],
  questions: Question[]
): AccuracyBreakdown[] {
  const lookup = buildQuestionLookup(questions);
  const disciplineNames = new Map(disciplines.map((d) => [d.slug, d.name]));
  const groups = new Map<string, { label: string; attempts: number; correct: number }>();

  for (const attempt of attempts) {
    const question = lookup.get(attempt.questionId);
    if (!question) continue;

    const entry = groups.get(question.disciplineSlug) ?? {
      label: disciplineNames.get(question.disciplineSlug) ?? question.disciplineSlug,
      attempts: 0,
      correct: 0,
    };
    entry.attempts += 1;
    if (attempt.correct) entry.correct += 1;
    groups.set(question.disciplineSlug, entry);
  }

  return toBreakdown(groups);
}

export function computeAccuracyBySubject(
  attempts: QuestionAttempt[],
  questions: Question[]
): AccuracyBreakdown[] {
  const lookup = buildQuestionLookup(questions);
  const groups = new Map<string, { label: string; attempts: number; correct: number }>();

  for (const attempt of attempts) {
    const question = lookup.get(attempt.questionId);
    if (!question) continue;

    const entry = groups.get(question.subject) ?? {
      label: question.subject,
      attempts: 0,
      correct: 0,
    };
    entry.attempts += 1;
    if (attempt.correct) entry.correct += 1;
    groups.set(question.subject, entry);
  }

  return toBreakdown(groups);
}

export function computeAccuracyByDifficulty(
  attempts: QuestionAttempt[],
  questions: Question[]
): AccuracyBreakdown[] {
  const lookup = buildQuestionLookup(questions);
  const labels: Record<Difficulty, string> = {
    facil: "Fácil",
    medio: "Médio",
    dificil: "Difícil",
  };
  const groups = new Map<string, { label: string; attempts: number; correct: number }>();

  for (const attempt of attempts) {
    const question = lookup.get(attempt.questionId);
    if (!question) continue;

    const entry = groups.get(question.difficulty) ?? {
      label: labels[question.difficulty],
      attempts: 0,
      correct: 0,
    };
    entry.attempts += 1;
    if (attempt.correct) entry.correct += 1;
    groups.set(question.difficulty, entry);
  }

  return toBreakdown(groups);
}

const MIN_ATTEMPTS_FOR_RANKING = 3;

export function getStrongSubjects(
  bySubject: AccuracyBreakdown[],
  limit = 5
): AccuracyBreakdown[] {
  return bySubject
    .filter((s) => s.attempts >= MIN_ATTEMPTS_FOR_RANKING)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, limit);
}

export function getWeakSubjects(
  bySubject: AccuracyBreakdown[],
  limit = 5
): AccuracyBreakdown[] {
  return bySubject
    .filter((s) => s.attempts >= MIN_ATTEMPTS_FOR_RANKING)
    .sort((a, b) => a.percent - b.percent)
    .slice(0, limit);
}

export interface DailyStudyMinutes {
  date: string;
  minutes: number;
}

/**
 * Minutos estudados por dia nos últimos `days` dias (padrão: 14),
 * usado no gráfico de tempo de estudo da tela de estatísticas.
 */
export function computeStudyTimeByDay(
  sessions: StudySession[],
  days = 14
): DailyStudyMinutes[] {
  const result: DailyStudyMinutes[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().slice(0, 10);

    const minutes = sessions
      .filter((s) => s.startedAt.slice(0, 10) === dateKey)
      .reduce((sum, s) => sum + s.minutesStudied, 0);

    result.push({ date: dateKey, minutes });
  }

  return result;
}
