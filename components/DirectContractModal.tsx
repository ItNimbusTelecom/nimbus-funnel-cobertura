"use client";

import { FormEvent, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { type MobilePlan } from "@/lib/plans";
import { submitLead as submitLeadRequest } from "@/lib/submitLead";
import { getLeadSource } from "@/lib/utm";

type ContactChoice = "phone" | "whatsapp" | "office";

type DirectContractModalProps = {
  plan: MobilePlan;
  onClose: () => void;
};

const contactChoices: Array<{ id: ContactChoice; label: string }> = [
  { id: "phone", label: "Que me llaméis" },
  { id: "whatsapp", label: "Prefiero WhatsApp" },
  { id: "office", label: "Quiero acercarme a la oficina" },
];

export function DirectContractModal({ plan, onClose }: DirectContractModalProps) {
  const [choice, setChoice] = useState<ContactChoice>("phone");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requiresContact = choice !== "office";
  const preferredContact = useMemo(() => (choice === "office" ? "oficina" : choice), [choice]);

  function selectChoice(nextChoice: ContactChoice) {
    setChoice(nextChoice);
    setError("");
    if (nextChoice === "office") {
      trackEvent("contratacion_oficina_selected", { plan_id: plan.id });
    }
  }

  function openWhatsapp() {
    trackEvent("contratacion_whatsapp_clicked", { plan_id: plan.id });
    window.open(
      "https://wa.me/34622812604?text=Hola%20Nimbus%2C%20quiero%20informaci%C3%B3n%20para%20contratar%20una%20l%C3%ADnea%20m%C3%B3vil.",
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (requiresContact && !name.trim()) {
      setError("Indica tu nombre para que podamos ayudarte.");
      return;
    }

    if (requiresContact && !phone.trim()) {
      setError("Indica un teléfono de contacto.");
      return;
    }

    if (!consent) {
      setError("Necesitamos tu aceptación para contactar contigo.");
      return;
    }

    setIsSubmitting(true);
    trackEvent("contratacion_directa_submitted", { plan_id: plan.id, preferred_contact: preferredContact });

    const payload = {
      funnel: "cobertura-movil",
      leadType: "contratacion-directa",
      version: "mvp-2",
      submittedAt: new Date().toISOString(),
      selectedPlan: {
        id: plan.id,
        name: plan.name,
        priceLabel: plan.priceLabel,
        description: plan.description,
      },
      source: getLeadSource(),
      contact: {
        name,
        phone,
        email,
        preferredContact,
        consent,
      },
    };

    try {
      await submitLeadRequest(payload);
      trackEvent("contratacion_directa_completed", { plan_id: plan.id, preferred_contact: preferredContact });
      setSent(true);
    } catch (submitError) {
      trackEvent("contratacion_submit_error", { plan_id: plan.id });
      setError(submitError instanceof Error ? submitError.message : "No hemos podido enviar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-nimbus-ink/45 px-4 py-6">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b border-nimbus-line p-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-nimbus-orange">{plan.name}</p>
            <h3 className="mt-2 text-2xl font-black text-nimbus-ink">¿Cómo prefieres contratar?</h3>
            <p className="mt-2 text-sm leading-6 text-nimbus-muted">
              Te ayudamos a cerrar la contratación de esta línea móvil y resolver cualquier duda antes de activar el
              servicio.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-nimbus-line text-xl text-nimbus-muted transition hover:bg-nimbus-soft"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {sent ? (
          <div className="p-6">
            <h4 className="text-xl font-black text-nimbus-ink">Solicitud recibida</h4>
            <p className="mt-3 text-nimbus-muted">
              Gracias. Revisaremos tu solicitud de contratación y te contactaremos para avanzar con la opción elegida.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={submitLead} className="p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {contactChoices.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectChoice(item.id)}
                  className={`rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${
                    choice === item.id
                      ? "border-nimbus-orange bg-orange-50 text-nimbus-ink"
                      : "border-nimbus-line text-nimbus-muted hover:border-nimbus-orange"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {choice === "office" ? (
              <div className="mt-6 rounded-lg border border-nimbus-line bg-nimbus-soft p-5 text-sm leading-7 text-nimbus-muted">
                <p className="font-black text-nimbus-ink">Puedes venir a nuestra oficina en C/Major, 42 - Sils.</p>
                <p>Teléfono: 972 85 01 55</p>
                <p>WhatsApp: 622 81 26 04</p>
                <p className="mt-2">Si quieres, deja tus datos y te tendremos el caso preparado antes de venir.</p>
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold text-nimbus-ink">
                Nombre {requiresContact ? "" : "(opcional)"}
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
                  autoComplete="name"
                />
              </label>
              <label className="text-sm font-bold text-nimbus-ink">
                Teléfono {requiresContact ? "" : "(opcional)"}
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
                  autoComplete="tel"
                />
              </label>
              <label className="text-sm font-bold text-nimbus-ink sm:col-span-2">
                Email opcional
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
                  autoComplete="email"
                />
              </label>
            </div>

            <label className="mt-5 flex gap-3 text-sm leading-6 text-nimbus-muted">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-1 size-4 accent-nimbus-orange"
              />
              <span>Acepto que Nimbus Telecom contacte conmigo para ayudarme con esta contratación.</span>
            </label>

            {choice === "whatsapp" ? (
              <button
                type="button"
                onClick={openWhatsapp}
                className="mt-5 w-full rounded-full border border-nimbus-orange px-5 py-3 text-sm font-black text-nimbus-orange transition hover:bg-orange-50"
              >
                Abrir WhatsApp
              </button>
            ) : null}

            {error ? <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
