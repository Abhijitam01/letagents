"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { createProject } from "@/lib/projects/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CreateProjectForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setPending(true)
    setError(null)

    const result = await createProject(formData)
    if (result.ok) {
      router.push(`/app/projects/${result.projectId}`)
      router.refresh()
      return
    }

    setError(result.error)
    setPending(false)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-black/[0.07] bg-white p-6"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="off"
          autoFocus
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "name-error" : undefined}
          className="rounded-xl"
        />
        {error ? (
          <p id="name-error" role="alert" className="text-sm text-red-800">
            {error}
          </p>
        ) : null}
      </div>
      <Button type="submit" disabled={pending} className="mt-6 rounded-xl">
        {pending ? "Creating" : "Create project"}
      </Button>
    </form>
  )
}
