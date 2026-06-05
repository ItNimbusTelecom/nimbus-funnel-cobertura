import type { Metadata } from "next";
import Image from "next/image";
import { VisualIcon } from "@/components/VisualIcon";
import { CONTACT_INFO } from "@/lib/contact";
import { NIMBUS_LOGO_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Ofertas reales en fibra, móvil e internet | Nimbus Telecom",
  description:
    "Promoción Nimbus Telecom con ofertas de fibra óptica, móvil, internet rural, alarma Ajax y Servei Express TV.",
  robots: {
    index: false,
    follow: false,
  },
};

const ruralPlans = [
  { speed: "10MB", price: "29,95€" },
  { speed: "15MB", price: "39,95€" },
  { speed: "30MB", price: "49,95€" },
];

const mobilePlans = [
  { data: "30GB", price: "6,95€" },
  { data: "60GB", price: "7,95€" },
  { data: "100GB", price: "10,95€" },
  { data: "200GB", price: "14,95€" },
];

const sharedDataPlans = [
  { data: "120GB", price: "21,90€" },
  { data: "160GB", price: "26,90€" },
  { data: "300GB", price: "36,90€" },
];

const fiberPlans = [
  { speed: "600Mb", price: "32€" },
  { speed: "1000Mb", price: "38€" },
];

const ajaxFeatures = ["Control total des del mòbil", "Avisos immediats", "Instal·lació inclosa"];

