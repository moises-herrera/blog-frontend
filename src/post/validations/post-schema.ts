import { z } from "zod";

/**
 * Post form schema.
 */
export const PostSchema = z.object({
  title: z.string().nonempty("El titulo es requerido"),
  image: z.any(),
  topic: z.string().nonempty("El tema es requerido"),
  description: z.string().nonempty("La descripcion es requerida"),
});

/**
 * Post form schema type.
 */
export type PostSchemaType = z.infer<typeof PostSchema>;
