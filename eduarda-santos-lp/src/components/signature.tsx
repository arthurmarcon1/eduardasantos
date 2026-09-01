/**
 * Assinatura da 3eTec no rodapé.
 *
 * Este componente é da agência, não da cliente — é o único lugar do projeto
 * que não segue o design system de /CLAUDE.md ao pé da letra, e isso é
 * deliberado: ele precisa sair inteiro sem deixar rastro. Por isso o
 * tamanho de fonte vive aqui como valor arbitrário (`text-[11px]`) em vez
 * de virar token novo em globals.css — token novo obrigaria a mexer no
 * CLAUDE.md e sobraria órfão no dia em que a assinatura for removida.
 *
 * Para remover: apagar este arquivo, o import no footer e a linha
 * `<Signature />`. Não há mais nada espalhado.
 *
 * É Server Component (sem "use client"): a URL é montada em build e o
 * componente não manda um byte de JS para o cliente.
 */

const PORTFOLIO_URL = "https://arthur-portfolio-lps.vercel.app/";

/**
 * Identificador deste projeto no analytics — é o que separa o tráfego de um
 * site de cliente do de outro. Ao reusar o componente em outro projeto,
 * trocar só esta linha (ou passar a prop `project`).
 */
const PROJECT_ID = "eduarda-santos-lp";

/** Constantes entre todos os projetos, para agregar no relatório. */
const UTM_MEDIUM = "footer-signature";
const UTM_CAMPAIGN = "client-sites";

function buildHref(project: string) {
  const url = new URL(PORTFOLIO_URL);
  url.searchParams.set("utm_source", project);
  url.searchParams.set("utm_medium", UTM_MEDIUM);
  url.searchParams.set("utm_campaign", UTM_CAMPAIGN);
  return url.toString();
}

export function Signature({ project = PROJECT_ID }: { project?: string }) {
  return (
    <p className="mt-2">
      {/*
        rel="noopener" sozinho, de propósito: corta o acesso via
        window.opener (tab-nabbing) mas mantém o envio do referrer, que é o
        que identifica de qual site do cliente veio o clique. Sem
        "noreferrer" e sem "nofollow" — o link deve contar como backlink.

        Cor e fonte saem da paleta da própria página (cream sobre wine, a
        Montserrat do corpo). cream/55 rende 5.13:1 sobre o --wine: recua
        em relação ao copyright (cream/60) e ainda passa no AA de 4.5:1.
        Não descer daqui sem refazer essa conta.
      */}
      <a
        href={buildHref(project)}
        target="_blank"
        rel="noopener"
        aria-label="Desenvolvido por 3eTec — ver portfólio (abre em nova aba)"
        className="font-sans text-[11px] font-light text-cream/55 underline-offset-4 transition-colors hover:text-cream/80 hover:underline"
      >
        Desenvolvido por 3eTec
      </a>
    </p>
  );
}
