"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { TProfileSettingFormSchema, profileSettingFormSchema } from "./schema";
import { IProfileSettingForm } from "./types";
import { putProfileSettings } from "@/lib/db/core/profiles";
import { toast } from "sonner";

export const ProfileSettingForm = (props: IProfileSettingForm) => {
  const onSubmit = async (values: TProfileSettingFormSchema) => {
    const { data, error } = await putProfileSettings(values);
    if (data) {
      toast.success("Profile settings updated");
    } else if (error) {
      toast.error(error);
    }
  };
  return (
    <AutoForm
      formSchema={profileSettingFormSchema}
      values={props.values}
      onSubmit={onSubmit}
      fieldConfig={{
        is_resume_public: {
          fieldType: "switch",
          description: "Allow others to see your resume"
        }
      }}
    >
      <AutoFormSubmit>Submit</AutoFormSubmit>
    </AutoForm>
  );
};
