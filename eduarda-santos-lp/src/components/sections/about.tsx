"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { useFadeInStagger } from "@/lib/motion";
import eduardaPhoto from "@/assets/eduarda.jpg";

// Clientes reais — não inventar/generalizar nomes aqui. Moriah e Chili são
// lojas de roupa, Grupo 3E é gestão de pessoas.
const CLIENTS = ["Moriah", "Grupo 3E", "Chili"];

const clientNameClass =
  "shrink-0 font-sans text-sm font-light tracking-label text-ink uppercase transition-colors hover:text-wine";

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

            {/* O retrato entra dessaturado (papel de dossiê) e ganha cor no
                hover. A lista de filtros do estado final repete as mesmas
                funções da inicial com valores neutros, em vez de `filter-none`:
                interpolar entre duas listas iguais garante a transição suave em
                todos os navegadores. `hover:` do Tailwind v4 já só vale onde o
                ponteiro suporta hover, então no toque a foto fica no estado
                dessaturado, sem meio-termo travado. */}
            <div className="group mt-8 aspect-3/4 overflow-hidden bg-cream-deep">
              <Image
                src={eduardaPhoto}
                alt="Retrato de Eduarda Santos"
                placeholder="blur"
                sizes="(min-width: 768px) 40vw, 90vw"
                className="h-full w-full object-cover filter-[grayscale(1)_sepia(0.2)_contrast(1.05)] transition-[filter] group-hover:filter-[grayscale(0)_sepia(0)_contrast(1)]"
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
              Sou estudante de Marketing e Comunicação na PUCRS e trabalho com
              marketing estratégico. Atendo marcas e também profissionais que
              são o próprio negócio: dentistas, médicos, clínicas e
              consultórios.
            </p>
            <p className="mt-5 max-w-prose font-sans text-base leading-body font-light text-ink">
              Antes de pensar no post, eu entendo o seu negócio e quem você quer
              atender. Só depois a comunicação começa. Com criatividade, sim,
              mas sempre mirando resultado.
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
              Quem já confiou no meu trabalho
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
