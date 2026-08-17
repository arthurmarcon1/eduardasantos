"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

import { EASE, useFadeInStagger } from "@/lib/motion";
import sealStamp from "@/assets/seal-stamp.png";

// next/image + framer-motion: anima um <Image> otimizado (AVIF/WebP,
// dimensionado) em vez de <motion.img> com <img> cru.
const MotionImage = motion.create(Image);

// TODO: substituir pelo número real de WhatsApp da Eduarda antes de publicar.
const WHATSAPP_URL =
  "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20vim%20do%20site%20e%20quero%20conversar%20sobre%20minha%20marca.";

/**
 * CTA final — sem formulário, contato direto. O lacre é o único elemento
 * circular da página inteira (ver /CLAUDE.md § Layout), reaproveitado do
 * mesmo asset do hero (/public/brand/seal-poster.png), recortado bem perto
 * da borda de cera para caber limpo em 96px.
 */
export function CallToAction() {
  const { reduceMotion, container, item, itemTransition } = useFadeInStagger(
    0.1,
    0.05,
  );

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
        <MotionImage
          variants={seal}
          transition={sealTransition}
          src={sealStamp}
          alt=""
          aria-hidden="true"
          className="mx-auto h-24 w-24 rounded-full"
        />

        <motion.h2
          variants={item}
          transition={itemTransition}
          className="mx-auto mt-10 max-w-[16ch] font-display text-3xl tracking-tightest text-ink"
        >
          Vamos conversar sobre a sua marca.
        </motion.h2>

        <motion.p
          variants={item}
          transition={itemTransition}
          className="mx-auto mt-5 max-w-prose font-sans text-md font-light text-ink-muted"
        >
          Me conta em que ponto sua comunicação está. Respondo pessoalmente.
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
            Chamar no WhatsApp
          </a>
        </motion.div>

        <motion.div
          variants={item}
          transition={itemTransition}
          className="mt-8"
        >
          <a
            href="mailto:contato@eduardasantos.com.br"
            aria-label="Enviar e-mail para Eduarda Santos"
            className="border-b border-wine pb-1 font-sans text-xs font-light tracking-label text-wine uppercase transition-colors hover:border-wine-hover hover:text-wine-hover"
          >
            contato@eduardasantos.com.br
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
