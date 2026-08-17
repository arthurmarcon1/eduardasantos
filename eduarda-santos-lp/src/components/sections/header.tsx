"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";

import { Monogram } from "@/components/monogram";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#investimento", label: "Investimento" },
  { href: "#duvidas", label: "Dúvidas" },
];

const navLinkClass =
  "font-sans text-xs font-light tracking-nav text-ink uppercase transition-colors hover:text-wine";

const toggleLabelClass =
  "font-sans text-xs font-light tracking-label text-ink uppercase";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Header vira creme após 40px de scroll — sem sombra, só o fio inferior.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu full-screen se a viewport crescer para desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Também fica creme (sem transparência) enquanto o menu mobile está aberto.
  const showCreamHeader = scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-60 border-b transition-colors",
          showCreamHeader
            ? "border-hairline bg-cream"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-site items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#top"
            aria-label="Eduarda Santos — Marketing Estratégico"
            className="text-ink"
          >
            <Monogram className="h-8" />
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className={buttonVariants({
                variant: "outline-wine",
                size: "sm",
              })}
            >
              Vamos conversar
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={cn(toggleLabelClass, "relative z-10 md:hidden")}
          >
            {menuOpen ? "Fechar" : "Menu"}
          </button>
        </div>
      </header>

      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Popup className="fixed inset-0 z-50 flex flex-col bg-cream">
            <Dialog.Title className="sr-only">Menu de navegação</Dialog.Title>

            {/* O fio "Menu"/"Fechar" do header (z-60) fica visível acima deste
                popup e continua controlando `menuOpen` — não duplicamos o
                controle aqui. Mantemos um Dialog.Close só-leitor-de-tela para
                leitores de tela em touch conseguirem fechar (ver docs do
                Base UI Dialog). */}
            <Dialog.Close className="sr-only">Fechar menu</Dialog.Close>

            <nav className="flex flex-1 flex-col items-start justify-center gap-8 px-8 pt-20">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-xl text-ink transition-colors hover:text-wine"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={() => setMenuOpen(false)}
                className="font-display text-xl text-wine transition-colors hover:text-wine-hover"
              >
                Vamos conversar
              </a>
            </nav>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
