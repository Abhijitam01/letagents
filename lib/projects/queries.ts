import { and, desc, eq } from "drizzle-orm"
import { getSessionUser } from "@/lib/auth/session"
import { getDb } from "@/lib/db"
import { environments, memberships, projects } from "@/lib/db/schema"
import type { ConsoleProject } from "@/lib/projects/types"

function toConsoleProject(row: {
  id: string
  name: string
  slug: string
  createdAt: Date
  environmentId: string
  environmentName: string
}): ConsoleProject {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    createdAt: row.createdAt,
    environment: {
      id: row.environmentId,
      name: row.environmentName,
      slug: "production",
    },
  }
}

function projectSelection() {
  const database = getDb()
  if (!database) return null

  return database
    .select({
      id: projects.id,
      name: projects.name,
      slug: projects.slug,
      createdAt: projects.createdAt,
      environmentId: environments.id,
      environmentName: environments.name,
    })
    .from(projects)
    .innerJoin(memberships, eq(memberships.organizationId, projects.organizationId))
    .innerJoin(
      environments,
      and(eq(environments.projectId, projects.id), eq(environments.slug, "production")),
    )
}

export async function listProjects(): Promise<ConsoleProject[]> {
  const user = await getSessionUser()
  const query = projectSelection()
  if (!user || !query) return []

  const rows = await query.where(eq(memberships.userId, user.id)).orderBy(desc(projects.createdAt))
  return rows.map(toConsoleProject)
}

export async function getProject(projectId: string): Promise<ConsoleProject | null> {
  const user = await getSessionUser()
  const query = projectSelection()
  if (!user || !query || !projectId) return null

  const rows = await query
    .where(and(eq(memberships.userId, user.id), eq(projects.id, projectId)))
    .limit(1)
  const row = rows[0]
  return row ? toConsoleProject(row) : null
}
