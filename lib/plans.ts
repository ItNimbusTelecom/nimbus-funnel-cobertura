export type MobilePlan = {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
  highlights: string[];
};

// Estos precios son placeholders y deben ser faciles de editar o esconder si Patricia decide no mostrar precios en esta iteracion.
export const mobilePlans: MobilePlan[] = [
  {
    id: "movil-basico",
    name: "Movil basico",
    priceLabel: "Desde 9,90 €/mes",
    description: "Para llamadas y uso sencillo.",
    highlights: ["Llamadas ilimitadas", "Uso ligero de datos", "Sin permanencia"],
  },
  {
    id: "movil-equilibrado",
    name: "Movil equilibrado",
    priceLabel: "Desde 14,90 €/mes",
    description: "Para llamadas, datos y uso diario.",
    highlights: ["Triple cobertura", "Datos para el dia a dia", "Roaming incluido"],
  },
  {
    id: "movil-intensivo",
    name: "Movil intensivo",
    priceLabel: "Desde 19,90 €/mes",
    description: "Para mas datos y uso frecuente.",
    highlights: ["Mas datos moviles", "5G compatible", "eSIM disponible"],
  },
];
