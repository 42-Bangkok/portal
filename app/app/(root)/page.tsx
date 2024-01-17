import { auth } from "@/auth";
import { AuthBtn } from "@/components/btns/auth-btn";

export default async function Page() {
  const session = await auth();
  if (!session)
    return (
      <div className="h-screen flex items-center">
        <div className="container mx-auto h-3/4">
          <div className="flex justify-center">
            <AuthBtn callbackUrl="/" />
          </div>
        </div>
      </div>
    );
  return (
    <div className="h-screen flex items-center">
      <div className="container mx-auto h-3/4">
        <p className="text-center">
          Hello, {session.user.name} select an App to get started.
        </p>
      </div>
    </div>
  );
}
