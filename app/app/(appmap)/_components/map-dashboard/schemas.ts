import { z } from "zod";

export const FormSchema = z.object({
  title: z.string().min(5, { message: "Title is required" }),
  description: z.string().min(5, { message: "Description is required" }),
});

export type TFormSchema = z.infer<typeof FormSchema>;
