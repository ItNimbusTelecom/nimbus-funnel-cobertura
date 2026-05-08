"use client";

import { VisualIcon } from "./VisualIcon";
import { useI18n } from "@/lib/i18n";

const serviceCards = [
  {
    icon: "headphones",
  },
  {
    icon: "map-pin",
  },
  {
    icon: "lightbulb",
  },
  {
    icon: "life-buoy",
  },
] as const;

export function LocalServiceSection() {
  const { dictionary } = useI18n();

  return (
    <section id="cercania" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
              {dictionary.localService.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
              {dictionary.localService.title}
            </h2>
            <p className="mt-4 text-lg font-bold leading-8 text-nimbus-ink">
              {dictionary.localService.subtitle}
            </p>
            <p className="mt-4 text-lg leading-8 text-nimbus-muted">
              {dictionary.localService.text}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {serviceCards.map((card, index) => (
              <article key={card.icon} className="rounded-lg border border-nimbus-line bg-nimbus-soft p-5">
                <div className="grid size-10 place-items-center rounded-full bg-white text-nimbus-orange">
                  <VisualIcon name={card.icon} className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-black text-nimbus-ink">{dictionary.localService.cards[index][0]}</h3>
                <p className="mt-3 text-sm leading-6 text-nimbus-muted">{dictionary.localService.cards[index][1]}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-nimbus-line bg-orange-50 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <p className="text-lg font-bold leading-8 text-nimbus-ink">
            {dictionary.localService.closing}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <a
              href="#formulario"
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              {dictionary.localService.studyCta}
            </a>
            <a
              href="#tarifas"
              className="rounded-full border border-nimbus-line bg-white px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              {dictionary.localService.plansCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
