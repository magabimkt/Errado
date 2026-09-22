"use client";

import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { AccuracyBreakdownList } from "@/components/statistics/accuracy-breakdown-list";
import { StudyTimeChart } from "@/components/statistics/study-time-chart";
import { allQuestions } from "@/data/questions";
import { useProgress } from "@/lib/use-progress";
import {
  computeAccuracyByDifficulty,
  computeAccuracyByDiscipline,
  computeAccuracyBySubject,
  computeStudyTimeByDay,
  getStrongSubjects,
  getWeakSubjects,
} from "@/lib/statistics";

export default function EstatisticasPage() {
  const progress = useProgress();

  const byDiscipline = computeAccuracyByDiscipline(progress.questionAttempts, allQuestions);
  const bySubject = computeAccuracyBySubject(progress.questionAttempts, allQuestions);
  const byDifficulty = computeAccuracyByDifficulty(progress.questionAttempts, allQuestions);
  const strongSubjects = getStrongSubjects(bySubject);
  const weakSubjects = getWeakSubjects(bySubject);
  const studyTime = computeStudyTimeByDay(progress.studySessions);

  const totalAttempts = progress.questionAttempts.length;
  const totalCorrect = progress.questionAttempts.filter((a) => a.correct).length;
  const overallAccuracy =
    totalAttempts === 0 ? 0 : Math.round((totalCorrect / totalAttempts) * 100);

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-content px-6 py-10">
        <h1 className="text-3xl font-bold">Estatísticas</h1>
        <p className="mt-1 text-ink-muted">
          Desempenho detalhado com base em todo o seu histórico de questões e
          simulados.
        </p>

        {totalAttempts === 0 ? (
          <p className="mt-6 text-sm text-ink-muted">
            Ainda não há questões respondidas. Assim que você praticar em
            Questões ou fizer um simulado, as estatísticas aparecem aqui.
          </p>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <StatCard label="Questões respondidas" value={totalAttempts} />
              <StatCard label="Acertos" value={totalCorrect} accent="teal" />
              <StatCard label="Aproveitamento geral" value={`${overallAccuracy}%`} accent="ochre" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <AccuracyBreakdownList
                title="Assuntos fortes"
                items={strongSubjects}
                accent="teal"
                emptyMessage="Responda pelo menos 3 questões de um mesmo assunto para aparecer aqui."
              />
              <AccuracyBreakdownList
                title="Assuntos fracos"
                items={weakSubjects}
                accent="brick"
                emptyMessage="Responda pelo menos 3 questões de um mesmo assunto para aparecer aqui."
              />
            </div>

            <div className="mt-6">
              <AccuracyBreakdownList
                title="Desempenho por disciplina"
                items={byDiscipline}
                accent="teal"
                emptyMessage="Sem dados ainda."
              />
            </div>

            <div className="mt-6">
              <AccuracyBreakdownList
                title="Desempenho por assunto"
                items={bySubject}
                accent="ochre"
                emptyMessage="Sem dados ainda."
              />
            </div>

            <div className="mt-6">
              <AccuracyBreakdownList
                title="Desempenho por dificuldade"
                items={byDifficulty}
                accent="teal"
                emptyMessage="Sem dados ainda."
              />
            </div>
          </>
        )}

        <div className="mt-6">
          <StudyTimeChart data={studyTime} />
        </div>
      </main>
    </div>
  );
}
