import Link from "next/link";
import type { FlatLesson } from "@/config/edital";

function lessonHref(lesson: FlatLesson): string {
  return `/disciplinas/${lesson.disciplineSlug}/${lesson.moduleSlug}/${lesson.slug}`;
}

export function LessonNav({
  previous,
  next,
}: {
  previous: FlatLesson | null;
  next: FlatLesson | null;
}) {
  if (!previous && !next) return null;

  return (
    <div className="mt-8 flex items-stretch justify-between gap-4 border-t border-line pt-6">
      {previous ? (
        <Link
          href={lessonHref(previous)}
          className="flex-1 rounded border border-line p-3 transition-colors hover:border-teal"
        >
          <span className="text-xs text-ink-muted">← Aula anterior</span>
          <p className="mt-1 text-sm font-medium">{previous.title}</p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={lessonHref(next)}
          className="flex-1 rounded border border-line p-3 text-right transition-colors hover:border-teal"
        >
          <span className="text-xs text-ink-muted">Próxima aula →</span>
          <p className="mt-1 text-sm font-medium">{next.title}</p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
