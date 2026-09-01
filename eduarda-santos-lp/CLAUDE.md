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
| `cream`      | `#F3EFE6`            | Base do véu do papel, texto sobre vinho      |
| `cream-deep` | `#E8E2D6`            | Superfície sutil (nunca cartão com sombra)   |
| `paper`      | `#E9E3DA`            | Equivalente chapado do papel (ver Fundo)     |
| `ink`        | `#2A1E1B`            | Texto corrido                                |
| `ink-muted`  | `rgba(42,30,27,.62)` | Texto secundário, legendas                   |
| `hairline`   | `rgba(42,30,27,.14)` | Fios/separadores/bordas de 1px               |

**Regra de composição:** no máximo **2 seções** da página usam fundo vinho
cheio (`bg-wine`). O vinho é pontuação, não base — a base é sempre o papel.

### Fundo

A base da página é uma **textura de papel**, não uma cor chapada:
`/public/brand/paper-texture.webp` sob um véu de `cream` a 70%
(`--paper-veil`). Ela é pintada **uma vez só**, por uma camada fixa do
tamanho da viewport (`body::before` em [globals.css](src/app/globals.css)),
com `cover`/`center`/`no-repeat` — nunca deforma, nunca repete e não muda
de escala conforme a página cresce.

O véu não é decoração: a textura crua tem média `#D3C8BF` e derruba o
`--ink-muted` para 4.08:1, abaixo do mínimo AA. Com o véu a base vira
`#E9E3DA` e o contraste volta a 4.59:1. **Não reduzir os 70% abaixo de 60%
sem refazer essa conta.**

Consequência prática para seções novas: **não pôr fundo claro opaco em
nada**, senão a textura some por baixo. Uma seção normal não declara fundo.
Fundo opaco só onde ele é funcional:

- `bg-wine` — as duas seções invertidas.
- `bg-paper` — superfícies opacas presas à viewport que não a cobrem
  inteira (header scrollado, link "pular para o conteúdo"): a textura ali
  cairia num recorte desalinhado, e chapado é indistinguível a olho.
- `paper-texture` — superfícies opacas que cobrem a viewport **inteira**
  (menu full-screen do mobile): como a caixa é a viewport, o recorte bate
  com o da camada de fundo e a superfície fica contínua com a página.

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
