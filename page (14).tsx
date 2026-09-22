"use client";

import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { DisciplineProgressList } from "@/components/dashboard/discipline-progress-list";
import { disciplines } from "@/config/edital";
import { CARGO_LABEL } from "@/config/exam";
import { computeDashboardStats } from "@/lib/stats";
import { useProgress } from "@/lib/use-progress";

export default function DashboardPage() {
  const progress = useProgress();
  const stats = computeDashboardStats(disciplines, progress);

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-content px-6 py-10">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-ink-muted">{CARGO_LABEL}</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard label="Dias até a prova" value={stats.daysRemaining} accent="brick" />
          <StatCard label="Progresso geral" value={`${stats.overallPercent}%`} />
          <StatCard label="Horas estudadas" value={stats.hoursStudied} />
          <StatCard label="Questões resolvidas" value={stats.questionsAnswered} />
          <StatCard
            label="Percentual de acerto"
            value={`${stats.correctPercent}%`}
            accent="ochre"
          />
          <StatCard label="Sequência de estudos" value={`${stats.streakDays} dias`} accent="ochre" />
        </div>

        <div className="mt-6">
          <DisciplineProgressList disciplines={stats.disciplineProgress} />
        </div>

        {stats.totalLessons === 0 && (
          <p className="mt-6 text-sm text-ink-muted">
            Ainda não há aulas cadastradas nas disciplinas — o progresso vai
            aparecer aqui assim que o conteúdo for adicionado.
          </p>
        )}
      </main>
    </div>
  );
}
