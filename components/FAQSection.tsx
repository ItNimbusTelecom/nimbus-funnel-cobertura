"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { VisualIcon } from "./VisualIcon";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const { dictionary } = useI18n();

  function toggleQuestion(index: number) {
    const nextIndex = openIndex === index ? -1 : index;
    setOpenIndex(nextIndex);

    if (nextIndex === index) {
      trackEvent("faq_item_opened", { question: dictionary.faq.items[index][0] });
    }
  }

  return (
    <section id="faq" className="scroll-mt-24 bg-nimbus-soft py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">{dictionary.faq.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            {dictionary.faq.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">{dictionary.faq.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-4">
          {dictionary.faq.items.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-answer-${index}`;

            return (
              <article key={question} className="rounded-lg border border-nimbus-line bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition hover:text-nimbus-orange md:px-6"
                >
                  <span className="text-lg font-black text-nimbus-ink">{question}</span>
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange"
                  >
                    <VisualIcon name={isOpen ? "chevron-up" : "chevron-down"} className="size-4" />
                  </span>
                </button>
                <div id={contentId} hidden={!isOpen} className="px-5 pb-5 md:px-6">
                  <p className="max-w-4xl leading-7 text-nimbus-muted">{answer}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-lg border border-orange-100 bg-white p-6 md:flex md:items-center md:justify-between md:gap-8">
          <p className="text-xl font-black text-nimbus-ink">{dictionary.faq.ctaText}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <a
              href="#formulario"
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              {dictionary.faq.studyCta}
            </a>
            <a
              href="#tarifas"
              className="rounded-full border border-nimbus-line bg-white px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              {dictionary.faq.plansCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
