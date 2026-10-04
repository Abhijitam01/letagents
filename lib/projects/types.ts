export type ConsoleEnvironment = { id: string; name: string; slug: "production" }
export type ConsoleProject = {
  id: string
  name: string
  slug: string
  createdAt: Date
  environment: ConsoleEnvironment
}
