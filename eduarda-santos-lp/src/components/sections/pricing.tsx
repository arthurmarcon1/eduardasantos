"use client";

import { motion } from "framer-motion";

import { useFadeInStagger } from "@/lib/motion";
import { buttonVariants } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/constants";

const FORMATS = [
  {
    label: "Estratégia",
    line: "Para quem precisa de direção.",
  },
  {
    label: "Acompanhamento",
    line: "Para quem quer construir com consistência.",
  },
  {
    label: "Projeto",
    line: "Para quem tem uma ideia e quer tirá-la do papel.",
  },
];

/**
 * Sem preço, sem tabela comparativa, sem badge de "mais popular": três
 * formatos de trabalho, cada um só com rótulo e uma linha. O valor e o
 * formato certo se definem na conversa, não numa grade de planos — essa
 * seção já foi uma pricing table de SaaS disfarçada e não é o modelo de
 * negócio real (consultoria, não self-serve).
 */
export function Pricing() {
  const { container, item, itemTransition } = useFadeInStagger(0.08);

  return (
    <section id="trabalho">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={container}
        className="mx-auto max-w-site px-6 py-28 md:px-10 md:py-40"
      >
        <motion.h2
          variants={item}
          transition={itemTransition}
          className="font-display text-3xl tracking-tightest text-wine-bright"
        >
          Como podemos trabalhar juntos
        </motion.h2>
        <motion.p
          variants={item}
          transition={itemTransition}
          className="mt-5 max-w-prose font-sans text-md font-light text-ink-muted"
        >
          Você não precisa saber exatamente do que precisa. Me conta sobre sua
          marca, seu momento e onde quer chegar. A partir disso, encontramos o
          formato de trabalho que faz mais sentido para você.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="border-t border-hairline"
      >
        {FORMATS.map((format) => (
          <motion.div
            key={format.label}
            variants={item}
            transition={itemTransition}
            className="border-b border-hairline"
          >
            <div className="mx-auto max-w-site px-6 md:px-10">
              <div className="grid grid-cols-1 gap-x-8 gap-y-3 py-10 md:grid-cols-12">
                <h3 className="font-display text-xl text-wine-bright md:col-span-4">
                  {format.label}
                </h3>
                <p className="max-w-prose font-sans text-base font-light text-ink-muted md:col-span-7 md:col-start-6">
                  {format.line}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={container}
        className="mx-auto max-w-site px-6 py-16 md:px-10"
      >
        <motion.p
          variants={item}
          transition={itemTransition}
          className="max-w-prose font-sans text-base font-light text-ink-muted"
        >
          Cada trabalho é adaptado às necessidades da marca.
        </motion.p>
        <motion.div
          variants={item}
          transition={itemTransition}
          className="mt-8"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chamar Eduarda Santos no WhatsApp (abre em nova aba)"
            className={buttonVariants({ variant: "outline-wine" })}
          >
            Vamos conversar
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
