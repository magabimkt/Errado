"use client";

import Link from "next/link";
import type { Discipline } from "@/types";
import { useProgress } from "@/lib/use-progress";

export function ModuleList({ discipline }: { discipline: Discipline }) {
  const progress = useProgress();

  return (
    <div className="mt-8 flex flex-col gap-3">
      {discipline.modules.map((module) => {
        const completedCount = module.lessons.filter(
          (l) => progress.lessons[l.slug]?.completed
        ).length;

        return (
          <div key={module.slug} className="rounded border border-line bg-paper p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-ink-muted">
                  Módulo {module.order}
                </span>
                <h3 className="font-medium">{module.name}</h3>
              </div>
              <span className="whitespace-nowrap font-mono text-sm text-ink-muted">
                {completedCount}/{module.lessons.length} aulas
              </span>
            </div>

            {module.lessons.length === 0 ? (
              <p className="mt-2 text-sm text-ink-muted">
                Aulas deste módulo ainda não foram cadastradas.
              </p>
            ) : (
              <ul className="mt-3 flex flex-col gap-1">
                {module.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <Link
                      href={`/disciplinas/${discipline.slug}/${module.slug}/${lesson.slug}`}
                      className="flex items-center justify-between rounded px-2 py-1.5 text-sm hover:bg-teal-light"
                    >
                      <span>{lesson.title}</span>
                      {progress.lessons[lesson.slug]?.completed && (
                        <span className="font-mono text-xs text-teal">concluída</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
