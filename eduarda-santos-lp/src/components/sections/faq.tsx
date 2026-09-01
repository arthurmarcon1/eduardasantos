"use client";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFadeInStagger } from "@/lib/motion";

const QUESTIONS = [
  {
    question: "Com quem você trabalha?",
    answer:
      "Com marcas e com profissionais que são o próprio negócio: dentistas, médicos, clínicas e consultórios, além de lojas e empresas locais. O que eu preciso é de abertura para pensar a estratégia antes de sair postando.",
  },
  {
    question: "Em quanto tempo eu vejo resultado?",
    answer:
      "Depende de onde você está hoje e do formato escolhido. A parte de estratégia fica pronta em algumas semanas. Ser lembrado, esse se constrói com o tempo: não acontece em um post só.",
  },
  {
    question: "Você faz as artes também?",
    answer:
      "Meu foco é a estratégia e o conteúdo: o que dizer, para quem e quando. Para a arte final, trabalho com parceiros de design ou oriento quem já cuida disso para você.",
  },
  {
    question: "Como funciona o primeiro contato?",
    answer:
      "Uma conversa para eu entender o seu momento e o que você quer alcançar. Depois dela eu indico o formato que faz mais sentido e a gente fecha escopo e valores.",
  },
  {
    question: "Você atende à distância?",
    answer:
      "Sim, atendo o Brasil inteiro. As reuniões são por vídeo e as entregas chegam por mensagem ou e-mail, no seu tempo.",
  },
  {
    question: "O plano mensal tem tempo mínimo?",
    answer:
      "Tem: três meses. É o mínimo para a constância começar a aparecer em resultado, e não só em post publicado.",
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
          className="mt-4 font-display text-3xl tracking-tightest text-ink"
        >
          Antes de me chamar
        </motion.h2>

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
      </motion.div>
    </section>
  );
}
