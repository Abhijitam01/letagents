import Link from "next/link"
import type { ConsoleProject } from "@/lib/projects/types"
import { Button } from "@/components/ui/button"

export function NewProjectLink() {
  return (
    <Button asChild className="h-10 rounded-xl px-4">
      <Link href="/app/projects/new">New project</Link>
    </Button>
  )
}

function formatCreatedAt(createdAt: Date) {
  return new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function ProjectList({ projects }: { projects: ConsoleProject[] }) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-black/[0.07] bg-white px-8 py-16 text-center">
        <p className="text-sm leading-relaxed text-black/60">
          This workspace has no projects yet.
        </p>
        <div className="mt-6 flex justify-center">
          <NewProjectLink />
        </div>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {projects.map((project) => (
        <li key={project.id}>
          <Link
            href={`/app/projects/${project.id}`}
            className="block rounded-2xl border border-black/[0.07] bg-white px-6 py-5 transition-colors hover:border-black/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F4F0]"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <p className="truncate text-lg font-light tracking-tight">{project.name}</p>
                <p className="mt-1 truncate text-sm text-black/45">{project.slug}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[11px] uppercase tracking-widest text-black/40">Production</p>
                <p className="mt-2 text-sm text-black/45">{formatCreatedAt(project.createdAt)}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
