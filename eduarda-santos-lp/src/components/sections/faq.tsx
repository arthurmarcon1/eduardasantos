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
    question: "Você trabalha com marcas de qualquer segmento?",
    answer:
      "Trabalho, desde que exista abertura para pensar estratégia antes de pedir peça pronta. Já atendi negócios locais, marcas pessoais e projetos em fase de lançamento.",
  },
  {
    question: "Em quanto tempo eu vejo resultado?",
    answer:
      "Depende do ponto de partida e do formato escolhido. Diagnóstico e posicionamento saem em semanas; construir consistência de marca é processo contínuo, não evento único.",
  },
  {
    question: "Você faz a parte de design/artes também?",
    answer:
      "Meu foco é estratégia, conteúdo e direcionamento. Para a produção final das peças, trabalho com parceiros de design ou oriento a equipe interna da marca, conforme o formato.",
  },
  {
    question: "Como funciona o primeiro contato?",
    answer:
      "Uma conversa inicial para entender seu momento e objetivo. A partir dela, indico o formato mais adequado e alinhamos escopo e valores.",
  },
  {
    question: "Trabalha remoto?",
    answer:
      "Sim, atendo remoto em todo o Brasil. Reuniões por vídeo e entregas assíncronas dão conta da maior parte do processo.",
  },
  {
    question: "Qual o compromisso mínimo no formato continuado?",
    answer:
      "Peço um ciclo mínimo de três meses. É o tempo necessário para a consistência gerar resultado perceptível, não só entregar posts.",
  },
];

export function Faq() {
  const { container, item: fadeItem, itemTransition } = useFadeInStagger(0.08);

  return (
    <section id="duvidas" className="bg-cream">
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
