import type { ReactNode } from "react";

interface CalloutProps {
  title?: string;
  children: ReactNode;
}

function Callout({
  title,
  children,
  className,
  titleClassName,
}: CalloutProps & { className: string; titleClassName: string }) {
  return (
    <div className={`my-4 rounded border-l-4 p-4 ${className}`}>
      {title && <p className={`mb-1 text-sm font-semibold ${titleClassName}`}>{title}</p>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function Atencao({ children }: CalloutProps) {
  return (
    <Callout
      title="Atenção"
      className="border-ochre bg-ochre-light"
      titleClassName="text-ochre"
    >
      {children}
    </Callout>
  );
}

export function Curiosidade({ children }: CalloutProps) {
  return (
    <Callout
      title="Curiosidade"
      className="border-teal bg-teal-light"
      titleClassName="text-teal"
    >
      {children}
    </Callout>
  );
}

export function Comparacao({ title = "Comparação", children }: CalloutProps) {
  return (
    <Callout title={title} className="border-line bg-line/30" titleClassName="text-ink">
      {children}
    </Callout>
  );
}

export function ErroComum({ children }: CalloutProps) {
  return (
    <Callout
      title="Erro comum"
      className="border-brick bg-brick-light"
      titleClassName="text-brick"
    >
      {children}
    </Callout>
  );
}

export function Pegadinha({ children }: CalloutProps) {
  return (
    <Callout
      title="Pegadinha de prova"
      className="border-brick bg-brick-light"
      titleClassName="text-brick"
    >
      {children}
    </Callout>
  );
}

export function ExemploIBGE({ children }: CalloutProps) {
  return (
    <Callout
      title="Exemplo aplicado ao IBGE"
      className="border-teal bg-teal-light"
      titleClassName="text-teal"
    >
      {children}
    </Callout>
  );
}
