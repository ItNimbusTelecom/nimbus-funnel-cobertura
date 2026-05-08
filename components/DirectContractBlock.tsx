"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { MOBILE_PLANS } from "@/lib/plans";
import { DirectContractModal } from "./DirectContractModal";

export function DirectContractBlock() {
  const [open, setOpen] = useState(false);
  const plan = MOBILE_PLANS[1];

  function openModal() {
    trackEvent("contratacion_modal_opened", { plan_id: plan.id, plan_name: plan.name, source: "contratar_block" });
    setOpen(true);
  }

  return (
    <section id="contratar" className="scroll-mt-24 bg-white py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 rounded-lg border border-nimbus-line bg-nimbus-ink p-7 text-white shadow-soft md:grid-cols-[1fr_auto] md:items-center md:p-9">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-200">Contratación directa</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
              ¿Ya tienes claro que quieres una línea móvil Nimbus?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-white/76">
              Puedes avanzar con la contratación y resolver cualquier duda antes de activar el servicio. Te llamamos,
              hablamos por WhatsApp o te atendemos en la oficina de Sils.
            </p>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="rounded-full bg-nimbus-orange px-6 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
          >
            Quiero contratar
          </button>
        </div>
      </div>
      {open ? <DirectContractModal plan={plan} onClose={() => setOpen(false)} /> : null}
    </section>
  );
}
