import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getSessionUser } from "@/lib/auth/session"
import { ConsoleShell } from "@/components/console/console-shell"

export const dynamic = "force-dynamic"

export default async function ConsoleLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser()

  if (!user) {
    redirect("/sign-in")
  }

  return <ConsoleShell user={user}>{children}</ConsoleShell>
}
