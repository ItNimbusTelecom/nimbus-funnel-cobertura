import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { getConfig } from "../config/env.js";
import { CoverageStudyInput } from "../schemas/coverage-study.schema.js";
import { LeadInput } from "../schemas/lead.schema.js";
import { RequestContext } from "../utils/request-context.js";

export interface IEmailService {
  sendLeadNotification(input: LeadInput, context?: RequestContext): Promise<void>;
  sendCoverageStudyNotification(input: CoverageStudyInput, context?: RequestContext): Promise<void>;
}

export type EmailRenderResult = {
  subject: string;
  text: string;
  html: string;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(label: string, value: unknown) {
  return `${label}: ${value || "-"}\n`;
}

function htmlRow(label: string, value: unknown) {
  return `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value || "-")}</td></tr>`;
}

function renderEmail(subject: string, rows: Array<[string, unknown]>): EmailRenderResult {
  const text = rows.map(([label, value]) => row(label, value)).join("");
  const html = `<div style="font-family:Arial,sans-serif;color:#1f2937">
    <h1 style="font-size:20px">${escapeHtml(subject)}</h1>
    <table>${rows.map(([label, value]) => htmlRow(label, value)).join("")}</table>
  </div>`;

  return { subject, text, html };
}

export function renderLeadEmail(input: LeadInput, context?: RequestContext, submittedAt = new Date()) {
  return renderEmail("Nuevo lead desde funnel Nimbus", [
    ["Tipo", "Lead"],
    ["Nombre", input.name],
    ["Teléfono", input.phone],
    ["Email", input.email],
    ["Método preferido", input.preferredContactMethod],
    ["Mensaje", input.message],
    ["Idioma", input.language],
    ["Página de origen", input.pageUrl],
    ["Fecha", submittedAt.toISOString()],
    ["IP", context?.requestIp],
    ["User agent", context?.userAgent]
  ]);
}

export function renderCoverageStudyEmail(input: CoverageStudyInput, context?: RequestContext, submittedAt = new Date()) {
  return renderEmail("Nueva solicitud de estudio de cobertura Nimbus", [
    ["Tipo", "Estudio de cobertura"],
    ["Nombre", input.name],
    ["Teléfono", input.phone],
    ["Email", input.email],
    ["Dirección", input.address],
    ["Código postal", input.postalCode],
    ["Ciudad", input.city],
    ["Provincia", input.province],
    ["Problema actual", input.currentProblem],
    ["Operador actual", input.currentOperator],
    ["Tipo de servicio", input.serviceType],
    ["Método preferido", input.preferredContactMethod],
    ["Idioma", input.language],
    ["Página de origen", input.pageUrl],
    ["Fecha", submittedAt.toISOString()],
    ["IP", context?.requestIp],
    ["User agent", context?.userAgent]
  ]);
}

export class EmailService implements IEmailService {
  private readonly sesClient: Pick<SESv2Client, "send">;

  constructor(sesClient?: Pick<SESv2Client, "send">) {
    const config = getConfig();
    this.sesClient = sesClient ?? new SESv2Client(config.sesRegion ? { region: config.sesRegion } : {});
  }

  async sendLeadNotification(input: LeadInput, context?: RequestContext) {
    await this.send(renderLeadEmail(input, context));
  }

  async sendCoverageStudyNotification(input: CoverageStudyInput, context?: RequestContext) {
    await this.send(renderCoverageStudyEmail(input, context));
  }

  private async send(email: EmailRenderResult) {
    const config = getConfig();

    if (!config.emailNotificationsEnabled) return;
    if (!config.sesFromEmail || !config.leadsNotificationTo) {
      console.warn("Email notifications skipped: SES is not fully configured");
      return;
    }

    await this.sesClient.send(
      new SendEmailCommand({
        FromEmailAddress: config.sesFromEmail,
        Destination: {
          ToAddresses: config.leadsNotificationTo
            .split(",")
            .map((address) => address.trim())
            .filter(Boolean)
        },
        Content: {
          Simple: {
            Subject: {
              Data: email.subject,
              Charset: "UTF-8"
            },
            Body: {
              Text: {
                Data: email.text,
                Charset: "UTF-8"
              },
              Html: {
                Data: email.html,
                Charset: "UTF-8"
              }
            }
          }
        }
      })
    );
  }
}
