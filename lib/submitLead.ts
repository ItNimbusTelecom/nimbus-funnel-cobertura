"use client";

export async function submitLead(payload: unknown) {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
    console.log("[static export mock lead]", payload);
    return { ok: true, mock: true };
  }

  const response = await fetch("/api/leads/cobertura-movil", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "No hemos podido enviar la solicitud.");
  }

  return data;
}