export default function OffersQrPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-nimbus-ink">
      <section className="relative border-b border-nimbus-line bg-white">
        <div className="absolute inset-0 -z-0 opacity-[0.035]" aria-hidden="true">
          <div className="h-full w-full bg-[linear-gradient(120deg,transparent_0_46%,#F47B20_46%_48%,transparent_48%_100%),linear-gradient(60deg,transparent_0_46%,#1F252B_46%_48%,transparent_48%_100%)] bg-[length:180px_180px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-8 md:py-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-8 inline-flex items-center rounded-lg border border-nimbus-line bg-white px-4 py-3 shadow-sm">
              <Image
                src={NIMBUS_LOGO_URL}
                alt="Nimbus Telecom"
                width={223}
                height={70}
                unoptimized
                className="h-auto w-[150px] object-contain"
              />
            </div>

            <p className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
              Promoció QR
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-nimbus-ink md:text-6xl">
              Ofertas reals en fibra, mòbil i internet
            </h1>
            <div className="mt-6 grid gap-2 text-xl font-black text-nimbus-ink sm:max-w-sm">
              <p>Sense sorpreses.</p>
              <p>Sense complicacions.</p>
              <p>Sense call centers.</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-nimbus-orange px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-nimbus-orangeDark"
              >
                <VisualIcon name="message-circle" className="size-5" />
                Escriu-nos per WhatsApp
              </a>
              <a
                href="tel:+34622812604"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-nimbus-line bg-white px-6 py-3 text-sm font-black text-nimbus-ink shadow-sm transition hover:border-nimbus-orange hover:text-nimbus-orange"
              >
                <VisualIcon name="phone-call" className="size-5" />
                +34 622 81 26 04
              </a>
            </div>
          </div>

          <div className="grid gap-4 rounded-lg border border-nimbus-line bg-nimbus-soft p-5 shadow-soft">
            <PromoCard
              eyebrow="Internet rural"
              title="Connexió per zones on la fibra no arriba"
              icon="radio-tower"
              plans={ruralPlans.map((plan) => `${plan.speed} - ${plan.price}/mes`)}
            />
            <div className="rounded-lg bg-white p-5">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">Mòbil</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-nimbus-ink">
                Tarifes mòbils sense sorpreses
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {mobilePlans.map((plan) => (
                  <PricePill key={plan.data} label={plan.data} price={plan.price} />
                ))}
              </div>
              <p className="mt-4 text-sm font-bold text-nimbus-muted">
                10% de descompte a totes les línies mòbils en contractar fibra.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-nimbus-line bg-white p-6 shadow-soft md:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                <VisualIcon name="wifi" className="size-6" />
              </span>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">Fibra òptica</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-nimbus-ink">Fibra para casa o negocio</h2>
              </div>
            </div>
            <div className="mt-7 grid gap-3">
              {fiberPlans.map((plan) => (
                <PricePill key={plan.speed} label={plan.speed} price={plan.price} />
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-orange-50 p-5">
              <p className="text-4xl font-black text-nimbus-orange">10%</p>
              <p className="mt-1 font-black text-nimbus-ink">Descompte</p>
              <p className="mt-2 text-sm leading-6 text-nimbus-muted">
                A totes les línies mòbils en contractar fibra.
              </p>
            </div>
          </article>

          <article className="rounded-lg border border-nimbus-line bg-nimbus-ink p-6 text-white shadow-soft md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_0.95fr] md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-200">Dades compartides</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Comparteix dades entre línies mòbils</h2>
                <p className="mt-4 leading-7 text-white/75">
                  Si tens diverses línies mòbils, pots compartir dades entre elles.
                </p>
                <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-nimbus-orange">
                  Màx. 3 línies
                </p>
              </div>
              <div className="grid gap-3">
                {sharedDataPlans.map((plan) => (
                  <div key={plan.data} className="rounded-lg bg-white p-4 text-nimbus-ink">
                    <p className="text-xl font-black">
                      {plan.data} - {plan.price}/mes
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-nimbus-soft py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-2">
          <article className="rounded-lg border border-white bg-white p-6 shadow-soft md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
              Sense quotes mensuals
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-nimbus-ink">Alarma Ajax</h2>
            <p className="mt-3 text-2xl font-black text-nimbus-orange">Protegeix casa teva</p>
            <ul className="mt-6 grid gap-3">
              {ajaxFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 font-bold text-nimbus-ink">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
                    <VisualIcon name="shield-check" className="size-4" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-7 inline-flex rounded-full bg-nimbus-orange px-8 py-4 text-4xl font-black text-white">
              499€
            </div>
          </article>

          <article className="rounded-lg border border-nimbus-line bg-white p-6 shadow-soft md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">
              Servei Express TV
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink">
              Deixa la teva senyal funcionant en una sola visita
            </h2>
            <div className="mt-7 inline-flex rounded-full bg-nimbus-orange px-8 py-4 text-4xl font-black text-white">
              75€
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Sense sorpreses", "Sense complicacions", "Atenció propera"].map((item) => (
                <div key={item} className="rounded-lg bg-nimbus-soft p-4 text-sm font-black text-nimbus-ink">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">Nimbus Telecom</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-nimbus-ink">
              T&apos;ajudem a escollir l&apos;opció que encaixa amb casa teva.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:w-[420px]">
            <a
              href={CONTACT_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              <VisualIcon name="message-circle" className="size-5" />
              WhatsApp
            </a>
            <a
              href="tel:+34622812604"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-nimbus-line bg-white px-5 py-3 text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              <VisualIcon name="phone-call" className="size-5" />
              Trucar
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-nimbus-line px-5 pt-6 text-sm font-bold text-nimbus-muted">
          <span>www.nimbustelecom.com</span>
          <span>+34 622 81 26 04</span>
          <span>@nimbustelecom</span>
        </div>
      </section>
    </main>
  );
}

type PromoCardProps = {
  eyebrow: string;
  title: string;
  icon: "radio-tower" | "wifi";
  plans: string[];
};

function PromoCard({ eyebrow, title, icon, plans }: PromoCardProps) {
  return (
    <article className="rounded-lg bg-white p-5">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange-100 text-nimbus-orange">
          <VisualIcon name={icon} className="size-5" />
        </span>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-nimbus-ink">{title}</h2>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {plans.map((plan) => (
          <div key={plan} className="rounded-full bg-yellow-300 px-5 py-3 text-lg font-black text-nimbus-ink">
            {plan}
          </div>
        ))}
      </div>
    </article>
  );
}

function PricePill({ label, price }: { label: string; price: string }) {
  return (
    <div className="rounded-full bg-yellow-300 px-5 py-3 text-lg font-black text-nimbus-ink">
      {label} - {price}/mes
    </div>
  );
}
