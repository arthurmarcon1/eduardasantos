import { About } from "@/components/sections/about";
import { CallToAction } from "@/components/sections/call-to-action";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Services } from "@/components/sections/services";
import { Value } from "@/components/sections/value";

// Ordem deliberadamente não é o funil padrão de SaaS (hero → prova social →
// features → valor → preço). O "Entenda o valor" vem logo depois do hero,
// como continuação direta da tese ("é o que sobra depois" → "por que
// sobra"), antes de qualquer credencial — ver autocrítica no histórico do
// projeto.
export default function Home() {
  return (
    <>
      <Hero />
      <Value />
      <About />
      <Services />
      <Pricing />
      <Faq />
      <CallToAction />
    </>
  );
}
