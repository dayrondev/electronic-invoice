import { z } from "zod";

export const CreateBusinessSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long.",
    })
    .trim(),
  cif: z.string().min(3, { message: "Please enter a valid email." }).trim(),
  residenceType: z.string().min(1),
});
