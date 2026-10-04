import Link from "next/link"
import { CreateProjectForm } from "@/components/console/create-project-form"

export default function NewProjectPage() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <Link
        href="/app"
        className="text-sm text-black/45 transition-colors hover:text-black"
      >
        Projects
      </Link>
      <h1 className="mt-6 text-3xl font-light tracking-tight text-black">
        New project
      </h1>
      <div className="mt-8">
        <CreateProjectForm />
      </div>
    </div>
  )
}
