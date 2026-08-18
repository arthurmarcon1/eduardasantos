"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { useFadeInStagger } from "@/lib/motion";

/**
 * Tese da página: "estratégia com acabamento artesanal" em 3 segundos.
 * Ver /CLAUDE.md — "Elemento assinatura" (monograma translúcido + sublinhado).
 */
export function Hero() {
  const sealRef = useRef<HTMLVideoElement>(null);
  const { reduceMotion, container, item, itemTransition } = useFadeInStagger(
    0.08,
    0.1,
  );

  // Sob prefers-reduced-motion, pausa o lacre no frame inicial em vez de
  // deixá-lo girando em loop — `autoplay` do <video> não reage a mudanças
  // de prop após já ter iniciado, então paramos via ref.
  useEffect(() => {
    if (reduceMotion) sealRef.current?.pause();
  }, [reduceMotion]);

  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <div className="relative mx-auto grid max-w-site grid-cols-12 items-center gap-y-16 px-6 py-32 md:min-h-[90vh] md:gap-y-0 md:px-10 md:py-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="relative z-10 col-span-12 md:col-span-7"
        >
          <motion.p
            variants={item}
            transition={itemTransition}
            className="font-sans text-xs font-light tracking-eyebrow text-ink-muted uppercase"
          >
            Marketing estratégico
          </motion.p>

          <h1 className="mt-6 font-display text-4xl leading-[1.25] tracking-tightest text-ink">
            <motion.span
              variants={item}
              transition={itemTransition}
              className="block"
            >
              Marca não é o que você diz.
            </motion.span>
            <motion.span
              variants={item}
              transition={itemTransition}
              className="block"
            >
              É o que{" "}
              <span className="relative inline-block text-wine">
                sobra
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 40"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 -bottom-2 h-[0.28em] w-full"
                >
                  <path
                    d="M 2,22 C 40,10 80,28 130,16 C 180,6 220,26 260,14 C 275,10 285,16 296,8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    pathLength={1}
                    className="animate-draw-underline"
                  />
                </svg>
              </span>{" "}
              depois.
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            transition={itemTransition}
            className="mt-8 max-w-prose font-sans text-md font-light text-ink-muted"
          >
            Estratégia, conteúdo e comunicação para marcas que querem ser
            lembradas, não apenas vistas.
          </motion.p>

          <motion.div
            variants={item}
            transition={itemTransition}
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            <a
              href="#contato"
              className={buttonVariants({ variant: "default" })}
            >
              Vamos conversar
            </a>
            <a
              href="#servicos"
              className="border-b border-wine pb-1 font-sans text-xs font-light tracking-label text-wine uppercase transition-colors hover:border-wine-hover hover:text-wine-hover"
            >
              Ver como trabalho
            </a>
          </motion.div>
        </motion.div>

        <div
          aria-hidden="true"
          className="relative col-span-12 hidden items-center justify-center self-stretch md:col-span-5 md:flex"
        >
          {/* Lacre de cera em 3D, fundo preto recortado por chroma-key para
              alpha real (ver /public/brand/seal.webm). Sombra tingida de
              vinho, não preta, para ficar coesa com a paleta. */}
          <video
            ref={sealRef}
            className="h-[62%] w-auto drop-shadow-[0_40px_50px_rgba(59,15,26,0.22)]"
            src="/brand/seal.webm"
            poster="/brand/seal-poster.png"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </section>
  );
}
