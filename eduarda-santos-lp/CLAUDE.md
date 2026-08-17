@AGENTS.md

# Eduarda Santos — Design System

Landing page single-page (`/`) para Eduarda Santos — Marketing Estratégico.
Assinatura: **"criatividade & comunicação"**. Graduanda em Marketing e
Comunicação na PUCRS.

Este documento é a fonte de verdade do sistema visual. Os tokens que ele
descreve estão implementados em [src/app/globals.css](src/app/globals.css).
Qualquer seção nova deve ser construída **só** com os tokens daqui —
nenhuma cor, raio ou tamanho de fonte novo sem atualizar este arquivo primeiro.

## Direção estética

A página deve parecer um **dossiê impresso de estúdio de branding** — não
uma landing page de SaaS. Identidade: elegante, editorial, artesanal.
Referências: lacre de cera e monograma manuscrito.

**Proibido:**

- Travessões entre textos.
- Cards com sombra.
- Glassmorphism.
- Gradientes coloridos.
- Blobs.
- Emojis.
- Ícones genéricos em destaque.
- Grid de 3 cards iguais (ícone + título + parágrafo).

**Desejado:**

- Fios de 1px (`border-hairline`).
- Muito espaço em branco.
- Tipografia grande e respirada.
- Assimetria editorial (evitar grids perfeitamente simétricos).

## Cores

Paleta fechada — não inventar accent novo. Implementada em `:root` de
[globals.css](src/app/globals.css) e exposta como utilitários Tailwind
(`bg-wine`, `text-ink-muted`, `border-hairline`, etc).

| Token        | Valor                | Uso                                          |
| ------------ | -------------------- | -------------------------------------------- |
| `wine`       | `#3B0F1A`            | Títulos de destaque, fios, seções invertidas |
| `wine-hover` | `#55202D`            | Estado hover de elementos em `wine`          |
| `cream`      | `#F3EFE6`            | Fundo padrão da página                       |
| `cream-deep` | `#E8E2D6`            | Superfície sutil (nunca cartão com sombra)   |
| `ink`        | `#2A1E1B`            | Texto corrido                                |
| `ink-muted`  | `rgba(42,30,27,.62)` | Texto secundário, legendas                   |
| `hairline`   | `rgba(42,30,27,.14)` | Fios/separadores/bordas de 1px               |

**Regra de composição:** no máximo **2 seções** da página usam fundo vinho
cheio (`bg-wine`). O vinho é pontuação, não base — a base é sempre `cream`.

Não existe cor de erro/destrutiva própria: o token semântico `destructive`
do shadcn/ui foi remapeado para `wine` em vez de inventar um vermelho novo.
Se um formulário precisar diferenciar erro de ação primária, resolva por
texto/ícone, não por uma cor nova.

**Sem dark mode.** A marca é fixa (papel + cera), não thematizável — o
`.dark` do shadcn/ui foi removido de propósito.

## Tipografia

Três fontes via `next/font/google`, carregadas em
[layout.tsx](src/app/layout.tsx):

| Papel   | Fonte              | Classe Tailwind | Uso                                                                                     |
| ------- | ------------------ | --------------- | --------------------------------------------------------------------------------------- |
| Display | Bodoni Moda        | `font-display`  | h1/h2. Peso 400–500. `tracking-tightest` (-0.02em) nos tamanhos grandes (`text-2xl` +). |
| Utility | Montserrat         | `font-sans`     | Corpo, labels, botões. Peso 300/400. Fonte padrão do `<html>`.                          |
| Accent  | Cormorant Garamond | `font-accent`   | Só frases curtas e citações, sempre `italic`. Nunca parágrafo longo.                    |

**Labels / eyebrows / botões:** `font-sans font-light uppercase`, sempre
com tracking largo — essa é **a assinatura tipográfica da marca**:

- `tracking-label` (0.18em) — botões e labels maiores (~13px).
- `tracking-eyebrow` (0.28em) — eyebrows/labels menores (~11–12px).
- `tracking-nav` (0.2em) — links do menu desktop do header.
- `tracking-button-lg` (0.24em) — o CTA grande (ex: "Chamar no WhatsApp").

