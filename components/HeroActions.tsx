"use client";

import { trackEvent } from "@/lib/analytics";

export function HeroActions() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <a
        href="#formulario"
        onClick={() => trackEvent("hero_estudio_clicked", { funnel: "cobertura-movil" })}
        className="rounded-full bg-nimbus-orange px-6 py-3 text-center text-sm font-black text-white shadow-sm transition hover:bg-nimbus-orangeDark"
      >
        Quiero que estudiéis mi caso
      </a>
      <a
        href="#tarifas"
        onClick={() => trackEvent("hero_tarifas_clicked", { funnel: "cobertura-movil" })}
        className="rounded-full border border-nimbus-line bg-white px-6 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
      >
        Ver opciones móviles
      </a>
    </div>
  );
}
