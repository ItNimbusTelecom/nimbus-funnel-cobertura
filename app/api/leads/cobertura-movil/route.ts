import { NextRequest, NextResponse } from "next/server";

type LeadPayload = {
  funnel?: unknown;
  leadType?: unknown;
  selectedPlan?: unknown;
  answers?: {
    coverageProblem?: unknown;
    problemLocationType?: unknown;
    problemLocationText?: unknown;
    mobileUsage?: unknown;
    currentOperator?: unknown;
    additionalComment?: unknown;
  };
  contact?: {
    name?: unknown;
    phone?: unknown;
    email?: unknown;
    preferredContact?: unknown;
    consent?: unknown;
  };
};

const validLeadTypes = ["estudio-cobertura", "contratacion-directa"];

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as LeadPayload;
    const validationError = validatePayload(payload);

    if (validationError) {
      return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[mock lead cobertura-movil]", JSON.stringify(payload, null, 2));
        return NextResponse.json({ ok: true, mock: true });
      }

      return NextResponse.json(
        { ok: false, error: "MAKE_WEBHOOK_URL no está configurado." },
        { status: 500 },
      );
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { ok: false, error: "El webhook no ha aceptado el lead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[lead cobertura-movil error]", error);
    return NextResponse.json(
      { ok: false, error: "No se ha podido procesar la solicitud." },
      { status: 500 },
    );
  }
}

function validatePayload(payload: LeadPayload) {
  if (payload.funnel !== "cobertura-movil") {
    return "El funnel no es válido.";
  }

  if (typeof payload.leadType !== "string" || !validLeadTypes.includes(payload.leadType)) {
    return "El tipo de lead no es válido.";
  }

  if (!payload.contact || typeof payload.contact !== "object") {
    return "Faltan los datos de contacto.";
  }

  if (payload.leadType === "estudio-cobertura") {
    return validateCoverageStudy(payload);
  }

  return validateDirectContract(payload);
}

function validateCoverageStudy(payload: LeadPayload) {
  const contactError = validateContact(payload.contact, { requireName: true });
  if (contactError) {
    return contactError;
  }

  if (!payload.answers || typeof payload.answers !== "object") {
    return "Faltan las respuestas del estudio de cobertura.";
  }

  if (!isFilledString(payload.answers.coverageProblem)) {
    return "Falta el problema principal de cobertura.";
  }

  if (!isFilledString(payload.answers.problemLocationType)) {
    return "Falta dónde ocurre el problema de cobertura.";
  }

  if (!Array.isArray(payload.answers.mobileUsage) || payload.answers.mobileUsage.length === 0) {
    return "Falta el uso habitual del móvil.";
  }

  return "";
}

function validateDirectContract(payload: LeadPayload) {
  if (!payload.selectedPlan || typeof payload.selectedPlan !== "object") {
    return "Falta la opción móvil seleccionada.";
  }

  const preferredContact = payload.contact?.preferredContact;
  const isOfficeVisit = preferredContact === "oficina";
  const contactError = validateContact(payload.contact, { requireName: !isOfficeVisit });

  if (contactError) {
    return contactError;
  }

  return "";
}

function validateContact(
  contact: LeadPayload["contact"],
  options: {
    requireName: boolean;
  },
) {
  if (!contact || typeof contact !== "object") {
    return "Faltan los datos de contacto.";
  }

  if (options.requireName && !isFilledString(contact.name)) {
    return "Falta el nombre.";
  }

  if (contact.consent !== true) {
    return "Falta aceptar el contacto por parte de Nimbus Telecom.";
  }

  if (contact.preferredContact === "phone" || contact.preferredContact === "whatsapp") {
    if (!isFilledString(contact.phone)) {
      return "Falta el teléfono de contacto.";
    }
  } else if (contact.preferredContact === "email") {
    if (!isFilledString(contact.email)) {
      return "Falta el email de contacto.";
    }
  } else if (contact.preferredContact !== "oficina") {
    return "La preferencia de contacto no es válida.";
  }

  return "";
}

function isFilledString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}
