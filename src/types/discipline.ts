export type Difficulty = "facil" | "medio" | "dificil";

export interface Discipline {
  slug: string;
  name: string;
  description: string;
  modules: Module[];
}

export interface Module {
  slug: string;
  name: string;
  order: number;
  lessons: LessonMeta[];
}

/**
 * Metadados da aula (usados em listagens, dashboard, busca).
 * O conteúdo em si vive no arquivo MDX correspondente em src/content.
 */
export interface LessonMeta {
  slug: string;
  title: string;
  disciplineSlug: string;
  moduleSlug: string;
  theme: string;
  estimatedMinutes: number;
  difficulty: Difficulty;
  objectives: string[];
  order: number;
}
