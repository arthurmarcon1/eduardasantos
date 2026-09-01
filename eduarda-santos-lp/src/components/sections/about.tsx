"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { useFadeInStagger } from "@/lib/motion";
import eduardaPhoto from "@/assets/eduarda.jpg";
import marcaChili from "@/assets/marcas/chili.webp";
import marcaChiliCor from "@/assets/marcas/chili-cor.webp";
import marcaGrupo3E from "@/assets/marcas/grupo-3e.webp";
import marcaMoriah from "@/assets/marcas/moriah.webp";
import marcaMoriahCor from "@/assets/marcas/moriah-cor.webp";

// Clientes reais — não inventar/generalizar nomes aqui. Moriah e Chili são
// lojas de roupa, Grupo 3E é gestão de pessoas.
//
// Os arquivos originais das três logos não conviviam com o papel: a Moriah é
// dourada (contraste 1.39 sobre o --paper) e a Grupo 3E é branca sólida
// (1.27) — ambas feitas para fundo escuro, e ilegíveis aqui. Só a Chili já
// era escura. E não existe fundo único que sirva pras três: num fundo vinho
// a Chili é que sumiria.
//
// Por isso os arquivos versionados aqui são derivados, não os originais:
// cada logo foi normalizado e remapeado para o --ink, invertendo só as
// claras, com a opacidade acompanhando a luminância original — o que
// preserva o desenho interno em vez de achatar tudo numa silhueta (a Chili
// chapada virava uma mancha só, pimentão fundido no script). As três ficam
// em 12.67 de contraste sobre o papel. Trocar uma logo exige refazer esse
// tratamento, não só soltar o PNG novo na pasta.
//
// `src` é a versão tratada (repouso) e `color` é o arquivo original intacto,
// que aparece no hover. As duas são recortadas pela MESMA bbox, calculada a
// partir do alfa do original — sem isso as bordas não coincidem e a logo dá
// um pulo no meio da transição.
const BRANDS = [
  {
    name: "Moriah",
    src: marcaMoriah,
    color: marcaMoriahCor,
    // Alturas diferentes por marca: normalizar pela altura deixaria a Chili
    // (quase quadrada) com muito mais massa visual que os dois logotipos
    // horizontais. Os valores abaixo equilibram no olho, não na régua.
    className: "h-6 w-auto md:h-9",
  },
  {
    name: "Chili",
    src: marcaChili,
    color: marcaChiliCor,
    className: "h-9 w-auto md:h-14",
  },
  {
    // Sem `color`: o arquivo da Grupo 3E é branco sólido, sem nenhuma cor
    // para revelar — trocar por ele no hover faria a logo sumir no papel em
    // vez de ganhar vida. Aqui o hover só leva a versão tratada à opacidade
    // cheia. Se a cliente mandar uma versão positiva (escura ou colorida)
    // desta marca, é só apontar `color` para ela que o cross-fade passa a
    // valer, igual às outras duas.
    name: "Grupo 3E",
    src: marcaGrupo3E,
    color: null,
    className: "h-6 w-auto md:h-9",
  },
];

export function About() {
  const { reduceMotion, container, item, itemTransition } =
    useFadeInStagger(0.1);

  return (
    <section id="sobre">
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
              Estudo Marketing e Comunicação na PUCRS e trabalho com marketing
              estratégico para marcas, negócios e profissionais que querem
              construir uma presença mais forte no digital.
            </p>
            <p className="mt-5 max-w-prose font-sans text-base leading-body font-light text-ink">
              Sempre gostei de transformar ideias em algo que pudesse ser visto,
              entendido e lembrado. Foi no marketing que encontrei uma forma de
              unir essa criatividade com estratégia e propósito.
            </p>
            <p className="mt-5 max-w-prose font-sans text-base leading-body font-light text-ink">
              Gosto de entender o que existe por trás de cada marca: o negócio,
              público e o que ela quer comunicar. A partir disso, transformo
              ideias em estratégias, conteúdos e campanhas que fazem sentido
              para cada realidade.
            </p>
            <p className="mt-5 max-w-prose font-accent text-lg text-wine italic">
              Antes de pensar no que postar, eu penso no porquê.
            </p>
            <p className="mt-5 max-w-prose font-sans text-base leading-body font-light text-ink">
              Porque acredito que uma boa comunicação não precisa ser
              complicada. Ela precisa ser clara, ter propósito e fazer sentido
              para quem está do outro lado.
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
          <motion.p
            variants={item}
            transition={itemTransition}
            className="text-center font-sans text-xs font-light tracking-eyebrow text-ink uppercase"
          >
            Algumas marcas que fazem parte do meu trabalho
          </motion.p>

          {/* Duas animações empilhadas, em elementos separados de propósito:
              a de fora faz a entrada (variants do container, roda uma vez) e
              a de dentro faz a flutuação contínua. No mesmo elemento elas
              brigariam pelo `y`. Cada marca flutua com um atraso diferente
              para não subirem e descerem em bloco.

              No hover a logo tratada some e aparece o arquivo original, com
              as cores da marca. As duas ocupam o mesmo lugar (mesma bbox,
              mesma classe de altura), então é troca no lugar, sem pulo.

              Sob prefers-reduced-motion tudo para: o useFadeInStagger anula a
              entrada e o `animate` da flutuação vira estático. */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-8 md:mt-12 md:gap-x-16">
            {BRANDS.map((brand, i) => (
              <motion.div
                key={brand.name}
                variants={item}
                transition={itemTransition}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.6,
                        }
                  }
                  className="group relative"
                >
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    className={`${brand.className} transition-opacity duration-500 ${
                      brand.color
                        ? "opacity-70 group-hover:opacity-0"
                        : "opacity-70 group-hover:opacity-100"
                    }`}
                  />
                  {brand.color ? (
                    <Image
                      src={brand.color}
                      alt=""
                      aria-hidden="true"
                      className={`${brand.className} absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    />
                  ) : null}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
