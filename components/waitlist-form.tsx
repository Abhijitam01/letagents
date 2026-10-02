"use client"

import { useId, useState } from "react"
import { joinWaitlist } from "@/app/actions/waitlist"

export function WaitlistForm({ idPrefix = "waitlist" }: { idPrefix?: string }) {
  const reactId = useId()
  const fieldId = `${idPrefix}-email-${reactId}`
  const hintId = `${idPrefix}-hint-${reactId}`
  const statusId = `${idPrefix}-status-${reactId}`
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (submitted) {
    return (
      <div className="inline-flex max-w-md items-center gap-2 rounded-xl border border-emerald-700/20 bg-emerald-50 px-4 py-3 text-sm text-emerald-900" role="status">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
        {statusMessage || "You're on the list. We'll be in touch."}
      </div>
    )
  }

  return (
    <form
      className="w-full max-w-md"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault()
        const nextEmail = email.trim()
        if (!nextEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
          setStatusMessage("Enter a valid email address.")
          return
        }
        setIsSubmitting(true)
        setStatusMessage("")
        const result = await joinWaitlist(nextEmail)
        setStatusMessage(result.message)
        setSubmitted(result.ok)
        setIsSubmitting(false)
      }}
    >
      <label htmlFor={fieldId} className="block text-sm font-medium text-foreground">
        Email
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id={fieldId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          maxLength={254}
          placeholder="you@example.com"
          value={email}
          aria-invalid={statusMessage ? true : undefined}
          aria-describedby={statusMessage ? `${hintId} ${statusId}` : hintId}
          onChange={(event) => {
            setEmail(event.target.value)
            if (statusMessage) setStatusMessage("")
          }}
          className="h-12 min-w-0 flex-1 rounded-xl border border-foreground/15 bg-white px-4 text-base text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="h-12 shrink-0 rounded-xl bg-foreground px-6 text-sm font-medium tracking-wide text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? "Sending" : "Submit"}
        </button>
      </div>
      <p id={hintId} className="mt-2 text-xs leading-relaxed text-foreground/65">
        Required. We'll write when a seat opens.
      </p>
      {statusMessage ? (
        <p id={statusId} role="alert" className="mt-2 text-sm text-red-800">
          {statusMessage}
        </p>
      ) : null}
    </form>
  )
}
