import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#F5F4F0] px-6 py-20 text-[#111]">
      <div className="w-full max-w-md">{children}</div>
    </main>
  )
}
