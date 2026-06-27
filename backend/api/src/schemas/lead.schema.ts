import { z } from "zod";
import {
  AntiSpamSchema,
  LanguageSchema,
  OptionalTrimmedString,
  PreferredContactMethodSchema,
  requirePhoneOrEmail
} from "./common.js";

export const LeadSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    phone: OptionalTrimmedString,
    email: OptionalTrimmedString,
    preferredContactMethod: PreferredContactMethodSchema,
    message: OptionalTrimmedString,
    source: OptionalTrimmedString,
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
  });

export type LeadInput = z.infer<typeof LeadSchema>;
