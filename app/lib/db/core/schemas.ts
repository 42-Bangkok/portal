import z from "zod";

export const UserSettingSchema = z.object({
  login: z.string(),
  is_resume_public: z.boolean().default(false)
});

export type TUserSettingSchema = z.infer<typeof UserSettingSchema>;
