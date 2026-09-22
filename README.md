# Plataforma ACA IBGE 2026

Plataforma de estudos para o Processo Seletivo Simplificado do IBGE — Edital nº 01/2026, cargo Agente Censitário Administrativo (ACA).

## Como publicar (sem instalar nada no seu computador)

Este projeto builda e publica sozinho no GitHub Pages a cada atualização, usando GitHub Actions.

**Configuração única (só na primeira vez):**

1. Suba todos os arquivos deste projeto para o seu repositório no GitHub (do jeito que você já faz nos outros projetos).
2. No repositório, vá em **Settings → Pages**.
3. Em **Source**, escolha **GitHub Actions** (em vez de "Deploy from a branch").
4. Pronto. A partir daqui, toda vez que você atualizar arquivos no repositório, o site builda e publica sozinho em alguns minutos.

Você pode acompanhar o progresso na aba **Actions** do repositório.

**Importante:** o arquivo `.github/workflows/deploy.yml` já está configurado com `NEXT_PUBLIC_BASE_PATH: /ConcursoIBGE` — só funciona se o repositório no GitHub se chamar exatamente `ConcursoIBGE` (maiúsculas/minúsculas incluídas). Se decidir mudar o nome do repositório depois, essa linha precisa ser atualizada junto.

## Etapa 1 — Fundação do projeto (concluída)

Base de configuração do projeto: Next.js, TypeScript, Tailwind (com tokens de cor claro/escuro), PWA e qualidade de código (ESLint/Prettier).

## Pendências sinalizadas nesta etapa

- **Ícones do PWA**: `public/icons/icon-192.png`, `icon-512.png`, `icon-maskable-192.png`, `icon-maskable-512.png` ainda não existem.
- **Conteúdo**: nenhuma aula, questão ou flashcard foi escrito ainda — toda a infraestrutura para recebê-los já está pronta.

## Estrutura de pastas planejada

```
src/
├── app/                      # rotas (App Router)
├── components/
│   ├── ui/
│   ├── lesson/
│   ├── dashboard/
│   └── quiz/
├── content/                  # aulas em MDX
├── data/
│   ├── questions/
│   └── flashcards/
├── lib/                      # storage, spaced repetition, stats
├── types/
├── config/                   # config do edital (disciplinas, módulos)
└── styles/
```
