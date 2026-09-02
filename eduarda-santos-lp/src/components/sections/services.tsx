"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { AlphaMatteVideo } from "@/components/alpha-matte-video";
import { useFadeInStagger } from "@/lib/motion";

const SERVICES = [
  {
    number: "01",
    title: "Estratégia",
    opener: "Antes de criar, eu entendo.",
    description:
      "Analiso o negócio, o público e os objetivos para definir um caminho claro para a comunicação da marca.",
  },
  {
    number: "02",
    title: "Redes sociais",
    opener: "Presença também precisa de planejamento.",
    description:
      "Planejo e organizo a comunicação das redes sociais para que a marca esteja presente de forma estratégica, consistente e alinhada aos seus objetivos.",
  },
  {
    number: "03",
    title: "Conteúdo & criatividade",
    opener: "Ideias que fazem sentido para a sua marca.",
    description:
      "Crio conteúdos, roteiros e ideias que informam, conectam e ajudam a marca a ser lembrada.",
  },
  {
    number: "04",
    title: "Campanhas & posicionamento",
    opener: "Da ideia à comunicação.",
    description:
      "Desenvolvo conceitos e campanhas e ajudo marcas e profissionais a comunicarem melhor quem são, o que fazem e o que os torna diferentes.",
  },
];

/**
 * Lista editorial, não grid de cards (proibido pelo CLAUDE.md). A ordem
 * 01→04 é sequencial de verdade: reflete a ordem lógica do trabalho.
 *
 * O cabeçalho é assimétrico (texto nas colunas 1–6, chapa nas 8–12, com a
 * coluna 7 vazia como respiro) e alinhado pela base: o título e a chapa
 * terminam na mesma linha.
 *
 * A chapa é o carimbo ES levantando do papel e deixando o relevo seco
 * (ver /public/brand/stamp.webm) — o argumento da seção em imagem: o
 * trabalho é o que fica marcado depois. Terceiro e último objeto da
 * identidade a aparecer na página, depois do lacre de cera do hero e do
 * selo giratório do CTA; são três peças distintas do mesmo sistema, não
 * três repetições do monograma.
 */
export function Services() {
  const [stampPlaying, setStampPlaying] = useState(false);
  const { reduceMotion, container, item, itemTransition } =
    useFadeInStagger(0.08);

  // Diferente dos outros dois vídeos da página, este não é loop: é um gesto
  // com começo e fim, que precisa acontecer *enquanto* a pessoa olha. Por
  // isso não toca no load (fora da tela o relevo já estaria pronto quando a
  // seção chegasse) e sim no primeiro cruzamento do viewport. Sob
  // prefers-reduced-motion nada toca e fica o still do relevo.
  //
  // Sobre o ritmo do clipe: no arquivo original o gesto inteiro dura só
  // 0,45s (o resto são quadros congelados), e passava despercebido. O clipe
  // publicado recorta a janela útil da fonte (1,0s a 2,75s) e a estica 2,2x,
  // ficando ~1,7s de carimbo pousado, ~0,9s de descolamento e ~1,1s só de
  // relevo. Como 2,2x deixaria a fonte de 24fps em ~11fps reais no trecho de
  // movimento, os quadros intermediários são sintetizados (minterpolate,
  // saída a 30fps) — com search_param alto, senão a estimativa de movimento
  // erra o vetor do troquel e rasga a geometria dele em pleno voo.

  return (
    <section id="servicos">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={container}
        className="mx-auto grid max-w-site grid-cols-12 items-end gap-y-14 px-6 py-28 md:gap-x-8 md:px-10 md:py-40"
      >
        <div className="col-span-12 md:col-span-6">
          <motion.p
            variants={item}
            transition={itemTransition}
            className="font-sans text-xs font-light tracking-eyebrow text-ink-muted uppercase"
          >
            Serviços
          </motion.p>
          <motion.h2
            variants={item}
            transition={itemTransition}
            className="mt-4 max-w-2xl font-display text-3xl tracking-tightest text-wine-bright"
          >
            O que eu faço na prática
          </motion.h2>
          <motion.p
            variants={item}
            transition={itemTransition}
            className="mt-5 max-w-prose font-sans text-md font-light text-ink-muted"
          >
            Para marcas e para profissionais que são o próprio negócio.
          </motion.p>
        </div>

        {/* A chapa não é mais um retângulo de papel com fio em volta: o
            clipe agora tem alfa real, e o troquel e o relevo pousam direto
            na textura da página (ver /src/components/alpha-matte-video.tsx
            para o formato — matte empacotado, um H.264 com o dobro da
            altura, cor em cima e máscara embaixo).

            A transparência não veio de recorte: aqui o "fundo" é o próprio
            papel em que o relevo é gravado, então cortá-lo apagaria o
            relevo. O alfa é um matte por diferença contra uma chapa de
            iluminação estimada quadro a quadro — sobra só o que se afasta
            do papel liso (o troquel, a sombra, o relevo), e o gradiente de
            luz que o vídeo trazia embutido sai junto. Por isso o tom nunca
            briga com o --paper do site.

            Uma ressalva de enquadramento: o troquel e a sombra dele encostam
            nas quatro bordas do quadro, então durante os ~2,6s de descolagem
            a sombra termina na borda do vídeo. Em repouso — que é o estado
            que fica na tela — o relevo flutua sem nenhuma borda. */}
        <motion.div
          variants={item}
          transition={itemTransition}
          onViewportEnter={() => setStampPlaying(true)}
          viewport={{ once: true, amount: 0.6 }}
          aria-hidden="true"
          className="col-span-12 md:col-span-5 md:col-start-8"
        >
          {/* Sob prefers-reduced-motion o vídeo nem chega a ser montado: fica
              o relevo seco parado, que é o fim do gesto e o único quadro sem
              a sombra cortada pela borda. Também poupa o download do clipe
              para quem pediu para não ter movimento. */}
          {reduceMotion ? (
            <Image
              src="/brand/stamp-still.webp"
              alt=""
              width={608}
              height={464}
              className="block h-auto w-full"
            />
          ) : (
            <AlphaMatteVideo
              src="/brand/stamp.mp4"
              poster="/brand/stamp-poster.webp"
              width={608}
              height={464}
              loop={false}
              playing={stampPlaying}
            />
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="border-t border-hairline"
      >
        {SERVICES.map((service) => (
          <motion.div
            key={service.number}
            variants={item}
            transition={itemTransition}
            className="group cursor-default border-b border-hairline transition-colors duration-400 hover:bg-wine"
          >
            <div className="mx-auto max-w-site px-6 md:px-10">
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3 py-10 md:grid-cols-12 md:gap-x-8">
                <span className="font-display text-lg text-ink-muted transition-colors duration-400 group-hover:text-cream md:col-span-1">
                  {service.number}
                </span>
                <h3 className="font-display text-xl text-wine-bright transition-colors duration-400 group-hover:text-cream md:col-span-4">
                  {service.title}
                </h3>
                <div className="col-span-2 md:col-span-7 md:col-start-6">
                  <p className="font-accent text-md text-wine-bright italic transition-colors duration-400 group-hover:text-cream">
                    {service.opener}
                  </p>
                  <p className="mt-3 max-w-md font-sans text-base font-light text-ink-muted transition-colors duration-400 group-hover:text-cream">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
