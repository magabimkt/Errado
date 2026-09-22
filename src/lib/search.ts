import { disciplines, getAllLessons } from "@/config/edital";
import { allQuestions } from "@/data/questions";
import { allFlashcards } from "@/data/flashcards";

export interface SearchResultItem {
  type: "disciplina" | "modulo" | "aula" | "questao" | "flashcard";
  title: string;
  subtitle?: string;
  href: string;
}

export function search(query: string): SearchResultItem[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];

  const results: SearchResultItem[] = [];

  for (const d of disciplines) {
    if (d.name.toLowerCase().includes(needle)) {
      results.push({
        type: "disciplina",
        title: d.name,
        subtitle: d.description,
        href: `/disciplinas/${d.slug}`,
      });
    }
    for (const m of d.modules) {
      if (m.name.toLowerCase().includes(needle)) {
        results.push({
          type: "modulo",
          title: m.name,
          subtitle: d.name,
          href: `/disciplinas/${d.slug}`,
        });
      }
    }
  }

  for (const l of getAllLessons()) {
    if (
      l.title.toLowerCase().includes(needle) ||
      l.theme.toLowerCase().includes(needle)
    ) {
      results.push({
        type: "aula",
        title: l.title,
        subtitle: `${l.disciplineName} · ${l.moduleName}`,
        href: `/disciplinas/${l.disciplineSlug}/${l.moduleSlug}/${l.slug}`,
      });
    }
  }

  for (const q of allQuestions) {
    const haystack = [q.statement, q.subject, q.subtopic, ...q.keywords]
      .join(" ")
      .toLowerCase();
    if (haystack.includes(needle)) {
      results.push({
        type: "questao",
        title: q.subject,
        subtitle: q.statement.slice(0, 80),
        href: "/questoes",
      });
    }
  }

  for (const f of allFlashcards) {
    if (f.front.toLowerCase().includes(needle) || f.subject.toLowerCase().includes(needle)) {
      results.push({
        type: "flashcard",
        title: f.front,
        subtitle: f.subject,
        href: "/flashcards",
      });
    }
  }

  return results;
}
