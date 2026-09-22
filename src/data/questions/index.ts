import type { Question } from "@/types";

/**
 * Banco de questões, separado do conteúdo das aulas conforme a arquitetura
 * definida no projeto. Cada disciplina tem seu próprio arquivo em
 * src/data/questions — este índice apenas agrega tudo em uma lista única
 * para os componentes de prática/simulado consumirem.
 *
 * Ainda não há questões cadastradas; os arrays por disciplina começam
 * vazios e serão preenchidos numa etapa futura de criação de conteúdo.
 */
import { linguaPortuguesaQuestions } from "./lingua-portuguesa";
import { raciocinioLogicoQuestions } from "./raciocinio-logico-quantitativo";
import { nocoesDeAdministracaoQuestions } from "./nocoes-de-administracao";

export const allQuestions: Question[] = [
  ...linguaPortuguesaQuestions,
  ...raciocinioLogicoQuestions,
  ...nocoesDeAdministracaoQuestions,
];
