"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";

import { EASE, useFadeInStagger } from "@/lib/motion";
import { WHATSAPP_URL } from "@/lib/constants";

// motion.create("video") em vez de <motion.video> cru — mesmo padrão do
// MotionImage que existia aqui antes de virar vídeo.
const MotionVideo = motion.create("video");

/**
 * CTA final — sem formulário, contato direto. O selo é o único elemento
 * circular da página inteira (ver /CLAUDE.md § Layout): o lockup animado
 * "EDUARDA SANTOS · MARKETING ESTRATÉGICO" girando ao redor do monograma
 * (ver /public/brand/cta-seal.webm). Fundo vinho sólido (sem alpha, ao
 * contrário do lacre do hero) recortado em círculo via `rounded-full`
 * (112px no mobile, 128px a partir de md) — a própria cor de fundo do
 * vídeo já é o vinho da marca.
 *
 * O crop quadrado do .webm (fonte: "generated_video (2)") foi recentrado
 * medindo os dois pontos "•" do lockup (marcam 9h/3h do círculo do selo,
 * sempre na mesma altura do monograma) — não a partir do centro geométrico
 * do frame original, que ficava ~19px à direita do centro real do selo e
 * deixava o "ES" visivelmente deslocado dentro do círculo.
 */
export function CallToAction() {
  const sealRef = useRef<HTMLVideoElement>(null);
  const { reduceMotion, container, item, itemTransition } = useFadeInStagger(
    0.1,
    0.05,
  );

  // Mesma regra do lacre do hero: sob prefers-reduced-motion, pausa no
  // frame inicial em vez de deixar a rotação em loop.
  useEffect(() => {
    if (reduceMotion) sealRef.current?.pause();
  }, [reduceMotion]);

  // "Carimbada": fade + scale, não o translateY padrão — mas sob
  // prefers-reduced-motion o zoom some e sobra só o fade, mesma regra do
  // resto do site.
  const seal: Variants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.94 },
    visible: { opacity: 1, scale: 1 },
  };
  const sealTransition = { duration: 0.5, ease: EASE };

  return (
    <section id="contato" className="bg-cream">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={container}
        className="mx-auto max-w-site px-6 py-40 text-center md:px-10"
      >
        <MotionVideo
          ref={sealRef}
          variants={seal}
          transition={sealTransition}
          src="/brand/cta-seal.webm"
          poster="/brand/cta-seal-poster.png"
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="mx-auto block h-28 w-28 rounded-full object-cover md:h-32 md:w-32"
        />

        <motion.h2
          variants={item}
          transition={itemTransition}
          className="mx-auto mt-10 max-w-[16ch] font-display text-3xl tracking-tightest text-ink md:mt-12"
        >
          Vamos tirar sua marca do automático?
        </motion.h2>

        <motion.p
          variants={item}
          transition={itemTransition}
          className="mx-auto mt-5 max-w-prose font-sans text-md font-light text-ink-muted"
        >
          Seja um negócio, uma empresa ou você mesmo como profissional,
          podemos encontrar uma forma mais estratégica de comunicar o que
          você faz.
        </motion.p>

        <motion.div
          variants={item}
          transition={itemTransition}
          className="mt-12"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chamar Eduarda Santos no WhatsApp (abre em nova aba)"
            className="inline-block bg-wine px-12 py-5 font-sans text-xs font-light tracking-button-lg text-cream uppercase transition-colors hover:bg-wine-hover"
          >
            Vamos conversar →
          </a>
        </motion.div>

        <motion.div
          variants={item}
          transition={itemTransition}
          className="mt-8"
        >
          <a
            href="mailto:eduardasan2207@gmail.com"
            aria-label="Enviar e-mail para Eduarda Santos"
            className="border-b border-wine pb-1 font-sans text-xs font-light tracking-label text-wine uppercase transition-colors hover:border-wine-hover hover:text-wine-hover"
          >
            eduardasan2207@gmail.com
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
