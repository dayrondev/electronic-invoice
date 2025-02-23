import { z } from "zod";

export const CreateBusinessSchema = z.object({
  logo: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Please choose a file." }),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long.",
    })
    .trim(),
  taxIdentification: z
    .string()
    .min(3, { message: "Please enter a valid nif." })
    .trim(),
  residenceType: z.string().min(1),
  street: z.string().trim(),
  postalCode: z.string().trim(),
  town: z.string().trim(),
  province: z.string().trim(),
  countryId: z.string().min(1),
});
