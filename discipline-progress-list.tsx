import type { DisciplineProgressStat } from "@/lib/stats";

export function DisciplineProgressList({
  disciplines,
}: {
  disciplines: DisciplineProgressStat[];
}) {
  return (
    <div className="rounded border border-line bg-paper p-4">
      <h2 className="text-lg font-semibold">Progresso por disciplina</h2>
      <div className="mt-4 flex flex-col gap-4">
        {disciplines.map((d) => (
          <div key={d.slug}>
            <div className="flex items-center justify-between text-sm">
              <span>{d.name}</span>
              <span className="font-mono text-ink-muted">
                {d.completedLessons}/{d.totalLessons} aulas
              </span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded bg-line">
              <div
                className="h-full bg-teal transition-all"
                style={{ width: `${d.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
