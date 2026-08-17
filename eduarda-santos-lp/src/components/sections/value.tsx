"use client";

import { motion } from "framer-motion";

import { useFadeInStagger } from "@/lib/motion";

const BLOCKS = [
  { word: "Diagnóstico", label: "Antes de qualquer peça" },
  { word: "Consistência", label: "O que constrói memória" },
  { word: "Resultado", label: "O que justifica o investimento" },
];

/**
 * Única seção de fundo vinho cheio além do footer (limite de 2 do
 * CLAUDE.md) — o "momento de peso" da página. Entrada só com fade
 * (+translateY padrão do site); nenhum contador animado.
 */
export function Value() {
  const { container, item, itemTransition } = useFadeInStagger(0.08, 0.05);

  return (
    <section id="valor" className="bg-wine text-cream">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={container}
        className="mx-auto max-w-site px-6 py-28 text-center md:px-10 md:py-40"
      >
        <motion.p
          variants={item}
          transition={itemTransition}
          className="font-sans text-xs font-light tracking-eyebrow text-cream/60 uppercase"
        >
          Entenda o valor
        </motion.p>

        <motion.blockquote
          variants={item}
          transition={itemTransition}
          className="mx-auto mt-8 max-w-[24ch] font-display text-quote leading-[1.15] text-cream"
        >
          Design bonito atrai. Estratégia é o que faz voltar.
        </motion.blockquote>

        <motion.span
          aria-hidden="true"
          variants={item}
          transition={itemTransition}
          className="mx-auto mt-12 block h-px w-12 bg-cream/30"
        />

        <motion.div
          variants={item}
          transition={itemTransition}
          className="mt-16 grid grid-cols-1 divide-y divide-cream/20 md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {BLOCKS.map((block) => (
            <div
              key={block.word}
              className="flex flex-col items-center gap-3 px-8 py-10 first:pt-0 last:pb-0 md:py-0"
            >
              <p className="font-display text-emphasis text-cream">
                {block.word}
              </p>
              <p className="font-sans text-xs font-light tracking-eyebrow text-cream/60 uppercase">
                {block.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
