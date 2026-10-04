"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const fieldClassName =
  "h-11 rounded-xl border-black/10 bg-white px-3 text-[#111] shadow-none placeholder:text-black/30"

const labelClassName = "text-[11px] font-medium uppercase tracking-widest text-black/40"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setPending(true)

    try {
      const { error: authError } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/app",
      })

      if (authError) {
        setError(authError.message || "Could not sign in.")
        setPending(false)
        return
      }

      router.push("/app")
      router.refresh()
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : ""
      setError(message || "Could not sign in.")
      setPending(false)
    }
  }

  return (
    <div>
      <p className={labelClassName}>Account</p>
      <h1 className="mt-3 text-4xl font-light tracking-tight">Sign in</h1>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-5 rounded-2xl border border-black/[0.07] bg-white p-8"
      >
        <div className="space-y-2">
          <Label htmlFor="email" className={labelClassName}>
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className={labelClassName}>
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={fieldClassName}
          />
        </div>

        {error ? (
          <p role="alert" className="text-sm text-red-800">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={pending}
          className="h-11 w-full rounded-xl"
        >
          {pending ? "Signing in" : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-black/55">
        Need an account?{" "}
        <Link
          href="/sign-up"
          className="text-[#111] underline decoration-black/20 underline-offset-4 hover:decoration-black"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
