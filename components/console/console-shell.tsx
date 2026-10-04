import type { ReactNode } from "react"
import Link from "next/link"
import type { SessionUser } from "@/lib/auth/session"
import { SignOutButton } from "@/components/console/sign-out-button"

export function ConsoleShell({
  user,
  children,
}: {
  user: SessionUser
  children: ReactNode
}) {
  return (
    <div className="min-h-svh bg-[#F5F4F0] text-[#111]">
      <header className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto flex min-h-16 max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-3">
          <Link
            href="/app"
            className="shrink-0 text-sm font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-4"
          >
            LetAgents
          </Link>
          <div className="flex min-w-0 items-center gap-4">
            <p className="truncate text-sm text-black/50">{user.email}</p>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">{children}</main>
    </div>
  )
}
