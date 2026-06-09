import { z } from "zod";

export const PreferredContactMethodSchema = z.enum(["phone", "whatsapp", "email"]);
export const LanguageSchema = z.enum(["es", "ca", "en"]).default("es");

export const OptionalTrimmedString = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value === "" ? undefined : value));

export const MetadataSchema = z.record(z.unknown()).optional();

export function requirePhoneOrEmail<T extends { phone?: string; email?: string }>(value: T) {
  return Boolean(value.phone || value.email);
}
