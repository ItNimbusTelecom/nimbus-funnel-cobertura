import { beforeEach, describe, expect, it, vi } from "vitest";
import { EmailService, renderCoverageStudyEmail, renderLeadEmail } from "../src/services/EmailService.js";

describe("EmailService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.EMAIL_NOTIFICATIONS_ENABLED = "true";
    process.env.SES_REGION = "eu-west-1";
    process.env.SES_FROM_EMAIL = "Nimbus <info@nimbustelecom.es>";
    process.env.LEADS_NOTIFICATION_TO = "ventas@nimbustelecom.es";
  });

  it("renders lead email content", () => {
    const email = renderLeadEmail(
      {
        name: "Santiago",
        phone: "622812604",
        preferredContactMethod: "whatsapp",
        language: "es",
        consentAccepted: true
      },
      { requestIp: "127.0.0.1", userAgent: "vitest" },
      new Date("2026-01-01T10:00:00.000Z")
    );

    expect(email.subject).toBe("Nuevo lead desde funnel Nimbus");
    expect(email.text).toContain("Nombre: Santiago");
    expect(email.text).toContain("Fecha: 2026-01-01T10:00:00.000Z");
    expect(email.html).toContain("Santiago");
  });

  it("renders coverage study email content", () => {
    const email = renderCoverageStudyEmail(
      {
        name: "Rosa",
        email: "rosa@example.com",
        postalCode: "17410",
        preferredContactMethod: "email",
        currentProblem: "No tengo cobertura en casa",
        serviceType: "mobile",
        language: "ca",
        consentAccepted: true
      },
      undefined,
      new Date("2026-01-01T10:00:00.000Z")
    );

    expect(email.subject).toBe("Nueva solicitud de estudio de cobertura Nimbus");
    expect(email.text).toContain("Tipo: Estudio de cobertura");
    expect(email.text).toContain("Código postal: 17410");
  });

  it("sends SES email with subject and recipient", async () => {
    const send = vi.fn(async () => undefined);

    const service = new EmailService({ send });
    await service.sendLeadNotification({
      name: "Santiago",
      phone: "622812604",
      preferredContactMethod: "phone",
      language: "es",
      consentAccepted: true
    });

    expect(send).toHaveBeenCalledOnce();
    expect(send.mock.calls[0][0].input).toEqual(
      expect.objectContaining({
        FromEmailAddress: "Nimbus <info@nimbustelecom.es>",
        Destination: {
          ToAddresses: ["ventas@nimbustelecom.es"]
        },
        Content: expect.objectContaining({
          Simple: expect.objectContaining({
            Subject: {
              Data: "Nuevo lead desde funnel Nimbus",
              Charset: "UTF-8"
            }
          })
        })
      })
    );
  });
});
