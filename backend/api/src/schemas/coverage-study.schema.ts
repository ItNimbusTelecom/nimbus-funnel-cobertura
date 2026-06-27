import { z } from "zod";
import {
  AntiSpamSchema,
  LanguageSchema,
  OptionalTrimmedString,
  PreferredContactMethodSchema,
  requirePhoneOrEmail
} from "./common.js";

export const ServiceTypeSchema = z.enum(["mobile", "fiber", "internet", "business", "unknown"]);

export const CoverageStudySchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    phone: OptionalTrimmedString,
    email: OptionalTrimmedString,
    address: OptionalTrimmedString,
    postalCode: OptionalTrimmedString,
    city: OptionalTrimmedString,
    province: OptionalTrimmedString,
    preferredContactMethod: PreferredContactMethodSchema,
    currentProblem: z.string().trim().min(1, "Current problem is required"),
    currentOperator: OptionalTrimmedString,
    serviceType: ServiceTypeSchema,
    language: LanguageSchema,
    pageUrl: OptionalTrimmedString,
    antiSpam: AntiSpamSchema,
    consentAccepted: z.literal(true, {
      errorMap: () => ({ message: "Consent must be accepted" })
    }),
    recaptchaToken: OptionalTrimmedString
  })
  .refine(requirePhoneOrEmail, {
    message: "Phone or email is required",
    path: ["phone"]
  })
  .refine((value) => Boolean(value.address || value.postalCode), {
    message: "Address or postal code is required",
    path: ["address"]
  });

export type CoverageStudyInput = z.infer<typeof CoverageStudySchema>;
