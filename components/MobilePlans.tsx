"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { MOBILE_PLANS, type MobilePlan } from "@/lib/plans";
import { DirectContractModal } from "./DirectContractModal";

export function MobilePlans() {
  const [selectedPlan, setSelectedPlan] = useState<MobilePlan | null>(null);

  function openPlan(plan: MobilePlan) {
    trackEvent("tarifa_movil_card_clicked", { plan_id: plan.id, plan_name: plan.name });
    trackEvent("contratacion_modal_opened", { plan_id: plan.id, plan_name: plan.name });
    setSelectedPlan(plan);
  }

  return (
    <section id="tarifas" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">Opciones móviles</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            Opciones móviles orientativas
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">
            Puedes ver nuestras opciones móviles y contratar directamente. Si tienes un problema concreto de cobertura,
            también puedes pedirnos que estudiemos tu caso antes de recomendarte una opción.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MOBILE_PLANS.map((plan) => (
            <article
              key={plan.id}
              className="flex min-h-[360px] flex-col rounded-lg border border-nimbus-line bg-white p-6 shadow-soft"
            >
              <div className="flex-1">
                <h3 className="text-xl font-black text-nimbus-ink">{plan.name}</h3>
                <p className="mt-3 text-3xl font-black text-nimbus-orange">{plan.price}</p>
                <p className="mt-1 text-sm font-black uppercase tracking-[0.14em] text-nimbus-muted">{plan.data}</p>
                <p className="mt-3 text-nimbus-muted">{plan.description}</p>
                <ul className="mt-5 space-y-3 text-sm text-nimbus-muted">
                  {plan.features.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-black text-nimbus-orange">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => openPlan(plan)}
                className="mt-7 w-full rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
              >
                {plan.ctaLabel}
              </button>
            </article>
          ))}
        </div>
      </div>

      {selectedPlan ? <DirectContractModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} /> : null}
    </section>
  );
}
