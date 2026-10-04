import Link from "next/link"
import { getProject } from "@/lib/projects/queries"
import { ProjectDetail } from "@/components/console/project-detail"

export const dynamic = "force-dynamic"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const project = await getProject(projectId)

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Link
        href="/app"
        className="text-sm text-black/45 transition-colors hover:text-black"
      >
        Projects
      </Link>
      {project ? (
        <ProjectDetail project={project} />
      ) : (
        <div className="mt-8">
          <h1 className="text-2xl font-light tracking-tight text-black">
            Project not found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-black/45">
            This project is not available.
          </p>
        </div>
      )}
    </div>
  )
}
