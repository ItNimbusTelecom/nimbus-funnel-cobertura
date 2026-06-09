import { randomUUID } from "node:crypto";
import { IFunnelRepository } from "../repositories/FunnelRepository.js";
import { CoverageStudyInput } from "../schemas/coverage-study.schema.js";
import { RequestContext } from "../utils/request-context.js";
import { IEmailService } from "./EmailService.js";
import { IRecaptchaService } from "./RecaptchaService.js";

export class CoverageStudyService {
  constructor(
    private readonly repository: IFunnelRepository,
    private readonly emailService: IEmailService,
    private readonly recaptchaService: IRecaptchaService
  ) {}

  async create(input: CoverageStudyInput, context?: RequestContext) {
    await this.recaptchaService.verify(input.recaptchaToken);

    const item = await this.repository.create({
      id: randomUUID(),
      entityType: "coverage-study",
      status: "new",
      language: input.language,
      pageUrl: input.pageUrl,
      payload: input,
      requestContext: context
    });

    try {
      await this.emailService.sendCoverageStudyNotification(input, context);
    } catch (error) {
      console.error("Coverage study notification email failed", { id: item.id, error });
    }

    return { id: item.id, status: item.status };
  }
}
