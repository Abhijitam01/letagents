import { headers } from "next/headers"
import { getAuth } from "@/lib/auth"

export type SessionUser = { id: string; name: string; email: string }

export async function getSessionUser(): Promise<SessionUser | null> {
  const auth = getAuth()
  if (!auth) return null

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const currentUser = session?.user
    if (!currentUser?.id || !currentUser.email) return null
    return {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
    }
  } catch {
    return null
  }
}
