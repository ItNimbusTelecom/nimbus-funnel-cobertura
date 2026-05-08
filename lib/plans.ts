export type MobilePlan = {
  id: string;
  name: string;
  price: string;
  data: string;
  description: string;
  features: string[];
  ctaLabel: string;
};

export const MOBILE_PLANS: MobilePlan[] = [
  {
    id: "mini-1gb",
    price: "4,95€",
    name: "MINI",
    data: "1Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 1Gb de datos.",
    features: [
      "IVA incluido",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "ilimitadas-30gb",
    price: "6,95€",
    name: "ILIMITADAS + 30Gb",
    data: "30Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 30Gb de datos.",
    features: [
      "IVA incluido",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "ilimitadas-60gb",
    price: "7,95€",
    name: "ILIMITADAS + 60Gb",
    data: "60Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 60Gb de datos.",
    features: [
      "IVA incluido",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "ilimitadas-100gb",
    price: "10,95€",
    name: "ILIMITADAS + 100Gb",
    data: "100Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 100Gb de datos.",
    features: [
      "IVA incluido",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "ilimitadas-150gb",
    price: "11,95€",
    name: "ILIMITADAS + 150Gb",
    data: "150Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 150Gb de datos.",
    features: [
      "IVA incluido",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "ilimitadas-200gb",
    price: "14,95€",
    name: "ILIMITADAS + 200Gb",
    data: "200Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 200Gb de datos.",
    features: [
      "IVA incluido",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "ilimitadas-300gb",
    price: "19,95€",
    name: "ILIMITADAS + 300Gb",
    data: "300Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 300Gb de datos.",
    features: [
      "IVA incluido",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
  {
    id: "ilimitadas-400gb",
    price: "24,95€",
    name: "ILIMITADAS + 400Gb",
    data: "400Gb",
    description: "Incluye llamadas ilimitadas a fijos y móviles nacionales. Incluye 400Gb de datos.",
    features: [
      "IVA incluido",
      "Sin permanencia",
      "Acumula gigas: los datos que no usas este mes, los tienes el siguiente.",
    ],
    ctaLabel: "Solicitar",
  },
];
