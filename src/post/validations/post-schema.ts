import { z } from "zod";

/**
 * Post form schema.
 */
export const PostSchema = z.object({
  title: z.string().nonempty("El titulo es requerido"),
  files: z.any(),
  topic: z.string().nonempty("El tema es requerido"),
  description: z
    .string()
    .nonempty("La descripcion es requerida")
    .max(1000, "La descripcion debe tener menos de 1000 caracteres"),
  isAnonymous: z.boolean(),
});

/**
 * Post form schema type.
 */
export type PostSchemaType = z.infer<typeof PostSchema>;
