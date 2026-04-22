import { z } from "zod";

export const linkSchema = z.object({
  original_url: z.url("Informe uma URL válida"),
  alias: z
    .string()
    .min(1, "Informe o link encurtado")
    .regex(/^[a-zA-Z0-9_-]+$/, "Use apenas letras, números, - ou _"),
});

export type LinkFormData = z.infer<typeof linkSchema>;
