import type { SimuladoResult } from "@/types";

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}min ${seconds}s`;
}

export function SimuladoResults({
  result,
  onRestart,
}: {
  result: SimuladoResult;
  onRestart: () => void;
}) {
  return (
    <div>
      <div className="rounded border border-line bg-paper p-6 text-center">
        <p className="text-sm text-ink-muted">Resultado</p>
        <p className="mt-1 font-mono text-5xl font-medium text-teal">
          {result.scorePercent}%
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          {result.correctCount} de {result.totalQuestions} questões corretas ·{" "}
          {formatDuration(result.timeSpentSeconds)}
        </p>
      </div>

      <div className="mt-4 rounded border border-line bg-paper p-4">
        <h3 className="font-medium">Desempenho por disciplina</h3>
        <div className="mt-3 flex flex-col gap-3">
          {result.byDiscipline.map((d) => (
            <div key={d.key}>
              <div className="flex items-center justify-between text-sm">
                <span>{d.label}</span>
                <span className="font-mono text-ink-muted">
                  {d.correct}/{d.total}
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

      <div className="mt-4 rounded border border-line bg-paper p-4">
        <h3 className="font-medium">Desempenho por assunto</h3>
        <div className="mt-3 flex flex-col gap-3">
          {result.bySubject.map((s) => (
            <div key={s.key}>
              <div className="flex items-center justify-between text-sm">
                <span>{s.label}</span>
                <span className="font-mono text-ink-muted">
                  {s.correct}/{s.total}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded bg-line">
                <div
                  className="h-full bg-ochre transition-all"
                  style={{ width: `${s.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="mt-6 w-full rounded bg-teal px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-teal-dark"
      >
        Fazer outro simulado
      </button>
    </div>
  );
}
