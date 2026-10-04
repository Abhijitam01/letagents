"use server"

import { asc, eq } from "drizzle-orm"
import { getSessionUser } from "@/lib/auth/session"
import { getDb } from "@/lib/db"
import { environments, memberships, projects } from "@/lib/db/schema"

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function isUniqueViolation(error: unknown): boolean {
  if (!error || typeof error !== "object") return false
  if ("code" in error && error.code === "23505") return true
  if ("cause" in error) return isUniqueViolation(error.cause)
  return false
}

export async function createProject(
  formData: FormData,
): Promise<{ ok: true; projectId: string } | { ok: false; error: string }> {
  const rawName = formData.get("name")
  const name = typeof rawName === "string" ? rawName.trim() : ""
  if (name.length < 2 || name.length > 48) {
    return { ok: false, error: "Project name must be between 2 and 48 characters." }
  }

  const user = await getSessionUser()
  if (!user) return { ok: false, error: "You need to sign in." }

  const database = getDb()
  if (!database) return { ok: false, error: "Database is not configured." }

  const [membership] = await database
    .select({ organizationId: memberships.organizationId })
    .from(memberships)
    .where(eq(memberships.userId, user.id))
    .orderBy(asc(memberships.createdAt), asc(memberships.id))
    .limit(1)

  if (!membership) return { ok: false, error: "No workspace found for this account." }

  const baseSlug = slugify(name) || "project"

  for (let attempt = 0; attempt < 5; attempt++) {
    const existing = await database
      .select({ slug: projects.slug })
      .from(projects)
      .where(eq(projects.organizationId, membership.organizationId))
    const taken = new Set(existing.map((row) => row.slug))
    let slug = baseSlug
    if (taken.has(slug)) {
      let suffix = 2
      while (taken.has(`${baseSlug}-${suffix}`)) suffix += 1
      slug = `${baseSlug}-${suffix}`
    }

    const projectId = crypto.randomUUID()
    try {
      await database.transaction(async (tx) => {
        await tx.insert(projects).values({
          id: projectId,
          organizationId: membership.organizationId,
          name,
          slug,
        })
        await tx.insert(environments).values({
          id: crypto.randomUUID(),
          projectId,
          name: "Production",
          slug: "production",
        })
      })
      return { ok: true, projectId }
    } catch (error) {
      if (!isUniqueViolation(error) || attempt === 4) {
        console.error("create project failed")
        return { ok: false, error: "Could not create the project." }
      }
    }
  }

  return { ok: false, error: "Could not create the project." }
}
