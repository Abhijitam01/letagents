import { listProjects } from "@/lib/projects/queries"
import { NewProjectLink, ProjectList } from "@/components/console/project-list"

export const dynamic = "force-dynamic"

export default async function ProjectsPage() {
  const projects = await listProjects()

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-4xl font-light tracking-tight">Projects</h1>
        <NewProjectLink />
      </div>
      <div className="mt-12">
        <ProjectList projects={projects} />
      </div>
    </div>
  )
}
