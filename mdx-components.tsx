import type { MDXComponents } from "mdx/types";
import {
  Atencao,
  Curiosidade,
  Comparacao,
  ErroComum,
  Pegadinha,
  ExemploIBGE,
} from "@/components/mdx/callouts";

/**
 * Registra os componentes disponíveis dentro de qualquer arquivo .mdx do
 * projeto. As aulas podem usar estas tags diretamente no texto, por exemplo:
 *
 *   <Atencao>Isto é importante.</Atencao>
 *   <Pegadinha>A banca costuma trocar "mas" por "mais" aqui.</Pegadinha>
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Atencao,
    Curiosidade,
    Comparacao,
    ErroComum,
    Pegadinha,
    ExemploIBGE,
    ...components,
  };
}
