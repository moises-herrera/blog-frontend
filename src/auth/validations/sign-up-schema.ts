import { passwordPattern } from "src/helpers";
import { z } from "zod";

/**
 * Sign up form validation schema.
 */
export const SignUpSchema = z
  .object({
    firstName: z.string().nonempty("El nombre es requerido"),
    lastName: z.string().nonempty("El apellido es requerido"),
    username: z.string().nonempty("El usuario es requerido"),
    email: z
      .string()
      .nonempty("El correo es requerido")
      .email("El correo no es valido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 carácteres")
      .max(20, "La contraseña debe tener máximo 20 carácteres")
      .regex(
        passwordPattern,
        "La contraseña debe tener al menos una mayúscula, una minúscula y un número"
      ),
    confirmPassword: z.string().nonempty("La confirmación es requerida"),
  })
  .superRefine(({ password, confirmPassword }, context) => {
    if (password !== confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Las contraseñas no coinciden",
      });
    }
  });

/**
 * Type of the sign up form validation schema.
 */
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
