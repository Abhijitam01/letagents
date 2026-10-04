"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/client"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  async function signOut() {
    setError("")
    setPending(true)

    try {
      const { error: authError } = await authClient.signOut()
      if (authError) {
        setError(authError.message || "Could not sign out.")
        setPending(false)
        return
      }

      router.push("/sign-in")
      router.refresh()
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : ""
      setError(message || "Could not sign out.")
      setPending(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      {error ? (
        <p role="alert" className="text-xs text-red-800">
          {error}
        </p>
      ) : null}
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={pending}
        onClick={() => {
          void signOut()
        }}
        className="rounded-xl border-black/10 bg-white text-[#111] shadow-none hover:bg-[#F5F4F0]"
      >
        {pending ? "Signing out" : "Sign out"}
      </Button>
    </div>
  )
}
