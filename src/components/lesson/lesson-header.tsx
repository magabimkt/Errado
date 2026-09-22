import type { LessonMeta } from "@/types";

const difficultyLabel: Record<LessonMeta["difficulty"], string> = {
  facil: "Fácil",
  medio: "Médio",
  dificil: "Difícil",
};

export function LessonHeader({
  lesson,
  disciplineName,
  moduleName,
}: {
  lesson: LessonMeta;
  disciplineName: string;
  moduleName: string;
}) {
  return (
    <div>
      <p className="text-xs text-ink-muted">
        {disciplineName} · {moduleName}
      </p>
      <h1 className="mt-1 text-3xl font-bold">{lesson.title}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-ink-muted">
        <span>{lesson.estimatedMinutes} min</span>
        <span>·</span>
        <span>{difficultyLabel[lesson.difficulty]}</span>
      </div>

      {lesson.objectives.length > 0 && (
        <div className="mt-4 rounded border border-line bg-paper p-4">
          <p className="text-sm font-medium">Objetivos desta aula</p>
          <ul className="mt-2 list-inside list-disc text-sm text-ink-muted">
            {lesson.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
