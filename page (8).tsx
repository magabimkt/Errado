import Link from "next/link";
import { Header } from "@/components/layout/header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto flex max-w-content flex-col justify-center gap-8 px-6 py-16">
        <span className="font-mono text-sm uppercase tracking-wide text-ink-muted">
          Edital nº 01/2026 — Cargo ACA
        </span>

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Plataforma de Estudos
            <br />
            <span className="text-teal">IBGE — ACA 2026</span>
          </h1>
          <p className="mt-4 max-w-content text-ink-muted">
            Fundação do projeto e dashboard concluídos. As próximas etapas
            vão trazer as disciplinas do edital, questões, flashcards e
            simulados.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-block rounded bg-teal px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-teal-dark"
          >
            Ver dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
