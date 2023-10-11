import { authOptions } from "@/lib/auth/auth-options"
import { getServerSession } from "next-auth"
import { SignOutBtn } from "../sign-out-btn"
import { SignInBtn } from "../sign-in-btn"

export const AuthBtn = async ({ callbackUrl }: { callbackUrl: string}) => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      {session 
        ? <SignOutBtn />
        : <SignInBtn callbackUrl={callbackUrl} />}
    </div>
  )
}