import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/disciplinas", label: "Disciplinas" },
  { href: "/questoes", label: "Questões" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/simulados", label: "Simulados" },
  { href: "/estatisticas", label: "Estatísticas" },
  { href: "/revisoes", label: "Revisões" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/pesquisa", label: "Pesquisa" },
  { href: "/configuracoes", label: "Configurações" },
];

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-semibold">
            ACA IBGE
          </Link>
          <ThemeToggle />
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
