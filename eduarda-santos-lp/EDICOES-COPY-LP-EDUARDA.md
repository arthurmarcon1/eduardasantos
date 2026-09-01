# Edições de copy — LP Eduarda Santos

Documento de referência para o Claude Code. É uma **troca de conteúdo**, não um redesign.

---

## Regras de execução (leia antes de tocar em qualquer arquivo)

1. **Passo 0 — mapeie antes de editar.** Localize onde vive o texto de cada seção listada abaixo (componentes em `src/components/sections/`, arquivos de dados em `src/lib/`, ou strings inline). Me devolva a lista `seção → arquivo` e **pare**. Só edite depois que eu confirmar.
2. **Não mude o design system.** Nada de novos tokens de cor, novas fontes, novos espaçamentos, novos componentes visuais, novas animações. Radius 0, hairlines, tipografia e paleta (vinho `#3B0F1A` / creme `#F3EFE6` / tinta `#2A1E1B`) permanecem exatamente como estão.
3. **Reuse os componentes existentes.** Se uma seção nova precisa de estrutura, monte com os mesmos primitivos já usados nas outras seções. Não crie card com sombra, não introduza ícone de biblioteca, não use emoji.
4. **O texto dentro dos blocos de código é final.** Copie caractere por caractere, com acentuação, travessões (—) e setas (→) como estão. Não "melhore" o copy, não reescreva, não adicione headline própria.
5. **Duas mudanças são estruturais** (§4 e §5). O resto é substituição de texto.
6. **Ao final:** rode `pnpm build` e `pnpm lint`, corrija o que aparecer, e tire screenshot de cada seção alterada em 1440px e 375px.
7. Se alguma string deste documento **não existir** na página atual ou você não achar onde ela entra, pergunte. Não invente lugar para ela.

---

## Mapa das mudanças

| # | Seção | Ação |
|---|---|---|
| 1 | Sobre | Substituir texto |
| 2 | Serviços | Substituir texto dos 4 itens |
| 3 | Entenda o Valor | Substituir headline + 3 pontos |
| 4 | Investimento → *Como podemos trabalhar juntos* | **Estrutural**: remover preços, virar 3 formatos |
| 5 | *O que sua marca precisa agora?* | **Estrutural**: seção nova |
| 6 | Dúvidas | Substituir por 5 perguntas (apagar as demais) |
| 7 | Contato | Substituir headline + parágrafo |
| 8 | Nav / âncoras / metadata | Ajustar rótulos |

Seções **não citadas aqui ficam intocadas**: Hero, Prova Social, Trabalhos, header e footer.

---

## 1 — Sobre

Substitua o corpo de texto da seção por, mantendo a quebra em parágrafos exatamente como abaixo:

```
Estudo Marketing e Comunicação na PUCRS e trabalho com marketing estratégico para marcas, negócios e profissionais que querem construir uma presença mais forte no digital.

Sempre gostei de transformar ideias em algo que pudesse ser visto, entendido e lembrado. Foi no marketing que encontrei uma forma de unir essa criatividade com estratégia e propósito.

Gosto de entender o que existe por trás de cada marca: o negócio, público e o que ela quer comunicar. A partir disso, transformo ideias em estratégias, conteúdos e campanhas que fazem sentido para cada realidade.

Antes de pensar no que postar, eu penso no porquê.

Porque acredito que uma boa comunicação não precisa ser complicada. Ela precisa ser clara, ter propósito e fazer sentido para quem está do outro lado.
```

Detalhe: a linha "Antes de pensar no que postar, eu penso no porquê." deve receber o mesmo destaque tipográfico que a seção já usa para frases de respiro (Cormorant itálico ou equivalente já existente). Não crie um estilo novo para ela.

---

## 2 — Serviços

Quatro itens, na ordem. Cada um tem: número, título, frase de abertura curta, descrição. Mantenha a estrutura visual atual da seção — só troque o conteúdo.

