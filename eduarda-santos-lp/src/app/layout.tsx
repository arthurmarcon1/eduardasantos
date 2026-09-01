import type { Metadata } from "next";
import { Bodoni_Moda, Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";

// Bodoni Moda e Montserrat aparecem já no hero (h1 + eyebrow/parágrafo) —
// precisam de preload. Cormorant só entra mais abaixo na página (itálicos
// de assinatura/citação), então preload:false evita gastar a verba de
// preload inicial com uma fonte que ainda não é renderizada no primeiro view.
const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const SITE_URL = "https://eduardasantos.com.br"; // TODO: trocar pelo domínio real antes de publicar
const TITLE = "Eduarda Santos — Marketing Estratégico";
const DESCRIPTION =
  "Marketing estratégico para marcas e para profissionais que são o próprio negócio. Direção de Eduarda Santos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: TITLE,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bodoniModa.variable} ${montserrat.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only border border-wine bg-cream px-6 py-3 font-sans text-xs font-light tracking-label text-wine uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100"
        >
          Pular para o conteúdo
        </a>
        <Header />
        {/* tabIndex=-1: sem isso o link "pular" só rola a página, o foco
            do teclado fica preso no <body> em vez de entrar no conteúdo.
            Sem outline-none de propósito — "nunca outline:none" vale até
            aqui; o contorno ao redor do conteúdo também serve de
            confirmação de que o foco realmente entrou. */}
        <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
