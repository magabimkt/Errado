import type { Flashcard } from "@/types";
import { linguaPortuguesaFlashcards } from "./lingua-portuguesa";
import { raciocinioLogicoFlashcards } from "./raciocinio-logico-quantitativo";
import { nocoesDeAdministracaoFlashcards } from "./nocoes-de-administracao";

export const allFlashcards: Flashcard[] = [
  ...linguaPortuguesaFlashcards,
  ...raciocinioLogicoFlashcards,
  ...nocoesDeAdministracaoFlashcards,
];
