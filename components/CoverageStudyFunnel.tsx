"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { getElapsedSeconds } from "@/lib/antispam";
import { submitLead } from "@/lib/submitLead";
import { getLeadSource } from "@/lib/utm";
import { LegalConsentCheckbox } from "./LegalConsentCheckbox";

type PreferredContact = "phone" | "whatsapp" | "email";

const coverageProblems = [
  "No tengo cobertura en casa",
  "No tengo cobertura en el trabajo",
  "Pierdo cobertura cuando me muevo",
  "Las llamadas se cortan",
  "Los datos van lentos",
  "No estoy seguro, solo sé que me falla",
];

const locationTypes = [
  "En una localidad concreta",
  "En varias zonas",
  "En carretera o desplazándome",
  "En interiores, dentro de casa o del trabajo",
  "No lo tengo claro",
];

const usageOptions = [
  "Estoy casi siempre en casa o en el trabajo",
  "Me muevo mucho durante el día",
  "Viajo por varias zonas de Girona o Barcelona",
  "Uso mucho llamadas",
  "Uso mucho datos móviles",
  "Un poco de todo",
];

export function CoverageStudyFunnel() {
  const [step, setStep] = useState(1);
  const [coverageProblem, setCoverageProblem] = useState("");
  const [problemLocationType, setProblemLocationType] = useState("");
  const [problemLocationText, setProblemLocationText] = useState("");
  const [mobileUsage, setMobileUsage] = useState<string[]>([]);
  const [preferredContact, setPreferredContact] = useState<PreferredContact>("phone");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentOperator, setCurrentOperator] = useState("");
  const [additionalComment, setAdditionalComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => new Date().toISOString());
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const progress = completed ? 100 : Math.round((step / 5) * 100);
  const consentError = error === "Necesitamos tu aceptación para contactar contigo." ? error : undefined;

  function startIfNeeded() {
    if (step === 1 && !coverageProblem) {
      setFormStartedAt(new Date().toISOString());
      trackEvent("estudio_cobertura_started", { funnel: "cobertura-movil" });
    }
  }

  function chooseCoverageProblem(value: string) {
    startIfNeeded();
    setCoverageProblem(value);
    setError("");
    trackEvent("estudio_cobertura_step_1_answered", { answer: value });
  }

  function chooseLocationType(value: string) {
    setProblemLocationType(value);
    setError("");
    trackEvent("estudio_cobertura_step_2_answered", { answer: value });
  }

  function toggleUsage(value: string) {
    setMobileUsage((current) => {
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
      trackEvent("estudio_cobertura_step_3_answered", { answers: next });
      return next;
    });
    setError("");
  }

  function nextStep() {
    setError("");

    if (step === 1 && !coverageProblem) {
      setError("Selecciona el problema principal de cobertura.");
      return;
    }

    if (step === 2 && !problemLocationType) {
      setError("Selecciona dónde te pasa más.");
      return;
    }

    if (step === 3 && mobileUsage.length === 0) {
      setError("Selecciona al menos una forma de uso.");
      return;
    }

    if (step === 4) {
      trackEvent("estudio_cobertura_ready_for_contact", { funnel: "cobertura-movil" });
    }

    setStep((current) => Math.min(current + 1, 5));
  }

  function previousStep() {
    setError("");
    setStep((current) => Math.max(current - 1, 1));
  }

  function resetFunnel() {
    setStep(1);
    setCoverageProblem("");
    setProblemLocationType("");
    setProblemLocationText("");
    setMobileUsage([]);
    setPreferredContact("phone");
    setName("");
    setPhone("");
    setEmail("");
    setCurrentOperator("");
    setAdditionalComment("");
    setConsent(false);
    setCompany("");
    setFormStartedAt(new Date().toISOString());
    setError("");
    setCompleted(false);
  }

  function validateContact() {
    if (!name.trim()) {
      return "Indica tu nombre.";
    }
    if ((preferredContact === "phone" || preferredContact === "whatsapp") && !phone.trim()) {
      return "Indica un teléfono de contacto.";
    }
    if (preferredContact === "email" && !email.trim()) {
      return "Indica un email de contacto.";
    }
    if (!consent) {
      return "Necesitamos tu aceptación para contactar contigo.";
    }
    return "";
  }

  async function submitStudy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateContact();
    setError(validationError);

    if (validationError) {
      return;
    }

    setIsSubmitting(true);
    trackEvent("estudio_cobertura_contact_submitted", { preferred_contact: preferredContact });
    const elapsedSeconds = getElapsedSeconds(formStartedAt);

    const payload = {
      funnel: "cobertura-movil",
      leadType: "estudio-cobertura",
      version: "mvp-2",
      submittedAt: new Date().toISOString(),
      source: getLeadSource(),
      antiSpam: {
        formStartedAt,
        elapsedSeconds,
        honeypot: company,
      },
      answers: {
        coverageProblem,
        problemLocationType,
        problemLocationText,
        mobileUsage,
        currentOperator,
        additionalComment,
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
      await submitLead(payload);
      trackEvent("estudio_cobertura_completed", { preferred_contact: preferredContact });
      setCompleted(true);
    } catch (submitError) {
      trackEvent("estudio_cobertura_submit_error", { preferred_contact: preferredContact });
      setError(submitError instanceof Error ? submitError.message : "No hemos podido enviar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="formulario" className="scroll-mt-24 bg-nimbus-soft py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">Estudio de cobertura</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            ¿Quieres que estudiemos tu caso de cobertura?
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">
            Si tienes problemas de cobertura, cuéntanos dónde te pasa y cómo usas el móvil. Revisaremos tu caso y te
            contactaremos con una recomendación personalizada.
          </p>
          <div className="mt-7 rounded-lg border border-nimbus-line bg-white p-5 text-sm leading-7 text-nimbus-muted">
            <p className="font-black text-nimbus-ink">Sin rodeos comerciales</p>
            <p>Nos centramos en entender dónde falla la cobertura y qué opciones tienen más sentido.</p>
          </div>
        </div>

        <div className="rounded-lg border border-nimbus-line bg-white p-6 shadow-soft">
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm font-bold text-nimbus-muted">
              <span>{completed ? "Completado" : `Paso ${step} de 5`}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-nimbus-soft">
              <div className="h-full rounded-full bg-nimbus-orange transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {completed ? (
            <div>
              <h3 className="text-2xl font-black text-nimbus-ink">Solicitud recibida</h3>
              <p className="mt-3 leading-7 text-nimbus-muted">
                Gracias. Revisaremos tu caso de cobertura y te enviaremos una propuesta personalizada según lo que nos
                has contado.
              </p>
              <dl className="mt-6 grid gap-3 rounded-lg bg-nimbus-soft p-5 text-sm">
                <SummaryItem label="Problema principal" value={coverageProblem} />
                <SummaryItem label="Dónde te pasa más" value={problemLocationType} />
                <SummaryItem label="Zona indicada" value={problemLocationText || "No indicada"} />
                <SummaryItem label="Preferencia de contacto" value={preferredContactLabel(preferredContact)} />
                {currentOperator ? <SummaryItem label="Operador actual" value={currentOperator} /> : null}
              </dl>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetFunnel}
                  className="rounded-full border border-nimbus-line px-5 py-3 text-sm font-black text-nimbus-ink transition hover:bg-nimbus-soft"
                >
                  Hacer otra consulta
                </button>
                <a
                  href="#tarifas"
                  className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                >
                  Ver opciones móviles
                </a>
              </div>
            </div>
          ) : (
            <>
              {step === 1 ? (
                <QuestionStep title="¿Qué problema de cobertura tienes?">
                  <SingleChoice options={coverageProblems} value={coverageProblem} onChange={chooseCoverageProblem} />
                </QuestionStep>
              ) : null}

              {step === 2 ? (
                <QuestionStep title="¿Dónde te pasa más?">
                  <SingleChoice options={locationTypes} value={problemLocationType} onChange={chooseLocationType} />
                  <label className="mt-5 block text-sm font-bold text-nimbus-ink">
                    Localidad, zona o lugares donde te falla
                    <textarea
                      value={problemLocationText}
                      onChange={(event) => setProblemLocationText(event.target.value)}
                      placeholder="Ejemplo: Sils, Vidreres, carretera hacia Girona, dentro de casa, etc."
                      className="mt-2 min-h-28 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
                    />
                  </label>
                </QuestionStep>
              ) : null}

              {step === 3 ? (
                <QuestionStep title="¿Cómo usas normalmente el móvil?">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {usageOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleUsage(option)}
                        className={`rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${
                          mobileUsage.includes(option)
                            ? "border-nimbus-orange bg-orange-50 text-nimbus-ink"
                            : "border-nimbus-line text-nimbus-muted hover:border-nimbus-orange"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </QuestionStep>
              ) : null}

              {step === 4 ? (
                <QuestionStep title="Ya tenemos una primera idea de tu caso">
                  <p className="text-lg leading-8 text-nimbus-muted">
                    Con lo que nos has contado podemos revisar mejor qué puede estar pasando y qué opción móvil puede
                    tener más sentido para ti.
                  </p>
                  <p className="mt-4 text-sm leading-6 text-nimbus-muted">
                    Para enviarte el resultado del estudio o comentarlo contigo, necesitamos tus datos de contacto.
                  </p>
                </QuestionStep>
              ) : null}

              {step === 5 ? (
                <form id="coverage-study-contact" onSubmit={submitStudy}>
                  <QuestionStep title="¿Dónde te enviamos el resultado del estudio?">
                    <p className="mb-5 text-sm leading-6 text-nimbus-muted">
                      Te contactaremos solo para revisar tu caso de cobertura y orientarte sobre la opción que mejor
                      encaje contigo.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {(["phone", "whatsapp", "email"] as PreferredContact[]).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setPreferredContact(option)}
                          className={`rounded-lg border px-4 py-3 text-left text-sm font-black transition ${
                            preferredContact === option
                              ? "border-nimbus-orange bg-orange-50 text-nimbus-ink"
                              : "border-nimbus-line text-nimbus-muted hover:border-nimbus-orange"
                          }`}
                        >
                          {preferredContactLabel(option)}
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                        <label htmlFor="coverage-study-company">Empresa</label>
                        <input
                          id="coverage-study-company"
                          name="company"
                          value={company}
                          onChange={(event) => setCompany(event.target.value)}
                          autoComplete="off"
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                      </div>
                      <Field label="Nombre" value={name} onChange={setName} autoComplete="name" required />
                      <Field
                        label={preferredContact === "email" ? "Teléfono opcional" : "Teléfono"}
                        value={phone}
                        onChange={setPhone}
                        autoComplete="tel"
                        required={preferredContact !== "email"}
                      />
                      <Field
                        label={preferredContact === "email" ? "Email" : "Email opcional"}
                        value={email}
                        onChange={setEmail}
                        autoComplete="email"
                        required={preferredContact === "email"}
                      />
                      <Field
                        label="Operador actual opcional"
                        value={currentOperator}
                        onChange={setCurrentOperator}
                        autoComplete="organization"
                      />
                    </div>

                    <label className="mt-4 block text-sm font-bold text-nimbus-ink">
                      Comentario adicional opcional
                      <textarea
                        value={additionalComment}
                        onChange={(event) => setAdditionalComment(event.target.value)}
                        className="mt-2 min-h-24 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
                      />
                    </label>

                    <LegalConsentCheckbox
                      id="coverage-study-consent"
                      checked={consent}
                      onChange={setConsent}
                      error={consentError}
                    />
                  </QuestionStep>
                </form>
              ) : null}

              {error && !consentError ? (
                <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>
              ) : null}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={previousStep}
                  disabled={step === 1 || isSubmitting}
                  className="rounded-full border border-nimbus-line px-5 py-3 text-sm font-black text-nimbus-ink transition hover:bg-nimbus-soft disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Atrás
                </button>
                {step === 5 ? (
                  <button
                    type="submit"
                    form="coverage-study-contact"
                    disabled={isSubmitting}
                    className="rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar solicitud de estudio"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-full bg-nimbus-orange px-5 py-3 text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
                  >
                    {step === 4 ? "Quiero mi estudio de cobertura" : "Continuar"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function QuestionStep({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-2xl font-black tracking-tight text-nimbus-ink">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function SingleChoice({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${
            value === option
              ? "border-nimbus-orange bg-orange-50 text-nimbus-ink"
              : "border-nimbus-line text-nimbus-muted hover:border-nimbus-orange"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  autoComplete,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm font-bold text-nimbus-ink">
      {label}
      {required ? "" : ""}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-nimbus-line px-4 py-3 font-normal text-nimbus-ink"
        autoComplete={autoComplete}
      />
    </label>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
      <dt className="font-black text-nimbus-ink">{label}</dt>
      <dd className="text-nimbus-muted">{value}</dd>
    </div>
  );
}

function preferredContactLabel(value: PreferredContact) {
  if (value === "phone") {
    return "Teléfono";
  }
  if (value === "whatsapp") {
    return "WhatsApp";
  }
  return "Email";
}
