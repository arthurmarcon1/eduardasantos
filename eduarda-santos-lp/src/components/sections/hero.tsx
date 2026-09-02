"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { useFadeInStagger } from "@/lib/motion";

/**
 * Tese da página: "estratégia com acabamento artesanal" em 3 segundos.
 * Ver /CLAUDE.md — "Elemento assinatura" (monograma translúcido + sublinhado).
 */
export function Hero() {
  const sealRef = useRef<HTMLVideoElement>(null);
  const sealMobileRef = useRef<HTMLVideoElement>(null);
  const [sealReady, setSealReady] = useState(false);
  const { reduceMotion, container, item, itemTransition } = useFadeInStagger(
    0.08,
    0.1,
  );

  // Sob prefers-reduced-motion, pausa o lacre no frame inicial em vez de
  // deixá-lo girando em loop — `autoplay` do <video> não reage a mudanças
  // de prop após já ter iniciado, então paramos via ref.
  useEffect(() => {
    if (!reduceMotion) return;
    sealRef.current?.pause();
    sealMobileRef.current?.pause();
  }, [reduceMotion]);

  // Fade-in do lacre: `loadeddata`/`readyState` só garantem que o vídeo tem
  // dados, não que o alpha (VP9 com canal alfa) já estabilizou no
  // compositor — os primeiros frames pintados podem sair opacos/pretos por
  // um instante antes disso, artefato do pipeline de decode, não algo que
  // dá pra pegar via readyState. Por isso esperamos o evento `playing`
  // (frames já sendo renderizados de verdade) e ainda soltamos mais alguns
  // quadros de composição via requestAnimationFrame antes de revelar — dá
  // tempo do alpha assentar antes do lacre aparecer.
  useEffect(() => {
    const video = sealRef.current;
    if (!video) return;

    let rafId = 0;
    let cancelled = false;
    const reveal = () => {
      let framesToWait = 6;
      const tick = () => {
        if (cancelled) return;
        framesToWait -= 1;
        if (framesToWait <= 0) {
          setSealReady(true);
        } else {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    // `paused` já vira false assim que o autoplay pega, mesmo que o efeito
    // só rode depois — não dá pra depender só do evento `playing`, que pode
    // ter disparado antes do React anexar o listener (mesmo risco do
    // `loadeddata` que gerou esse bloco).
    if (!video.paused) {
      reveal();
    } else {
      video.addEventListener("playing", reveal, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("playing", reveal);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-(--header-h)">
      <div className="relative z-1 mx-auto flex min-h-[calc(100svh-var(--header-h))] max-w-site items-center px-6 py-16 md:px-10 md:py-0">
        <div className="flex w-full flex-col items-center gap-y-16 md:flex-row md:gap-x-10 md:gap-y-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="relative w-full md:min-w-0 md:flex-1"
          >
            <motion.p
              variants={item}
              transition={itemTransition}
              className="mb-6 font-sans text-xs font-light tracking-eyebrow text-ink-muted uppercase md:mb-8"
            >
              Marketing estratégico
            </motion.p>

            <h1 className="font-display text-[clamp(2.5rem,5.5vw,5.25rem)] leading-[1.02] tracking-tightest text-ink">
              <motion.span
                variants={item}
                transition={itemTransition}
                className="block"
              >
                Marca forte não é sorte.
              </motion.span>
              <motion.span
                variants={item}
                transition={itemTransition}
                className="block"
              >
                É{" "}
                <span className="relative inline-block text-wine-bright">
                  estratégia
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 40"
                    preserveAspectRatio="none"
                    className="absolute inset-x-0 -bottom-2 h-[0.28em] w-full"
                  >
                    <path
                      d="M 2,22 C 40,10 80,28 130,16 C 180,6 220,26 260,14 C 275,10 285,16 296,8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      pathLength={1}
                      className="animate-draw-underline"
                    />
                  </svg>
                </span>
                .
              </motion.span>
            </h1>

            <motion.p
              variants={item}
              transition={itemTransition}
              className="mt-6 max-w-prose font-sans text-md font-light text-ink-muted"
            >
              Estratégia, conteúdo e criatividade para marcas, negócios e
              profissionais que querem se posicionar e crescer no digital.
            </motion.p>

            <motion.div
              variants={item}
              transition={itemTransition}
              className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4"
            >
              <a
                href="#contato"
                className={buttonVariants({ variant: "default" })}
              >
                Vamos conversar
              </a>
              <a
                href="#servicos"
                className="border-b border-wine pb-1 font-sans text-xs font-light tracking-label text-wine uppercase transition-colors hover:border-wine-hover hover:text-wine-hover"
              >
                Ver como trabalho
              </a>
            </motion.div>
          </motion.div>

          {/* Lacre no mobile (<768px). Existe separado do bloco desktop logo
              abaixo porque o formato do arquivo precisa ser outro: o
              seal.webm é VP9 com canal alfa, e o Safari do iOS não suporta
              alfa em WebM — no iPhone ele simplesmente não renderiza. Aqui
              vai um H.264 sem alfa, que toca em iOS e Android, com o fundo
              do papel (--paper, #E9E3DA) embutido no próprio vídeo no lugar
              da transparência.

              O retângulo do vídeo não aparece porque esse fundo embutido é
              exatamente a cor média do papel: medido bloco a bloco no
              tamanho do lacre, a textura local nunca se afasta mais de 0.78
              nível do valor usado, e o decode do H.264 devolve a cor com 0
              de variação interna. Se algum dia o --paper mudar, este vídeo
              precisa ser regerado junto, senão o retângulo passa a aparecer.

              Sem drop-shadow de propósito: a sombra do desktop depende do
              alfa para seguir o contorno do lacre; sobre um vídeo opaco ela
              viraria a sombra de um retângulo.

              `poster` cobre o Modo de Baixo Consumo do iOS, que bloqueia
              autoplay de vídeo — nesse caso fica o lacre parado em vez de um
              buraco no layout. */}
          <div
            aria-hidden="true"
            className="flex w-full justify-center md:hidden"
          >
            <video
              ref={sealMobileRef}
              className="w-[132px]"
              src="/brand/seal-mobile.mp4"
              poster="/brand/seal-mobile-poster.webp"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>

          <div
            aria-hidden="true"
            className="relative hidden w-full shrink-0 items-center justify-center self-stretch md:flex md:w-[clamp(200px,18vw,300px)]"
          >
            {/* Lacre de cera em 3D, fundo preto recortado por chroma-key para
                alpha real (ver /public/brand/seal.webm). Sombra tingida de
                vinho, não preta, para ficar coesa com a paleta.
                object-contain + h/w limitados ao box: em qualquer frame da
                rotação (inclusive os quadros "de perfil", mais estreitos), o
                lacre nunca ultrapassa a coluna nem gera overflow horizontal.

                Duas camadas contra o quadrado preto inicial:
                1) `poster` aponta pro seal-poster-transparent.png (1×1 real
                   com alpha 0 — verificado pixel a pixel; o seal-poster.png
                   antigo tinha fundo preto opaco de verdade, daí o flash) em
                   vez de deixar o <video> sem poster, já que o comportamento
                   padrão do navegador pra <video> sem poster/sem frame ainda
                   decodificado também é pintar um retângulo preto — isso
                   cobre o quadro inicial independente de qualquer timing de
                   JS/hidratação.
                2) Por cima disso, o vídeo nasce com opacity-0 e só aparece
                   (fade) depois que o efeito acima confirma que o alpha do
                   .webm já estabilizou (ver comentário lá) — cobre também um
                   possível primeiro frame ruim do próprio decode do vídeo,
                   não só a espera pelo poster. */}
            <video
              ref={sealRef}
              className={`h-[62%] w-full object-contain drop-shadow-[0_40px_50px_rgba(59,15,26,0.22)] transition-opacity duration-300 ${
                sealReady ? "opacity-100" : "opacity-0"
              }`}
              src="/brand/seal.webm"
              poster="/brand/seal-poster-transparent.png"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
