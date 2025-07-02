import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  image: z.string().url().optional(),
  price: z.number().nonnegative(),
  category: z.string().optional(),
});
