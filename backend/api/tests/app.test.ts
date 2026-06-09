import { describe, expect, it, vi } from "vitest";
import serverless from "serverless-http";
import { createApp } from "../src/app.js";
import { mapRecordToItem, IFunnelRepository } from "../src/repositories/FunnelRepository.js";
import { IEmailService } from "../src/services/EmailService.js";
import { IRecaptchaService } from "../src/services/RecaptchaService.js";

function createTestApp(options?: { emailThrows?: boolean }) {
  const repository: IFunnelRepository = {
    async create(record) {
      return mapRecordToItem(record, new Date("2026-01-01T10:00:00.000Z"));
    }
  };

  const emailService: IEmailService = {
    sendLeadNotification: vi.fn(async () => {
      if (options?.emailThrows) throw new Error("SES failed");
    }),
    sendCoverageStudyNotification: vi.fn(async () => {
      if (options?.emailThrows) throw new Error("SES failed");
    })
  };

  const recaptchaService: IRecaptchaService = {
    verify: vi.fn(async () => undefined)
  };

  return createApp({ repository, emailService, recaptchaService });
}

async function invoke(app: ReturnType<typeof createTestApp>, method: string, path: string, body?: unknown) {
  const handler = serverless(app);
  const response = await handler(
    {
      httpMethod: method,
      path,
      headers: {
        "content-type": "application/json",
        "user-agent": "vitest"
      },
      multiValueHeaders: {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: null,
      stageVariables: null,
      requestContext: {
        identity: {
          sourceIp: "127.0.0.1"
        }
      },
      body: body === undefined ? null : JSON.stringify(body),
      isBase64Encoded: false,
      resource: path
    } as never,
    {} as never
  );

  return {
    status: response.statusCode,
    body: JSON.parse(response.body)
  };
}

describe("Nimbus funnel API", () => {
  it("returns health status", async () => {
    const response = await invoke(createTestApp(), "GET", "/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ok: true,
      data: {
        status: "ok",
        service: "nimbus-funnel-api"
      }
    });
  });

  it("accepts a valid lead with phone", async () => {
    const response = await invoke(createTestApp(), "POST", "/leads", {
      name: "Patricia",
      phone: "972850155",
      preferredContactMethod: "phone",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
    expect(response.body.data.status).toBe("new");
  });

  it("accepts a valid lead with email", async () => {
    const response = await invoke(createTestApp(), "POST", "/leads", {
      name: "Patricia",
      email: "info@nimbustelecom.es",
      preferredContactMethod: "email",
      language: "ca",
      consentAccepted: true
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
  });

  it("rejects a lead without phone or email", async () => {
    const response = await invoke(createTestApp(), "POST", "/leads", {
      name: "Patricia",
      preferredContactMethod: "phone",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects a lead without consent", async () => {
    const response = await invoke(createTestApp(), "POST", "/leads", {
      name: "Patricia",
      phone: "972850155",
      preferredContactMethod: "phone",
      language: "es",
      consentAccepted: false
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("accepts a coverage study with address", async () => {
    const response = await invoke(createTestApp(), "POST", "/coverage-study", {
      name: "Patricia",
      phone: "972850155",
      address: "C/Major, 42",
      preferredContactMethod: "whatsapp",
      currentProblem: "No tengo cobertura en casa",
      serviceType: "mobile",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
  });

  it("accepts a coverage study with postal code", async () => {
    const response = await invoke(createTestApp(), "POST", "/coverage-study", {
      name: "Patricia",
      email: "info@nimbustelecom.es",
      postalCode: "17410",
      preferredContactMethod: "email",
      currentProblem: "Los datos van lentos",
      serviceType: "mobile",
      language: "en",
      consentAccepted: true
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
  });

  it("rejects a coverage study without phone or email", async () => {
    const response = await invoke(createTestApp(), "POST", "/coverage-study", {
      name: "Patricia",
      postalCode: "17410",
      preferredContactMethod: "email",
      currentProblem: "Los datos van lentos",
      serviceType: "mobile",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects a coverage study without address or postal code", async () => {
    const response = await invoke(createTestApp(), "POST", "/coverage-study", {
      name: "Patricia",
      phone: "972850155",
      preferredContactMethod: "phone",
      currentProblem: "Los datos van lentos",
      serviceType: "mobile",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects a coverage study without consent", async () => {
    const response = await invoke(createTestApp(), "POST", "/coverage-study", {
      name: "Patricia",
      phone: "972850155",
      postalCode: "17410",
      preferredContactMethod: "phone",
      currentProblem: "Los datos van lentos",
      serviceType: "mobile",
      language: "es",
      consentAccepted: false
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("accepts a valid contact intent", async () => {
    const response = await invoke(createTestApp(), "POST", "/contact-intent", {
      type: "whatsapp_click",
      label: "Footer WhatsApp",
      language: "es",
      metadata: { placement: "footer" }
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
  });

  it("rejects an invalid contact intent type", async () => {
    const response = await invoke(createTestApp(), "POST", "/contact-intent", {
      type: "bad_type",
      language: "es"
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("keeps the lead flow successful if email notification fails", async () => {
    const response = await invoke(createTestApp({ emailThrows: true }), "POST", "/leads", {
      name: "Patricia",
      phone: "972850155",
      preferredContactMethod: "phone",
      language: "es",
      consentAccepted: true
    });

    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
  });
});
