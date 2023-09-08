import { passwordPattern } from "src/helpers";
import { z } from "zod";

/**
 * Settings form validation schema.
 */
export const SettingSchema = z.object({
  firstName: z.string().nonempty("El nombre es requerido"),
  lastName: z.string().nonempty("El apellido es requerido"),
  username: z.string().nonempty("El usuario es requerido"),
  avatar: z.any(),
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
    )
    .or(z.literal("")),
});

/**
 * Type of the settings form validation schema.
 */
export type SettingSchemaType = z.infer<typeof SettingSchema>;
