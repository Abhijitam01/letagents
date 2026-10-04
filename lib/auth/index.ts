import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { eq } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { memberships, organizations, user, session, account, verification } from "@/lib/db/schema"

type Database = NonNullable<ReturnType<typeof getDb>>

function createAuth(database: Database) {
  return betterAuth({
    database: drizzleAdapter(database, {
      provider: "pg",
      schema: {
        user,
        session,
        account,
        verification,
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
    databaseHooks: {
      user: {
        create: {
          after: async (createdUser) => {
            await createPersonalOrganization({
              id: createdUser.id,
              name: createdUser.name,
              email: createdUser.email,
            })
          },
        },
      },
    },
    plugins: [nextCookies()],
  })
}

const globalForAuth = globalThis as unknown as {
  letagentsAuth?: ReturnType<typeof createAuth>
}

function organizationName(name: string, email: string) {
  const trimmedName = name.trim()
  const localPart = email.split("@")[0]?.trim() ?? ""
  const base = trimmedName || localPart || "workspace"
  if (base.toLowerCase().includes("workspace")) return base
  return `${base}'s workspace`
}

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

async function createPersonalOrganization(createdUser: { id: string; name: string; email: string }) {
  const database = getDb()
  if (!database) return

  const name = organizationName(createdUser.name, createdUser.email)
  const baseSlug = slugify(name) || "workspace"

  for (let attempt = 0; attempt < 6; attempt++) {
    const slug = attempt === 0 ? baseSlug : `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`
    const existing = await database
      .select({ id: organizations.id })
      .from(organizations)
      .where(eq(organizations.slug, slug))
      .limit(1)
    if (existing.length > 0) continue

    try {
      const organizationId = crypto.randomUUID()
      await database.transaction(async (tx) => {
        await tx.insert(organizations).values({
          id: organizationId,
          name,
          slug,
        })
        await tx.insert(memberships).values({
          id: crypto.randomUUID(),
          organizationId,
          userId: createdUser.id,
          role: "owner",
        })
      })
      return
    } catch (error) {
      if (!isUniqueViolation(error) || attempt === 5) throw error
    }
  }
}

export function getAuth() {
  if (globalForAuth.letagentsAuth) return globalForAuth.letagentsAuth

  const database = getDb()
  if (!database) return null

  globalForAuth.letagentsAuth = createAuth(database)
  return globalForAuth.letagentsAuth
}
