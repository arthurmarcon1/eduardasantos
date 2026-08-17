"use client";

import { motion } from "framer-motion";

import { useFadeInStagger } from "@/lib/motion";

const FORMATS = [
  {
    name: "Essencial",
    cadence: "Pontual",
    description:
      "Para quem precisa de clareza antes de qualquer peça: um ponto de partida sólido pra guiar decisões dali pra frente.",
    deliverables: [
      "Diagnóstico de marca e mercado",
      "Posicionamento e proposta de valor",
      "Território de comunicação",
      "Guia de comunicação (tom de voz e diretrizes)",
    ],
  },
  {
    name: "Continuado",
    cadence: "Recorrente",
    description:
      "Para marcas que querem construir consistência mês a mês, sem depender de decisões pontuais.",
    deliverables: [
      "Estratégia de conteúdo mensal",
      "Calendário editorial",
      "Acompanhamento de performance",
      "Ajustes de rota mensais",
      "Suporte direto por mensagem",
    ],
  },
  {
    name: "Projeto",
    cadence: "Escopo fechado",
    description:
      "Para campanhas e lançamentos com data marcada: um conceito central que se desdobra em peças.",
    deliverables: [
      "Conceito criativo central",
      "Desdobramento de peças",
      "Cronograma de lançamento",
      "Acompanhamento da execução",
    ],
  },
];

/**
 * "Investimento" sem valores fixos — o preço se define na conversa (ver
 * subtítulo). Lista editorial em duas zonas por linha (nome/cadência +
 * descrição/entregas), não grid de 3 colunas simétricas: essa seção já foi
 * uma pricing table de SaaS disfarçada e não é o modelo de negócio real
 * (consultoria, não self-serve).
 */
export function Pricing() {
  const { container, item, itemTransition } = useFadeInStagger(0.08);

  return (
    <section id="investimento" className="bg-cream">
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
          Investimento
        </motion.p>
        <motion.h2
          variants={item}
          transition={itemTransition}
          className="mt-4 font-display text-3xl tracking-tightest text-ink"
        >
          Formatos de trabalho
        </motion.h2>
        <motion.p
          variants={item}
          transition={itemTransition}
          className="mt-5 max-w-prose font-sans text-md font-light text-ink-muted"
        >
          Cada marca tem um momento. Escolhemos o formato e o investimento na
          conversa.
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
            key={format.name}
            variants={item}
            transition={itemTransition}
            className="group cursor-default border-b border-hairline transition-colors duration-400 hover:bg-wine"
          >
            <div className="mx-auto max-w-site px-6 md:px-10">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 py-12 md:grid-cols-12 md:py-16">
                <div className="md:col-span-4">
                  <p className="font-sans text-xs font-light tracking-eyebrow text-ink-muted uppercase transition-colors duration-400 group-hover:text-cream/60">
                    {format.cadence}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-ink transition-colors duration-400 group-hover:text-cream">
                    {format.name}
                  </h3>
                </div>

                <div className="md:col-span-8">
                  <p className="max-w-prose font-sans text-base leading-body font-light text-ink transition-colors duration-400 group-hover:text-cream">
                    {format.description}
                  </p>

                  <ul className="mt-6 flex flex-col gap-2">
                    {format.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex gap-3 font-sans text-sm font-light text-ink-muted transition-colors duration-400 group-hover:text-cream/80"
                      >
                        <span
                          aria-hidden="true"
                          className="text-wine transition-colors duration-400 group-hover:text-cream"
                        >
                          —
                        </span>
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <a
                      href="#contato"
                      aria-label={`Conversar sobre o formato ${format.name}`}
                      className="border-b border-wine pb-1 font-sans text-xs font-light tracking-label text-wine uppercase transition-colors duration-400 group-hover:border-cream group-hover:text-cream"
                    >
                      Conversar sobre este formato
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
