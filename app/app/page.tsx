import { AuthBtn } from "@/components/btns/auth-btn"
import { authOptions } from "@/lib/auth/auth-options"
import { getServerSession } from "next-auth"


export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) return (
    <div className="h-screen flex items-center">
      <div className="container mx-auto h-3/4">
        <div className="flex justify-center">
        <AuthBtn callbackUrl="/" />
        </div>
      </div>
    </div>
  )
  return (
    <div className="h-screen flex items-center">
      <div className="container mx-auto h-3/4">
        <p className="text-center">
          Hello, {session.user.name} select an App to get started.
        </p>
      </div>
    </div>
  )
}
