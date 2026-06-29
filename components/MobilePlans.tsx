"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { MOBILE_PLANS, type MobilePlan } from "@/lib/plans";
import { DirectContractModal } from "./DirectContractModal";
import { VisualIcon } from "./VisualIcon";

export function MobilePlans() {
  const [selectedPlan, setSelectedPlan] = useState<MobilePlan | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { dictionary } = useI18n();

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    function updateScrollState() {
      if (!carousel) {
        return;
      }

      const firstPlan = carousel.firstElementChild;
      const lastPlan = carousel.lastElementChild;
      const carouselRect = carousel.getBoundingClientRect();
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      const firstPlanLeft = firstPlan?.getBoundingClientRect().left ?? carouselRect.left;
      const lastPlanRight = lastPlan?.getBoundingClientRect().right ?? carouselRect.right;

      setCanScrollLeft(firstPlanLeft < carouselRect.left - 4);
      setCanScrollRight(lastPlanRight > carouselRect.right + 4 && carousel.scrollLeft < maxScrollLeft - 4);
    }

    updateScrollState();
    carousel.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      carousel.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  function openPlan(plan: MobilePlan) {
    trackEvent("tarifa_movil_card_clicked", { plan_id: plan.id, plan_name: plan.name });
    trackEvent("contratacion_modal_opened", { plan_id: plan.id, plan_name: plan.name });
    setSelectedPlan(plan);
  }

  function scrollPlans(direction: "left" | "right") {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const distance = Math.round(carousel.clientWidth * 0.85);
    carousel.scrollBy({ left: direction === "right" ? distance : -distance, behavior: "smooth" });
  }

  return (
    <section id="tarifas" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">{dictionary.plans.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            {dictionary.plans.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">{dictionary.plans.text}</p>
          <p className="mt-3 text-sm font-bold leading-6 text-nimbus-muted">{dictionary.plans.promoNote}</p>
        </div>

        <div className="relative left-1/2 mt-10 w-[100dvw] -translate-x-1/2 overflow-hidden">
          <div className="mx-auto mb-4 flex max-w-6xl items-center justify-between gap-4 px-5">
            <p className="flex items-center gap-2 text-sm font-bold text-nimbus-muted">
              <span className="h-px w-8 bg-nimbus-orange" aria-hidden="true" />
              {dictionary.plans.carouselHint}
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => scrollPlans("left")}
                disabled={!canScrollLeft}
                aria-label={dictionary.plans.scrollLeft}
                className="grid size-11 place-items-center rounded-full border border-nimbus-line bg-white text-nimbus-ink shadow-sm transition hover:border-nimbus-orange hover:text-nimbus-orange disabled:pointer-events-none disabled:opacity-30"
              >
                <VisualIcon name="chevron-up" className="size-5 -rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => scrollPlans("right")}
                disabled={!canScrollRight}
                aria-label={dictionary.plans.scrollRight}
                className="grid size-11 place-items-center rounded-full border border-nimbus-line bg-white text-nimbus-ink shadow-sm transition hover:border-nimbus-orange hover:text-nimbus-orange disabled:pointer-events-none disabled:opacity-30"
              >
                <VisualIcon name="chevron-down" className="size-5 -rotate-90" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 pl-5 pr-5 [scrollbar-width:thin] [scrollbar-color:#f26a21_#f3f4f6] lg:pl-[max(1.25rem,calc((100dvw-72rem)/2+1.25rem))]"
          >
            {MOBILE_PLANS.map((plan) => (
              <article
                key={plan.id}
                className="flex min-h-[390px] w-[82vw] max-w-[340px] shrink-0 snap-start flex-col rounded-lg border border-nimbus-line bg-white p-6 shadow-soft sm:w-[46vw] lg:w-[340px]"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-black text-nimbus-ink">{plan.name}</h3>
                  <p className="mt-3 text-3xl font-black text-nimbus-orange">{plan.price}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-nimbus-orange">
                      <VisualIcon name="database" className="size-3.5" />
                      {plan.data}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-nimbus-soft px-3 py-1 text-xs font-black text-nimbus-muted">
                      <VisualIcon name="phone" className="size-3.5" />
                      {dictionary.plans.callsBadge}
                    </span>
                  </div>
                  <p className="mt-3 text-nimbus-muted">{dictionary.plans.description(plan.data)}</p>
                  <ul className="mt-5 space-y-3 text-sm text-nimbus-muted">
                    {dictionary.plans.features.map((item, index) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-black text-nimbus-orange">
                          <PlanFeatureIcon index={index} />
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
                  {dictionary.plans.cta}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      {selectedPlan ? <DirectContractModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} /> : null}
    </section>
  );
}

function PlanFeatureIcon({ index }: { index: number }) {
  if (index === 1) {
    return <VisualIcon name="shield-check" className="size-3.5" />;
  }

  if (index === 2) {
    return <VisualIcon name="database" className="size-3.5" />;
  }

  return <VisualIcon name="check-circle" className="size-3.5" />;
}
