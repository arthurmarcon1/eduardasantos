"use client";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { useFadeInStagger } from "@/lib/motion";
import { WHATSAPP_URL } from "@/lib/constants";

const QUESTIONS = [
  {
    question: "Com quem você trabalha?",
    answer:
      "Trabalho com marcas, negócios e profissionais que querem construir uma presença mais estratégica no digital. Isso inclui empresas, marcas pessoais e profissionais que são o próprio negócio.",
  },
  {
    question: "Você atende à distância?",
    answer:
      "Sim. Posso atender projetos de qualquer lugar, com reuniões e acompanhamento realizados online.",
  },
  {
    question: "Você também cria os conteúdos?",
    answer:
      "Sim. Dependendo do projeto, meu trabalho pode envolver planejamento, criação de conteúdos, roteiros, direção criativa, campanhas e gestão das redes sociais.",
  },
  {
    question: "Eu preciso saber exatamente o que quero contratar?",
    answer:
      "Não. Você me conta sobre a sua marca, o momento em que está e onde quer chegar. A partir disso, podemos entender juntos qual formato de trabalho faz mais sentido.",
  },
  {
    question: "Como funciona o primeiro contato?",
    answer:
      "Começamos com uma conversa para entender melhor seu negócio, seus objetivos e suas necessidades. Depois disso, preparo uma proposta pensada para o seu momento.",
  },
];

export function Faq() {
  const { container, item: fadeItem, itemTransition } = useFadeInStagger(0.08);

  return (
    <section id="duvidas">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        className="mx-auto max-w-site px-6 py-28 md:px-10 md:py-40"
      >
        <motion.p
          variants={fadeItem}
          transition={itemTransition}
          className="font-sans text-xs font-light tracking-eyebrow text-ink-muted uppercase"
        >
          Dúvidas
        </motion.p>
        <motion.h2
          variants={fadeItem}
          transition={itemTransition}
          className="mt-4 font-display text-3xl tracking-tightest text-wine-bright"
        >
          Ficou com alguma dúvida?
        </motion.h2>
        <motion.p
          variants={fadeItem}
          transition={itemTransition}
          className="mt-5 max-w-prose font-sans text-md font-light text-ink-muted"
        >
          Talvez a sua dúvida já esteja respondida aqui.
        </motion.p>

        <Accordion className="mt-16" defaultValue={[QUESTIONS[0].question]}>
          {QUESTIONS.map((entry) => (
            <motion.div
              key={entry.question}
              variants={fadeItem}
              transition={itemTransition}
            >
              <AccordionItem value={entry.question}>
                <AccordionTrigger>{entry.question}</AccordionTrigger>
                <AccordionContent>{entry.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* Segundo convite. O primeiro está na seção logo acima; quem desceu
            até aqui para tirar uma dúvida terminaria a página sem nenhuma
            ação à mão, e o FAQ é a última seção antes do rodapé. */}
        <motion.div
          variants={fadeItem}
          transition={itemTransition}
          className="mt-16"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chamar Eduarda Santos no WhatsApp (abre em nova aba)"
            className={buttonVariants({ variant: "default" })}
          >
            Vamos conversar
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
