import { auth } from "@/auth";
import { ProfileSettingForm } from "./_components/profile-setting-form";
import { getProfileSettings } from "@/lib/db/core/profiles";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return <div>Access Denied</div>;
  }
  const { data: profileSetting, error } = await getProfileSettings(
    session.user.login
  );
  if (error) {
    throw new Error(error);
  }
  const profileSettingFormProps = {
    values: profileSetting!
  };
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
        Settings
      </h1>
      <ProfileSettingForm {...profileSettingFormProps} />
    </main>
  );
}