```
01 — Estratégia
Antes de criar, eu entendo.
Analiso o negócio, o público e os objetivos para definir um caminho claro para a comunicação da marca.

02 — Redes sociais
Presença também precisa de planejamento.
Planejo e organizo a comunicação das redes sociais para que a marca esteja presente de forma estratégica, consistente e alinhada aos seus objetivos.

03 — Conteúdo & criatividade
Ideias que fazem sentido para a sua marca.
Crio conteúdos, roteiros e ideias que informam, conectam e ajudam a marca a ser lembrada.

04 — Campanhas & posicionamento
Da ideia à comunicação.
Desenvolvo conceitos e campanhas e ajudo marcas e profissionais a comunicarem melhor quem são, o que fazem e o que os torna diferentes.
```

---

## 3 — Entenda o Valor

Headline em duas linhas, com quebra forçada exatamente onde está marcado:

```
Post bonito chama atenção.
Estratégia traz cliente.
```

Subtítulo:

```
Não é sobre postar mais. É sobre comunicar melhor.
```

Três pontos abaixo, na ordem — rótulo em caixa alta com o tracking largo já usado no projeto, descrição em corpo normal:

```
CLAREZA
Saber o que dizer e para quem.

ESTRATÉGIA
Entender por que cada conteúdo existe.

RESULTADO
Fazer a comunicação trabalhar pelo negócio.
```

---

## 4 — Investimento → "Como podemos trabalhar juntos" (estrutural)

**O que muda:** a seção deixa de mostrar preço. Os três planos com valores saem e entram três *formatos de trabalho*, sem número, sem tabela comparativa, sem destaque de "mais popular".

Remova da seção: valores, faixas de preço, listas de entregáveis com bullet/check, qualquer badge de plano recomendado. Se esses dados estiverem em um arquivo tipado (ex.: `src/lib/pricing.ts`), remova o arquivo e as importações órfãs.

Título e intro:

```
Como podemos trabalhar juntos

Você não precisa saber exatamente do que precisa.
Me conta sobre sua marca, seu momento e onde quer chegar. A partir disso, encontramos o formato de trabalho que faz mais sentido para você.
```

Os três formatos, cada um só com rótulo e uma linha:

```
ESTRATÉGIA
Para quem precisa de direção.

ACOMPANHAMENTO
Para quem quer construir com consistência.

PROJETO
Para quem tem uma ideia e quer tirá-la do papel.
```

Fechamento + CTA:

```
Cada trabalho é adaptado às necessidades da marca.

[ Vamos conversar ]
```

O CTA usa o mesmo componente de botão/link já existente nas outras seções e aponta para o mesmo destino (WhatsApp) usado no CTA final.

---

## 5 — Seção nova: "O que sua marca precisa agora?" (estrutural)

**Posição:** entre a seção 4 (*Como podemos trabalhar juntos*) e *Dúvidas*.

**Formato:** quatro blocos empilhados, separados por hairline de 1px, no mesmo padrão editorial do resto da página. Cada bloco tem: uma fala do cliente entre aspas (tratada como citação, tipografia de destaque), duas linhas de resposta, e um encaminhamento com seta. Sem card, sem borda em volta, sem ícone.

Título e intro:

```
O que sua marca precisa agora?

Talvez você já saiba que alguma coisa precisa mudar, mas ainda não saiba exatamente o quê. Tudo bem. A gente pode descobrir juntos.
```

Os quatro blocos, na ordem:

```
“Não sei o que postar.”
Talvez você não precise de mais ideias soltas.
Precisa de uma estratégia para entender o que comunicar, para quem e por quê.
→ Estratégia & Conteúdo

“Minha marca não mostra o que eu quero.”
Você conhece o valor do seu trabalho, mas sente que isso não aparece na sua comunicação.
→ Posicionamento

“Quero começar a aparecer mais.”
Você tem um negócio ou é um profissional que quer construir uma presença digital mais forte, mas não sabe por onde começar.
→ Redes Sociais & Marca Pessoal

“Tenho uma ideia, mas não sei como tirar do papel.”
Uma campanha, um lançamento ou uma ação especial. Você tem a ideia, mas precisa transformá-la em algo que as pessoas entendam e que faça sentido para a sua marca.
→ Campanhas & Criatividade
```

