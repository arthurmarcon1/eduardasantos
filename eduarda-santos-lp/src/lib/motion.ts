"use client";

import { useReducedMotion, type Variants } from "framer-motion";

/**
 * Entrada de conteúdo do site inteiro: fade + translateY(12px), 0.6s,
 * ease editorial, stagger entre itens de um grupo. Ver /CLAUDE.md §
 * Movimento.
 *
 * Sob prefers-reduced-motion, só o fade continua — o translateY é
 * removido (y fica 0 em ambos os estados), mas a opacidade ainda anima.
 * stroke-dashoffset (hero) e o marquee (about) são desligados à parte,
 * via `@media (prefers-reduced-motion: no-preference)` direto no CSS.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;

export function useFadeInStagger(staggerChildren = 0.08, delayChildren = 0) {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0 },
  };

  const itemTransition = { duration: 0.6, ease: EASE };

  return { reduceMotion, container, item, itemTransition };
}
