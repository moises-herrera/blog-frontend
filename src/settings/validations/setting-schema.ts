import { passwordPattern, usernamePattern } from "src/helpers";
import { z } from "zod";

/**
 * Settings form validation schema.
 */
export const SettingSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  username: z
    .string()
    .min(4, "El usuario debe tener mínimo 4 carácteres")
    .max(20, "El usuario debe tener máximo 20 carácteres")
    .regex(
      usernamePattern,
      "El usuario solo puede contener letras, números, guiones bajos y puntos"
    ),
  avatar: z.any(),
  email: z
    .string()
    .min(1, "El correo es requerido")
    .email("El correo no es valido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener mínimo 8 carácteres")
    .max(20, "La contraseña debe tener máximo 20 carácteres")
    .regex(
      passwordPattern,
      "La contraseña debe tener al menos una mayúscula, una minúscula y un número"
    )
    .or(z.literal("")),
});

/**
 * Type of the settings form validation schema.
 */
export type SettingSchemaType = z.infer<typeof SettingSchema>;
