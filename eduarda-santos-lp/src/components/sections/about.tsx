"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { useFadeInStagger } from "@/lib/motion";
import eduardaPhoto from "@/assets/eduarda.jpg";

// Clientes reais — não inventar/generalizar nomes aqui. Moriah e Chili são
// lojas de roupa, Grupo 3E é gestão de pessoas.
const CLIENTS = ["Moriah", "Grupo 3E", "Chili"];

const clientNameClass =
  "shrink-0 font-sans text-sm font-light tracking-label text-ink/50 uppercase transition-colors hover:text-ink";

function ClientNames() {
  return (
    <>
      {CLIENTS.map((name) => (
        <span key={name} className={clientNameClass}>
          {name}
        </span>
      ))}
    </>
  );
}

export function About() {
  const { container, item, itemTransition } = useFadeInStagger(0.1);

  return (
    <section id="sobre" className="bg-cream">
      <div className="mx-auto max-w-site px-6 py-28 md:px-10 md:py-40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-16"
        >
          {/* Coluna esquerda — foto (5) */}
          <motion.div
            variants={item}
            transition={itemTransition}
            className="md:col-span-5"
          >
            <p className="font-sans text-xs font-light tracking-eyebrow text-ink-muted uppercase">
              Sobre
            </p>

            <div className="mt-8 aspect-3/4 overflow-hidden bg-cream-deep">
              <Image
                src={eduardaPhoto}
                alt="Retrato de Eduarda Santos"
                placeholder="blur"
                sizes="(min-width: 768px) 40vw, 90vw"
                className="h-full w-full object-cover filter-[grayscale(1)_sepia(0.2)_contrast(1.05)]"
              />
            </div>
          </motion.div>

          {/* Coluna direita — texto (7) */}
          <motion.div
            variants={item}
            transition={itemTransition}
            className="md:col-span-7"
          >
            <h2 className="font-display text-xl tracking-tightest text-ink">
              Sou a Eduarda.
            </h2>

            <p className="mt-8 max-w-prose font-sans text-base leading-body font-light text-ink">
              Sou graduanda em Marketing e Comunicação na PUCRS, com foco em
              marcas que comunicam com intenção: que sabem por que dizem o que
              dizem antes de decidir como dizer.
            </p>
            <p className="mt-5 max-w-prose font-sans text-base leading-body font-light text-ink">
              Acredito em estratégia antes de execução. Cada peça nasce de um
              raciocínio claro, unindo criatividade e propósito comercial para
              gerar resultado, não apenas estética.
            </p>

            <div className="mt-10 flex items-center justify-end gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-hairline" />
              <p className="font-accent text-lg text-wine italic">
                criatividade &amp; comunicação
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Prova social — largura total do container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={container}
          className="mt-28 border-y border-hairline py-12"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
            <motion.p
              variants={item}
              transition={itemTransition}
              className="shrink-0 font-sans text-xs font-light tracking-eyebrow text-ink-muted uppercase md:w-56"
            >
              Marcas com quem já trabalhei
            </motion.p>

            <motion.div
              variants={item}
              transition={itemTransition}
              className="flex flex-wrap items-center gap-x-12 gap-y-4"
            >
              <ClientNames />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
