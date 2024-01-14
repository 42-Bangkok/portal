import * as z from "zod";

export const profileSettingFormSchema = z.object({
  is_resume_public: z
    .boolean()
    .default(false)
    .optional()
    .describe("Set resume public"),
});

export type TProfileSettingFormSchema = z.infer<
  typeof profileSettingFormSchema
>;