**Abaixo de 640px, todo tracking largo reduz para 0.16em** — regra global
em `globals.css` (fora de `@layer`, mira as classes geradas direto, já que
`@theme inline` inlina o valor e uma var em `:root` não seria lida em
runtime). Tracking largo demais quebra a leitura em telas pequenas; não
precisa fazer nada por seção nova, a redução já é automática em qualquer
elemento que use um destes quatro tokens.

**Corpo de texto:** `font-sans font-light leading-body` (line-height 1.7),
`max-w-prose` (62ch).

### Escala

Definida em `@theme inline` de globals.css. Os dois maiores são fluidos
(`clamp()`, interpolados entre viewport 400px e 1440px) para não quebrar em
mobile.

| Classe      | Tamanho             | Uso típico                |
| ----------- | ------------------- | ------------------------- |
| `text-xs`   | 12px                | Eyebrow/label menor       |
| `text-sm`   | 14px                | Label, legenda            |
| `text-base` | 16px                | Corpo de texto            |
| `text-md`   | 18px                | Corpo destacado           |
| `text-lg`   | 24px                | Subtítulo                 |
| `text-xl`   | 32px                | h3 / display pequeno      |
| `text-2xl`  | 48px                | h2                        |
| `text-3xl`  | 44px → 72px fluido  | h1 secundário / h2 grande |
| `text-4xl`  | 56px → 104px fluido | h1 principal do hero      |

Fora da progressão xs..4xl, dois tamanhos semânticos de uso único (cada um
aparece em uma única seção da página — não reaproveitar em outro lugar sem
primeiro avaliar se não é caso de usar a escala normal):

| Classe          | Tamanho            | Uso único                                 |
| --------------- | ------------------ | ----------------------------------------- |
| `text-quote`    | 32px → 56px fluido | Citação de destaque em "Entenda o valor"  |
| `text-emphasis` | 40px               | Palavra dos 3 blocos em "Entenda o valor" |

## Layout

- `border-radius: 0` em **tudo** (`--radius: 0`). Única exceção: o
  selo/lacre circular, que usa `rounded-full` diretamente (não depende do
  token de raio).
- Container: `max-w-site` (1180px), `px-6 md:px-10`.
- Ritmo vertical entre seções: `py-28 md:py-40`.
- Separador entre seções: `border-t border-hairline` na largura do
  container. Nunca decorativo (sem ícone, sem gradiente na borda).

## Movimento

Especificação para Framer Motion (variants ficam no componente, não em
CSS-in-JS):

- Fade + `translateY(12px)` → posição final.
- Duração 0.6s (`--duration-enter` em globals.css).
- Easing `[0.16, 1, 0.3, 1]` (`--ease-editorial` em globals.css).
- Stagger de 0.08s entre itens de um grupo.
- `viewport={{ once: true }}` — anima uma vez só.
- Sob `prefers-reduced-motion`, tudo desliga (usar `useReducedMotion()` do
  Framer Motion e pular direto para o estado final).
- Hovers/transições de UI (não entrada de conteúdo) usam `--duration-hover`
  (0.3s) com o mesmo easing — já é o padrão de qualquer `transition-*` do
  Tailwind via `--default-transition-duration`/`--default-transition-timing-function`.

**Proibido:** parallax, contador animado, texto que digita sozinho.

## Elemento assinatura

O traço caligráfico do S do monograma. Usar em **no máximo 2 lugares** na
página inteira:

1. Grande e translúcido atrás do hero — opacidade ~0.08
   (`text-wine-a08` / `fill-wine-a08`, token já pronto em globals.css).
2. Sublinhado desenhado (`stroke-dashoffset` animado) em uma única palavra
   do h1.

Não é um motivo decorativo de fundo recorrente — se não for um desses dois
usos, não é o monograma.

## Estrutura de componentes

- `src/components/sections/` — uma seção da landing por arquivo,
  compostas em `src/app/page.tsx`. Ainda vazio.
- `src/components/ui/` — primitivos shadcn/ui, já adaptados à marca (ver
  `button.tsx`: sem raio, uppercase, tracking largo — não reintroduzir
  variantes tipo SaaS como `rounded-lg` ou botões ícone-only).
- `src/lib/` — utilidades (`cn()`, e o que mais surgir).

Ao adicionar um componente novo do shadcn/ui (`shadcn add ...`), revisar a
classe gerada contra as regras deste documento antes de usar — o CLI traz
o estilo neutro padrão (raio, sombra, cores genéricas), que precisa ser
ajustado à marca.
