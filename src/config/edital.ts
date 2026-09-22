import type { Discipline, LessonMeta } from "@/types";

/**
 * Estrutura de disciplinas e módulos do Edital nº 01/2026 (IBFC/IBGE),
 * cargo Agente Censitário Administrativo (ACA).
 *
 * Cada módulo corresponde a um tópico do conteúdo programático oficial.
 * As aulas (lessons) de cada módulo ainda não existem — serão adicionadas
 * numa etapa futura de criação de conteúdo. Por enquanto os arrays de
 * `lessons` ficam vazios; o dashboard e a navegação já sabem lidar com
 * módulos sem aulas.
 */
export const disciplines: Discipline[] = [
  {
    slug: "lingua-portuguesa",
    name: "Língua Portuguesa",
    description: "15 questões na prova — peso 1,00.",
    modules: [
      { slug: "compreensao-interpretacao", name: "Compreensão e interpretação de texto", order: 1, lessons: [] },
      { slug: "significacao-das-palavras", name: "Significação das palavras: sinônimos, antônimos, homônimos e parônimos", order: 2, lessons: [] },
      { slug: "pontuacao-sequencia", name: "Pontuação e sequência lógica de frases e parágrafos", order: 3, lessons: [] },
      { slug: "ortografia-acentuacao", name: "Ortografia oficial e acentuação gráfica", order: 4, lessons: [] },
      { slug: "classes-de-palavras", name: "Classes de palavras", order: 5, lessons: [] },
      { slug: "concordancia", name: "Concordância nominal e verbal", order: 6, lessons: [] },
      { slug: "regencia", name: "Regência nominal e verbal", order: 7, lessons: [] },
      { slug: "verbos-vozes", name: "Verbos regulares, irregulares e anômalos. Vozes verbais", order: 8, lessons: [] },
      { slug: "pronomes", name: "Emprego dos pronomes", order: 9, lessons: [] },
      { slug: "sintaxe", name: "Sintaxe: termos essenciais, integrantes e acessórios da oração", order: 10, lessons: [] },
      { slug: "coesao-coerencia", name: "Coesão e coerência textual", order: 11, lessons: [] },
      { slug: "redacao-textos-oficiais", name: "Redação e reescrita de comunicados, ofícios e registros operacionais", order: 12, lessons: [] },
    ],
  },
  {
    slug: "raciocinio-logico-quantitativo",
    name: "Raciocínio Lógico Quantitativo",
    description: "10 questões na prova — peso 1,00.",
    modules: [
      { slug: "estruturas-logicas-argumentacao", name: "Estruturas lógicas e lógica de argumentação", order: 1, lessons: [] },
      { slug: "diagramas-logicos", name: "Diagramas lógicos", order: 2, lessons: [] },
      { slug: "aritmetica", name: "Aritmética", order: 3, lessons: [] },
      { slug: "algebra-basica", name: "Álgebra básica", order: 4, lessons: [] },
      { slug: "geometria-basica", name: "Geometria básica", order: 5, lessons: [] },
    ],
  },
  {
    slug: "nocoes-de-administracao",
    name: "Noções de Administração",
    description: "35 questões na prova — peso 1,00.",
    modules: [
      { slug: "aspectos-gerais-administracao", name: "Aspectos gerais da Administração e organizações como sistemas abertos", order: 1, lessons: [] },
      { slug: "funcoes-administrativas", name: "Funções administrativas: planejamento, organização, direção, coordenação e controle", order: 2, lessons: [] },
      { slug: "motivacao-comunicacao-lideranca", name: "Motivação, comunicação e liderança", order: 3, lessons: [] },
      { slug: "grupos-trabalho-em-equipe", name: "Eficiência de grupos e trabalho em equipe", order: 4, lessons: [] },
      { slug: "autoridade-delegacao", name: "Responsabilidade, coordenação, autoridade, poder e delegação", order: 5, lessons: [] },
      { slug: "qualidade-em-servicos", name: "Qualidade na prestação de serviços", order: 6, lessons: [] },
      { slug: "atendimento-ao-publico", name: "Noções de atendimento ao público", order: 7, lessons: [] },
      { slug: "documentacao-e-arquivo", name: "Noções de documentação e arquivo", order: 8, lessons: [] },
    ],
  },
];

export function getDisciplineBySlug(slug: string): Discipline | undefined {
  return disciplines.find((d) => d.slug === slug);
}

export function getAllModulesCount(): number {
  return disciplines.reduce((total, d) => total + d.modules.length, 0);
}

export interface FlatLesson extends LessonMeta {
  disciplineName: string;
  moduleName: string;
}

export function getAllLessons(): FlatLesson[] {
  return disciplines.flatMap((d) =>
    d.modules.flatMap((m) =>
      m.lessons.map((l) => ({ ...l, disciplineName: d.name, moduleName: m.name }))
    )
  );
}

export function getAdjacentLessons(currentSlug: string): {
  previous: FlatLesson | null;
  next: FlatLesson | null;
} {
  const all = getAllLessons();
  const index = all.findIndex((l) => l.slug === currentSlug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index > 0 ? all[index - 1]! : null,
    next: index < all.length - 1 ? all[index + 1]! : null,
  };
}
