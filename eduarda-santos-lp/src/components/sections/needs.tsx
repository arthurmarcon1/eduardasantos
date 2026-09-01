"use client";

import { motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { useFadeInStagger } from "@/lib/motion";
import { WHATSAPP_URL } from "@/lib/constants";

const NEEDS = [
  {
    quote: "“Não sei o que postar.”",
    lines: [
      "Talvez você não precise de mais ideias soltas.",
      "Precisa de uma estratégia para entender o que comunicar, para quem e por quê.",
    ],
    tag: "Estratégia & Conteúdo",
  },
  {
    quote: "“Minha marca não mostra o que eu quero.”",
    lines: [
      "Você conhece o valor do seu trabalho, mas sente que isso não aparece na sua comunicação.",
    ],
    tag: "Posicionamento",
  },
  {
    quote: "“Quero começar a aparecer mais.”",
    lines: [
      "Você tem um negócio ou é um profissional que quer construir uma presença digital mais forte, mas não sabe por onde começar.",
    ],
    tag: "Redes Sociais & Marca Pessoal",
  },
  {
    quote: "“Tenho uma ideia, mas não sei como tirar do papel.”",
    lines: [
      "Uma campanha, um lançamento ou uma ação especial. Você tem a ideia, mas precisa transformá-la em algo que as pessoas entendam e que faça sentido para a sua marca.",
    ],
    tag: "Campanhas & Criatividade",
  },
];

/**
 * Blocos empilhados, mesmo padrão editorial de Serviços/Investimento (fala
 * do cliente + resposta em duas colunas, sem card, sem ícone). O
 * encaminhamento "→ Nome" linka para #servicos, a única âncora que já
 * existe para o assunto.
 */
export function Needs() {
  const { container, item, itemTransition } = useFadeInStagger(0.08);

  return (
    <section id="duvidas-marca" className="bg-cream">
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
          className="font-display text-3xl tracking-tightest text-ink"
        >
          O que sua marca precisa agora?
        </motion.h2>
        <motion.p
          variants={item}
          transition={itemTransition}
          className="mt-5 max-w-prose font-sans text-md font-light text-ink-muted"
        >
          Talvez você já saiba que alguma coisa precisa mudar, mas ainda não
          saiba exatamente o quê. Tudo bem. A gente pode descobrir juntos.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="border-t border-hairline"
      >
        {NEEDS.map((need) => (
          <motion.div
            key={need.tag}
            variants={item}
            transition={itemTransition}
            className="border-b border-hairline"
          >
            <div className="mx-auto max-w-site px-6 md:px-10">
              <div className="grid grid-cols-1 gap-x-8 gap-y-4 py-12 md:grid-cols-12 md:py-16">
                <p className="max-w-[20ch] font-accent text-lg text-wine italic md:col-span-4">
                  {need.quote}
                </p>

                <div className="md:col-span-7 md:col-start-6">
                  {need.lines.map((line) => (
                    <p
                      key={line}
                      className="max-w-prose font-sans text-base leading-body font-light text-ink"
                    >
                      {line}
                    </p>
                  ))}

                  <a
                    href="#servicos"
                    className="mt-5 inline-block border-b border-wine pb-1 font-sans text-xs font-light tracking-label text-wine uppercase transition-colors hover:border-wine-hover hover:text-wine-hover"
                  >
                    → {need.tag}
                  </a>
                </div>
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
        className="mx-auto max-w-site px-6 py-16 text-center md:px-10"
      >
        <motion.p
          variants={item}
          transition={itemTransition}
          className="mx-auto max-w-prose font-sans text-base font-light text-ink"
        >
          Se você se identificou com alguma dessas situações, talvez seja
          hora de conversar.
        </motion.p>
        <motion.p
          variants={item}
          transition={itemTransition}
          className="mx-auto mt-2 max-w-prose font-sans text-base font-light text-ink-muted"
        >
          Você não precisa chegar sabendo exatamente do que precisa. Eu te
          ajudo a encontrar o melhor caminho.
        </motion.p>

        <motion.div variants={item} transition={itemTransition} className="mt-10">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chamar Eduarda Santos no WhatsApp (abre em nova aba)"
            className={buttonVariants({ size: "lg" })}
          >
            Vamos conversar →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
