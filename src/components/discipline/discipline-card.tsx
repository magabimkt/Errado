import Link from "next/link";
import type { DisciplineProgressStat } from "@/lib/stats";

export function DisciplineCard({
  slug,
  name,
  description,
  moduleCount,
  progress,
}: {
  slug: string;
  name: string;
  description: string;
  moduleCount: number;
  progress: DisciplineProgressStat;
}) {
  return (
    <Link
      href={`/disciplinas/${slug}`}
      className="block rounded border border-line bg-paper p-5 transition-colors hover:border-teal"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold">{name}</h2>
          <p className="mt-1 text-sm text-ink-muted">{description}</p>
        </div>
        <span className="whitespace-nowrap font-mono text-sm text-ink-muted">
          {moduleCount} módulos
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-muted">Progresso</span>
          <span className="font-mono text-ink-muted">
            {progress.completedLessons}/{progress.totalLessons} aulas
          </span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded bg-line">
          <div
            className="h-full bg-teal transition-all"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
