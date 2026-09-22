import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { ModuleList } from "@/components/discipline/module-list";
import { disciplines, getDisciplineBySlug } from "@/config/edital";

export function generateStaticParams() {
  return disciplines.map((d) => ({ slug: d.slug }));
}

export default function DisciplinePage({
  params,
}: {
  params: { slug: string };
}) {
  const discipline = getDisciplineBySlug(params.slug);

  if (!discipline) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-content px-6 py-10">
        <h1 className="text-3xl font-bold">{discipline.name}</h1>
        <p className="mt-1 text-ink-muted">{discipline.description}</p>

        <ModuleList discipline={discipline} />
      </main>
    </div>
  );
}
