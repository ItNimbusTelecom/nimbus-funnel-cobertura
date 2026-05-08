"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const faqItems = [
  {
    question: "¿Me garantizáis que siempre tendré cobertura?",
    answer:
      "No. Ninguna compañía puede garantizar cobertura perfecta en todos los lugares. Lo que sí hacemos es darte más opciones reales trabajando con triple cobertura y revisando tu caso antes de recomendarte una línea.",
  },
  {
    question: "¿Qué significa triple cobertura?",
    answer:
      "Significa que trabajamos con líneas móviles que pueden operar sobre varias redes disponibles, como Movistar, Orange y MásMóvil/Yoigo. Eso nos permite tener más margen para buscar una opción que funcione mejor según dónde uses el móvil.",
  },
  {
    question: "¿Tengo que cambiar de número?",
    answer: "No necesariamente. Podemos ayudarte a conservar tu número actual mediante portabilidad.",
  },
  {
    question: "¿Tiene permanencia?",
    answer: "No. Las tarifas móviles indicadas son sin permanencia.",
  },
  {
    question: "¿Por qué no contratar simplemente la tarifa más barata?",
    answer:
      "Porque si tienes problemas de cobertura, el precio no es lo único importante. Conviene revisar dónde te falla, qué red usas ahora y cómo utilizas el móvil. La mejor tarifa no siempre es la más grande ni la más barata, sino la que encaja con tu caso.",
  },
  {
    question: "¿El 5G funciona siempre?",
    answer: "No siempre. El 5G depende de la cobertura disponible en la zona y de que tu terminal sea compatible.",
  },
  {
    question: "¿Puedo usar llamadas WiFi o VoLTE?",
    answer: "Sí, siempre que tu terminal sea compatible, el servicio esté disponible y esté correctamente configurado.",
  },
  {
    question: "¿Me podéis ayudar si no sé configurar el móvil?",
    answer: "Sí. Parte del valor de Nimbus es ayudarte a entender y configurar el servicio para que funcione como toca.",
  },
  {
    question: "¿Qué pasa si después de contratar sigo teniendo problemas?",
    answer:
      "Revisaremos el caso contigo. La cobertura puede depender de la zona, del interior del edificio, del terminal y de la red disponible. Nuestro objetivo es no dejarte solo después de activar la línea.",
  },
  {
    question: "¿Puedo contratar directamente sin pedir estudio de cobertura?",
    answer:
      "Sí. Puedes solicitar una tarifa directamente desde esta página. El estudio de cobertura está pensado para personas que ya tienen problemas o dudas y quieren una recomendación más ajustada.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  function toggleQuestion(index: number) {
    const nextIndex = openIndex === index ? -1 : index;
    setOpenIndex(nextIndex);

    if (nextIndex === index) {
      trackEvent("faq_item_opened", { question: faqItems[index].question });
    }
  }

  return (
    <section id="faq" className="scroll-mt-24 bg-nimbus-soft py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">Dudas habituales</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            Dudas habituales antes de cambiar de línea móvil
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">
            Si tienes problemas de cobertura, es normal tener dudas antes de cambiar. Aquí respondemos las más
            frecuentes con claridad.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-answer-${index}`;

            return (
              <article key={item.question} className="rounded-lg border border-nimbus-line bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition hover:text-nimbus-orange md:px-6"
                >
                  <span className="text-lg font-black text-nimbus-ink">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-orange-100 text-xl font-black leading-none text-nimbus-orange"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div id={contentId} hidden={!isOpen} className="px-5 pb-5 md:px-6">
                  <p className="max-w-4xl leading-7 text-nimbus-muted">{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-lg border border-orange-100 bg-white p-6 md:flex md:items-center md:justify-between md:gap-8">
          <p className="text-xl font-black text-nimbus-ink">¿Sigues teniendo dudas sobre tu cobertura?</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <a
              href="#formulario"
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              Quiero que estudiéis mi caso
            </a>
            <a
              href="#tarifas"
              className="rounded-full border border-nimbus-line bg-white px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              Ver tarifas móviles
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
