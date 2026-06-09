import { randomUUID } from "node:crypto";
import { LeadInput } from "../schemas/lead.schema.js";
import { RequestContext } from "../utils/request-context.js";
import { IEmailService } from "./EmailService.js";
import { IFunnelRepository } from "../repositories/FunnelRepository.js";
import { IRecaptchaService } from "./RecaptchaService.js";

export class LeadService {
  constructor(
    private readonly repository: IFunnelRepository,
    private readonly emailService: IEmailService,
    private readonly recaptchaService: IRecaptchaService
  ) {}

  async create(input: LeadInput, context?: RequestContext) {
    await this.recaptchaService.verify(input.recaptchaToken);

    const item = await this.repository.create({
      id: randomUUID(),
      entityType: "lead",
      status: "new",
      language: input.language,
      pageUrl: input.pageUrl,
      payload: input,
      requestContext: context
    });

    try {
      await this.emailService.sendLeadNotification(input, context);
    } catch (error) {
      console.error("Lead notification email failed", { id: item.id, error });
    }

    return { id: item.id, status: item.status };
  }
}
