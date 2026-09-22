"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { ThemeToggle } from "@/components/theme-toggle";
import { CARGO_LABEL, EDITAL_LABEL } from "@/config/exam";
import { removeItem, storageKeys } from "@/lib/storage";

export default function ConfiguracoesPage() {
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);

  function handleClearProgress() {
    removeItem(storageKeys.progress);
    removeItem(storageKeys.favorites);
    removeItem(storageKeys.flashcardReviews);
    setConfirming(false);
    setCleared(true);
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-content px-6 py-10">
        <h1 className="text-3xl font-bold">Configurações</h1>

        <div className="mt-6 rounded border border-line bg-paper p-4">
          <h2 className="font-medium">Aparência</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Escolha entre tema claro, escuro ou o padrão do sistema.
          </p>
          <div className="mt-3">
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-4 rounded border border-line bg-paper p-4">
          <h2 className="font-medium">Sobre o concurso</h2>
          <p className="mt-1 text-sm text-ink-muted">{EDITAL_LABEL}</p>
          <p className="text-sm text-ink-muted">{CARGO_LABEL}</p>
        </div>

        <div className="mt-4 rounded border border-brick bg-brick-light p-4">
          <h2 className="font-medium text-brick">Zona de risco</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Apaga permanentemente o progresso salvo neste dispositivo: aulas
            concluídas, favoritos, respostas de questões e revisões de
            flashcards.
          </p>

          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              className="mt-3 rounded border border-brick px-4 py-2 text-sm text-brick transition-colors hover:bg-brick hover:text-paper"
            >
              Limpar todo o progresso
            </button>
          ) : (
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm">Tem certeza? Essa ação não pode ser desfeita.</span>
              <button
                onClick={handleClearProgress}
                className="rounded bg-brick px-3 py-1.5 text-sm text-paper"
              >
                Sim, limpar
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="rounded border border-line px-3 py-1.5 text-sm"
              >
                Cancelar
              </button>
            </div>
          )}

          {cleared && (
            <p className="mt-2 text-sm text-teal">
              Progresso apagado. Recarregue a página para ver o dashboard zerado.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
