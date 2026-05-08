"use client";

import { useEffect, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/34622812604?text=Hola%20Nimbus%2C%20tengo%20una%20duda%20sobre%20cobertura%20m%C3%B3vil.%20Si%20est%C3%A1is%20fuera%20del%20horario%20comercial%2C%20entiendo%20que%20me%20responder%C3%A9is%20en%20cuanto%20sea%20posible.";

export function FloatingContactButtons() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  useEffect(() => {
    if (!isAssistantOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsAssistantOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isAssistantOpen]);

  return (
    <>
      {isAssistantOpen ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="assistant-title"
          className="fixed bottom-24 left-4 z-[45] w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-nimbus-line bg-white p-5 shadow-soft sm:left-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">IA</p>
              <h2 id="assistant-title" className="mt-1 text-xl font-black text-nimbus-ink">
                Asistente Nimbus
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsAssistantOpen(false)}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-nimbus-line text-xl text-nimbus-muted transition hover:bg-nimbus-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange"
              aria-label="Cerrar asistente Nimbus"
            >
              ×
            </button>
          </div>

          <p className="mt-4 leading-7 text-nimbus-muted">
            Nuestro asistente puede ayudarte con dudas rápidas sobre cobertura móvil, tarifas y cómo funciona el estudio
            de cobertura.
          </p>
          <p className="mt-3 rounded-lg bg-nimbus-soft p-4 text-sm font-bold leading-6 text-nimbus-ink">
            El asistente IA estará disponible próximamente. Mientras tanto, puedes usar WhatsApp o solicitar un estudio
            de cobertura.
          </p>

          <div className="mt-5 grid gap-3">
            <a
              href="#formulario"
              onClick={() => setIsAssistantOpen(false)}
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange"
            >
              Pedir estudio de cobertura
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-nimbus-line px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange"
            >
              Escribir por WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setIsAssistantOpen(false)}
              className="rounded-full px-5 py-3 text-sm font-black text-nimbus-muted transition hover:bg-nimbus-soft hover:text-nimbus-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange"
            >
              Cerrar
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsAssistantOpen(true)}
        aria-label="Abrir asistente Nimbus"
        className="fixed bottom-5 left-4 z-[45] inline-flex items-center gap-2 rounded-full border border-nimbus-line bg-white px-4 py-3 text-sm font-black text-nimbus-ink shadow-soft transition hover:border-nimbus-orange hover:text-nimbus-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange sm:left-6"
      >
        <BotIcon />
        <span>IA</span>
      </button>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir a Nimbus por WhatsApp"
        className="fixed bottom-5 right-4 z-[45] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-black text-white shadow-soft transition hover:bg-[#1FAF55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:right-6"
      >
        <WhatsappIcon />
        <span>WhatsApp</span>
      </a>
    </>
  );
}

function BotIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4V2M8 4h8a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M9 10h.01M15 10h.01M9 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M5.6 18.4A8.5 8.5 0 1 1 12 21a8.4 8.4 0 0 1-3.9-.95L4 21l.95-4.05A8.4 8.4 0 0 1 5.6 18.4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.7c.2-.4.35-.45.65-.45h.5c.2 0 .45.05.6.45l.6 1.4c.1.3.05.5-.15.7l-.35.4c.55 1 1.35 1.8 2.45 2.35l.45-.35c.2-.2.45-.25.7-.15l1.45.65c.35.15.4.4.4.6v.45c0 .35-.1.55-.45.75-.45.25-1.1.4-1.75.25-2.65-.6-5.15-3-5.9-5.65-.2-.65 0-1.35.3-1.9Z"
        fill="currentColor"
      />
    </svg>
  );
}
