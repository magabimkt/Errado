import type { Discipline, UserProgress } from "@/types";
import { EXAM_DATE } from "@/config/exam";

export interface DisciplineProgressStat {
  slug: string;
  name: string;
  totalLessons: number;
  completedLessons: number;
  percent: number;
}

export interface DashboardStats {
  daysRemaining: number;
  totalLessons: number;
  completedLessons: number;
  overallPercent: number;
  disciplineProgress: DisciplineProgressStat[];
  hoursStudied: number;
  questionsAnswered: number;
  correctPercent: number;
  streakDays: number;
}

export function getDaysRemaining(now: Date = new Date()): number {
  const examDate = new Date(EXAM_DATE);
  const diffMs = examDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

function percent(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

export function computeDashboardStats(
  disciplines: Discipline[],
  progress: UserProgress
): DashboardStats {
  const disciplineProgress: DisciplineProgressStat[] = disciplines.map((d) => {
    const lessonSlugs = d.modules.flatMap((m) => m.lessons.map((l) => l.slug));
    const completed = lessonSlugs.filter(
      (slug) => progress.lessons[slug]?.completed
    ).length;

    return {
      slug: d.slug,
      name: d.name,
      totalLessons: lessonSlugs.length,
      completedLessons: completed,
      percent: percent(completed, lessonSlugs.length),
    };
  });

  const totalLessons = disciplineProgress.reduce((sum, d) => sum + d.totalLessons, 0);
  const completedLessons = disciplineProgress.reduce(
    (sum, d) => sum + d.completedLessons,
    0
  );

  const totalMinutes = progress.studySessions.reduce(
    (sum, s) => sum + s.minutesStudied,
    0
  );

  const correctAnswers = progress.questionAttempts.filter((a) => a.correct).length;

  return {
    daysRemaining: getDaysRemaining(),
    totalLessons,
    completedLessons,
    overallPercent: percent(completedLessons, totalLessons),
    disciplineProgress,
    hoursStudied: Math.round((totalMinutes / 60) * 10) / 10,
    questionsAnswered: progress.questionAttempts.length,
    correctPercent: percent(correctAnswers, progress.questionAttempts.length),
    streakDays: progress.streakDays,
  };
}

export const emptyProgress: UserProgress = {
  lessons: {},
  questionAttempts: [],
  studySessions: [],
  streakDays: 0,
  lastStudyDate: null,
};
