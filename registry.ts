import type { ComponentType } from "react";

/**
 * Registro explícito das aulas em MDX.
 *
 * A exportação estática do Next.js (necessária para publicar no GitHub
 * Pages) não consegue resolver `import(`.../${variavel}.mdx`)` com o
 * caminho montado dinamicamente — o build precisa saber, de antemão,
 * quais arquivos existem. Por isso, toda aula nova precisa de uma linha
 * aqui, além do arquivo .mdx em si dentro de src/content.
 *
 * Padrão da chave: "disciplina-slug/modulo-slug/aula-slug"
 * (os mesmos slugs usados em src/config/edital.ts)
 *
 * Exemplo, quando a primeira aula for escrita:
 *
 *   import CompreensaoTextual from "./lingua-portuguesa/compreensao-interpretacao/o-que-e-compreensao-textual.mdx";
 *
 *   export const lessonContentRegistry: Record<string, ComponentType> = {
 *     "lingua-portuguesa/compreensao-interpretacao/o-que-e-compreensao-textual": CompreensaoTextual,
 *   };
 */
export const lessonContentRegistry: Record<string, ComponentType> = {};
