import { Monogram } from "@/components/monogram";
import { Signature } from "@/components/signature";
import {
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/constants";

const CONTACT_LINKS = [
  {
    label: `WhatsApp ${WHATSAPP_DISPLAY}`,
    href: WHATSAPP_URL,
    ariaLabel: "Chamar Eduarda Santos no WhatsApp (abre em nova aba)",
    external: true,
  },
  {
    label: "eduardasan2207@gmail.com",
    href: "mailto:eduardasan2207@gmail.com",
    ariaLabel: "Enviar e-mail para Eduarda Santos",
    external: false,
  },
  {
    label: "@dudasantosmes",
    href: INSTAGRAM_URL,
    ariaLabel: "Instagram de Eduarda Santos (abre em nova aba)",
    external: true,
  },
];

export function Footer() {
  return (
    // #contato mora na section de CTA final (call-to-action.tsx), não aqui.
    // Todo botão "Vamos conversar" do site abre o WhatsApp direto
    // (WHATSAPP_URL em @/lib/constants).
    <footer className="bg-wine text-cream">
      <div className="mx-auto flex max-w-site flex-col items-center gap-10 px-6 py-28 text-center md:px-10 md:py-36">
        <Monogram className="h-14" />

        <div className="space-y-4">
          <p className="font-sans text-xs font-light tracking-eyebrow uppercase">
            Eduarda Santos
          </p>
          <p className="font-accent text-md text-cream/80 italic">
            criatividade &amp; comunicação
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.ariaLabel}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="font-sans text-sm font-light underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-site px-6 py-6 text-center md:px-10">
          <p className="font-sans text-xs font-light text-cream/60">
            © 2026 Eduarda Santos. Todos os direitos reservados.
          </p>
          <Signature />
        </div>
      </div>
    </footer>
  );
}