Fechamento da seção:

```
Se você se identificou com alguma dessas situações, talvez seja hora de conversar.
Você não precisa chegar sabendo exatamente do que precisa. Eu te ajudo a encontrar o melhor caminho.

[ Vamos conversar → ]
```

Observações:
- Use aspas curvas (“ ”) como estão no texto, não aspas retas.
- A linha `→ Nome` é texto, não link — a menos que já exista âncora para a seção de Serviços; nesse caso pode linkar para lá.
- Em 375px os blocos empilham; a citação não pode quebrar em fonte menor que o resto da página.

---

## 6 — Dúvidas

Substitua **todas** as perguntas atuais por estas cinco, nesta ordem. Apague as que sobrarem — a lista final tem exatamente 5 itens.

Título e intro:

```
Ficou com alguma dúvida?
Talvez a sua dúvida já esteja respondida aqui.
```

```
Com quem você trabalha?
Trabalho com marcas, negócios e profissionais que querem construir uma presença mais estratégica no digital. Isso inclui empresas, marcas pessoais e profissionais como dentistas, médicos, especialistas, clínicas e consultórios.

Você atende à distância?
Sim. Posso atender projetos de qualquer lugar, com reuniões e acompanhamento realizados online.

Você também cria os conteúdos?
Sim. Dependendo do projeto, meu trabalho pode envolver planejamento, criação de conteúdos, roteiros, direção criativa, campanhas e gestão das redes sociais.

Eu preciso saber exatamente o que quero contratar?
Não. Você me conta sobre a sua marca, o momento em que está e onde quer chegar. A partir disso, podemos entender juntos qual formato de trabalho faz mais sentido.

Como funciona o primeiro contato?
Começamos com uma conversa para entender melhor seu negócio, seus objetivos e suas necessidades. Depois disso, preparo uma proposta pensada para o seu momento.
```

Se houver alguma pergunta atual sobre **preço, prazo ou contrato mínimo**, ela sai junto com as outras — a nova lista é a definitiva.

---

## 7 — Contato (CTA final)

```
Vamos tirar sua marca do automático?

Seja um negócio, uma empresa ou você mesmo como profissional, podemos encontrar uma forma mais estratégica de comunicar o que você faz.

[ Vamos conversar → ]
```

O lacre/monograma e o rodapé continuam como estão.

---

## 8 — Nav, âncoras e metadata

- Onde o menu, âncora ou `id` disser **"Investimento"**, troque para **"Trabalho"** (`#trabalho`) ou o rótulo curto que você achar mais coerente com a nav atual — mas use o mesmo termo em todos os lugares (nav, `id` da section, `href` dos CTAs, sumário se houver).
- A seção nova de §5 precisa de `id` próprio (`#duvidas-marca` ou similar) só se entrar na nav. Se a nav já está cheia, não adicione item — só a `section` com `id` para link direto.
- Confira se nenhum CTA ficou apontando para uma âncora que deixou de existir.
- Revise `metadata` em `layout.tsx`/`page.tsx`: se a description mencionar planos ou valores, atualize para refletir o novo posicionamento (formatos adaptados, sem preço fixo).

---

## Checklist final

- [ ] Nenhum valor em R$ sobrou na página
- [ ] Arquivo de pricing e imports órfãos removidos
- [ ] FAQ com exatamente 5 itens
- [ ] Seção nova entre "Como podemos trabalhar juntos" e "Dúvidas"
- [ ] Todos os CTAs apontam para o mesmo destino
- [ ] Sem âncora quebrada
- [ ] `pnpm build` e `pnpm lint` limpos
- [ ] Screenshots 1440px e 375px das seções alteradas
