import { z } from "zod";

/**
 * Forgot password schema.
 */
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("El email es requerido")
    .email("El email no es válido"),
});

/**
 * Forgot password schema type.
 */
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
