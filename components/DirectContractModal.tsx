"use client";

import { FormEvent, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { getElapsedSeconds } from "@/lib/antispam";
import { useI18n } from "@/lib/i18n";
import { type MobilePlan } from "@/lib/plans";
import { submitLead as submitLeadRequest } from "@/lib/submitLead";
import { getLeadSource } from "@/lib/utm";
import { LegalConsentCheckbox } from "./LegalConsentCheckbox";
import { VisualIcon } from "./VisualIcon";

type ContactChoice = "phone" | "whatsapp" | "office";

type DirectContractModalProps = {
  plan: MobilePlan;
  onClose: () => void;
};

const contactChoices: Array<{ id: ContactChoice; icon: "phone" | "message-circle" | "map-pin" }> = [
  { id: "phone", icon: "phone" },
  { id: "whatsapp", icon: "message-circle" },
  { id: "office", icon: "map-pin" },
];

export function DirectContractModal({ plan, onClose }: DirectContractModalProps) {
  const { dictionary } = useI18n();
  const [choice, setChoice] = useState<ContactChoice>("phone");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [formStartedAt] = useState(() => new Date().toISOString());
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requiresContact = choice !== "office";
  const preferredContact = useMemo(() => (choice === "office" ? "oficina" : choice), [choice]);
  const consentError = error === dictionary.modal.errors.consent ? error : undefined;

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
      setError(dictionary.modal.errors.name);
      return;
    }

    if (requiresContact && !phone.trim()) {
      setError(dictionary.modal.errors.phone);
      return;
    }

    if (!consent) {
      setError(dictionary.modal.errors.consent);
      return;
    }

    setIsSubmitting(true);
    trackEvent("contratacion_directa_submitted", { plan_id: plan.id, preferred_contact: preferredContact });
    const elapsedSeconds = getElapsedSeconds(formStartedAt);

    const payload = {
      funnel: "cobertura-movil",
      leadType: "contratacion-directa",
      version: "mvp-2",
      submittedAt: new Date().toISOString(),
      selectedPlan: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        data: plan.data,
        description: plan.description,
      },
      source: getLeadSource(),
      antiSpam: {
        formStartedAt,
        elapsedSeconds,
        honeypot: company,
      },
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
      setError(submitError instanceof Error ? submitError.message : dictionary.modal.errors.submit);
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
            <p className="mt-1 text-lg font-black text-nimbus-ink">
              {plan.price} · {plan.data}
            </p>
            <h3 className="mt-2 text-2xl font-black text-nimbus-ink">{dictionary.modal.title}</h3>
            <p className="mt-2 text-sm leading-6 text-nimbus-muted">{dictionary.modal.text}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-nimbus-line text-xl text-nimbus-muted transition hover:bg-nimbus-soft"
            aria-label={dictionary.modal.close}
          >
            ×
          </button>
        </div>

        {sent ? (
          <div className="p-6">
            <h4 className="text-xl font-black text-nimbus-ink">{dictionary.modal.sentTitle}</h4>
            <p className="mt-3 text-nimbus-muted">{dictionary.modal.sentText}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              {dictionary.modal.close}
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
                  className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${
                    choice === item.id
                      ? "border-nimbus-orange bg-orange-50 text-nimbus-ink"
                      : "border-nimbus-line text-nimbus-muted hover:border-nimbus-orange"
                  }`}
                >
                  <VisualIcon name={item.icon} className="size-4 shrink-0 text-nimbus-orange" />
                  <span>{dictionary.modal.choices[item.id]}</span>
                </button>
              ))}
            </div>

            {choice === "office" ? (
              <div className="mt-6 rounded-lg border border-nimbus-line bg-nimbus-soft p-5 text-sm leading-7 text-nimbus-muted">
                <p className="font-black text-nimbus-ink">{dictionary.modal.officeTitle}</p>
                <p>{dictionary.modal.officePhone}</p>
                <p>{dictionary.modal.officeWhatsapp}</p>
                <p className="mt-2">{dictionary.modal.officeText}</p>
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="direct-contract-company">Empresa</label>
                <input
                  id="direct-contract-company"
                  name="company"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
              <label className="text-sm font-bold text-nimbus-ink">
                {dictionary.modal.name} {requiresContact ? "" : dictionary.modal.optional}
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
                  autoComplete="name"
                />
              </label>
              <label className="text-sm font-bold text-nimbus-ink">
                {dictionary.modal.phone} {requiresContact ? "" : dictionary.modal.optional}
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
                  autoComplete="tel"
                />
              </label>
              <label className="text-sm font-bold text-nimbus-ink sm:col-span-2">
                {dictionary.modal.emailOptional}
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
                  autoComplete="email"
                />
              </label>
            </div>

            <LegalConsentCheckbox
              id="direct-contract-consent"
              checked={consent}
              onChange={setConsent}
              error={consentError}
            />

            {choice === "whatsapp" ? (
              <button
                type="button"
                onClick={openWhatsapp}
                className="mt-5 w-full rounded-full border border-nimbus-orange px-5 py-3 text-sm font-black text-nimbus-orange transition hover:bg-orange-50"
              >
                {dictionary.modal.openWhatsapp}
              </button>
            ) : null}

            {error && !consentError ? (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? dictionary.modal.submitting : dictionary.modal.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
