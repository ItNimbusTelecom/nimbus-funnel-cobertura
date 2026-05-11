"use client";

import { useI18n } from "@/lib/i18n";

const WHATSAPP_URL =
  "https://wa.me/34622812604?text=Hola%20Nimbus%2C%20tengo%20una%20duda%20sobre%20cobertura%20m%C3%B3vil.%20Si%20est%C3%A1is%20fuera%20del%20horario%20comercial%2C%20entiendo%20que%20me%20responder%C3%A9is%20en%20cuanto%20sea%20posible.";

export function FloatingContactButtons() {
  const { dictionary } = useI18n();

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dictionary.floating.whatsappAria}
      className="fixed bottom-5 right-4 z-[45] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-black text-white shadow-soft transition hover:bg-[#1FAF55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:right-6"
    >
      <WhatsappIcon />
      <span>WhatsApp</span>
    </a>
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
