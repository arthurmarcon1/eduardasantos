import { Monogram } from "@/components/monogram";

const CONTACT_LINKS = [
  {
    label: "contato@eduardasantos.com.br",
    href: "mailto:contato@eduardasantos.com.br",
    ariaLabel: "Enviar e-mail para Eduarda Santos",
    external: false,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/eduardasantos",
    ariaLabel: "Instagram de Eduarda Santos (abre em nova aba)",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/eduardasantos",
    ariaLabel: "LinkedIn de Eduarda Santos (abre em nova aba)",
    external: true,
  },
];

export function Footer() {
  return (
    // #contato mora na section de CTA final (call-to-action.tsx), não aqui —
    // é ela que serve de alvo para os links "Vamos conversar" do site.
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
        <p className="mx-auto max-w-site px-6 py-6 text-center font-sans text-xs font-light text-cream/60 md:px-10">
          © 2026 Eduarda Santos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
