"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { getAllLessons } from "@/config/edital";
import { useProgress } from "@/lib/use-progress";

export default function FavoritosPage() {
  const progress = useProgress();
  const favoritedLessons = getAllLessons().filter(
    (l) => progress.lessons[l.slug]?.favorited
  );

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-content px-6 py-10">
        <h1 className="text-3xl font-bold">Favoritos</h1>
        <p className="mt-1 text-ink-muted">
          Aulas marcadas para acesso rápido.
        </p>

        <div className="mt-6">
          {favoritedLessons.length === 0 ? (
            <p className="text-sm text-ink-muted">
              Nenhuma aula favoritada ainda. Use o botão de favorito dentro de
              uma aula para encontrá-la aqui rapidamente depois.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {favoritedLessons.map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={`/disciplinas/${lesson.disciplineSlug}/${lesson.moduleSlug}/${lesson.slug}`}
                  className="rounded border border-line bg-paper p-4 transition-colors hover:border-teal"
                >
                  <p className="text-xs text-ink-muted">
                    {lesson.disciplineName} · {lesson.moduleName}
                  </p>
                  <p className="mt-1 font-medium">{lesson.title}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
