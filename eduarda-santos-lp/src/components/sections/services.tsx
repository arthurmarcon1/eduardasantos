"use client";

import { motion } from "framer-motion";

import { useFadeInStagger } from "@/lib/motion";

const SERVICES = [
  {
    number: "01",
    title: "Estratégia de marca",
    description:
      "Posicionamento, público e território de comunicação definidos antes de qualquer post.",
  },
  {
    number: "02",
    title: "Criação de campanha",
    description:
      "Do conceito à peça: ideia central, desdobramentos e calendário.",
  },
  {
    number: "03",
    title: "Conteúdo",
    description:
      "Linha editorial, roteiro e produção para redes que sustentam a marca no tempo.",
  },
  {
    number: "04",
    title: "Comunicação",
    description:
      "Discurso, tom de voz e materiais que fazem a marca soar como ela mesma.",
  },
];

/**
 * Lista editorial, não grid de cards (proibido pelo CLAUDE.md). A ordem
 * 01→04 é sequencial de verdade: reflete a ordem lógica do trabalho.
 */
export function Services() {
  const { container, item, itemTransition } = useFadeInStagger(0.08);

  return (
    <section id="servicos" className="bg-cream">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={container}
        className="mx-auto max-w-site px-6 py-28 md:px-10 md:py-40"
      >
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
          className="mt-4 max-w-2xl font-display text-3xl tracking-tightest text-ink"
        >
          O que eu faço por marcas
        </motion.h2>
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
                <h3 className="font-display text-xl text-ink transition-colors duration-400 group-hover:text-cream md:col-span-4">
                  {service.title}
                </h3>
                <p className="col-span-2 max-w-md font-sans text-base font-light text-ink-muted transition-colors duration-400 group-hover:text-cream md:col-span-7 md:col-start-6">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
