import type { ConsoleProject } from "@/lib/projects/types"

function formatCreatedAt(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function ProjectDetail({ project }: { project: ConsoleProject }) {
  return (
    <div className="mt-8">
      <h1 className="text-3xl font-light tracking-tight text-black">
        {project.name}
      </h1>
      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="text-black/45">Slug</dt>
          <dd className="mt-1 text-black/80">{project.slug}</dd>
        </div>
        <div>
          <dt className="text-black/45">Created</dt>
          <dd className="mt-1 text-black/80">{formatCreatedAt(project.createdAt)}</dd>
        </div>
      </dl>

      <section className="mt-10 rounded-2xl border border-black/[0.07] bg-white p-6">
        <h2 className="text-xl font-light tracking-tight text-black">
          {project.environment.name}
        </h2>
        <p className="mt-1 text-sm text-black/45">{project.environment.slug}</p>
        <p className="mt-4 text-sm leading-relaxed text-black/45">
          Deploys and logs will show up here.
        </p>
      </section>
    </div>
  )
}
