import { authOptions } from "@/lib/auth/auth-options"
import { getServerSession } from "next-auth"
import { SignOutBtn } from "../sign-out-btn"
import { SignInBtn } from "../sign-in-btn"

export const AuthBtn = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      {session 
        ? <SignOutBtn />
        : <SignInBtn />}
    </div>
  )
}