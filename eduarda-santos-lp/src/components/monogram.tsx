import { cn } from "@/lib/utils";

/**
 * Monograma E+S da marca — fonte em /public/brand/monogram.svg.
 * Renderizado via CSS mask (não <img>) para poder herdar `currentColor`
 * em cada contexto: wine no header, creme no footer, wine-a08 no hero.
 * Ver /CLAUDE.md — "Elemento assinatura".
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block aspect-447/510 bg-current",
        "[mask:url(/brand/monogram.svg)_center/contain_no-repeat]",
        "[-webkit-mask:url(/brand/monogram.svg)_center/contain_no-repeat]",
        className,
      )}
    />
  );
}
