import { z } from "zod";

/**
 * Sign up form validation schema.
 */
export const SignUpSchema = z.object({
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
    .max(20, "La contraseña debe tener máximo 20 carácteres"),
  confirmPassword: z
    .string()
    .min(8, "La contraseña debe tener mínimo 8 carácteres")
    .max(20, "La contraseña debe tener máximo 20 carácteres"),
});

/**
 * Type of the sign up form validation schema.
 */
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
