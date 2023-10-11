import { AuthBtn } from "@/components/btns/auth-btn"
import { authOptions } from "@/lib/auth/auth-options"
import { getServerSession } from "next-auth"


export default async function Page() {
  const session = await getServerSession(authOptions)
  return (
    <AuthBtn />
  )
}
