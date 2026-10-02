'use server'

import { db } from "@/lib/db"
import { waitlistSignups } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const emailSchema = z.string().trim().email().max(254)

export async function joinWaitlist(email: string) {
  const parsedEmail = emailSchema.safeParse(email)
  if (!parsedEmail.success) return { ok: false, message: "Enter a valid email address." }

  const normalizedEmail = parsedEmail.data.toLowerCase()
  const existing = await db.select({ id: waitlistSignups.id }).from(waitlistSignups).where(eq(waitlistSignups.email, normalizedEmail)).limit(1)

  if (existing.length > 0) return { ok: true, message: "You're already on the list." }

  await db.insert(waitlistSignups).values({ email: normalizedEmail })
  return { ok: true, message: "You're on the list. We'll be in touch." }
}
