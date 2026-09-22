"use client";

import { Header } from "@/components/layout/header";
import { DisciplineCard } from "@/components/discipline/discipline-card";
import { disciplines } from "@/config/edital";
import { computeDashboardStats } from "@/lib/stats";
import { useProgress } from "@/lib/use-progress";

export default function DisciplinasPage() {
  const progress = useProgress();
  const stats = computeDashboardStats(disciplines, progress);

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-content px-6 py-10">
        <h1 className="text-3xl font-bold">Disciplinas</h1>
        <p className="mt-1 text-ink-muted">
          Conteúdo programático completo do Edital nº 01/2026, cargo ACA.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {disciplines.map((discipline) => {
            const disciplineStats = stats.disciplineProgress.find(
              (d) => d.slug === discipline.slug
            )!;

            return (
              <DisciplineCard
                key={discipline.slug}
                slug={discipline.slug}
                name={discipline.name}
                description={discipline.description}
                moduleCount={discipline.modules.length}
                progress={disciplineStats}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
