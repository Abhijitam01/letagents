# Brancd

Brancd is the cloud layer for agent-operated software. It gives coding agents a calm way to provision, deploy, observe, debug, and operate real infrastructure — without handing them an unbounded cloud console.

This repository is the Brancd landing page and waitlist. Visitors leave an email, and it is stored in Postgres.

## What Brancd is

- **Agent-operated infrastructure.** Agents deploy applications, create environments, read logs, manage configuration, and troubleshoot from one layer.
- **Observability.** Every decision, tool call, and cloud action stays in an execution history agents and people can inspect.
- **Memory and context.** Sessions keep long-term context so agents do not start from zero each time.
- **Guardrails.** Scoped permissions, human approval for dangerous operations, and an audit trail of what the agent did.

The public site walks from a prompt to running software: define the agent, compose the workflow, test it in a sandbox, then deploy.

## Setup

1. Install dependencies with `pnpm install`.
2. Copy the environment file: `cp .env.example .env`.
3. Set `DATABASE_URL` to a Postgres connection string.
4. Create the table: `pnpm db:push`.
5. Start the app: `pnpm dev`.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes, for signups | Postgres connection string |
| `NEXT_PUBLIC_SITE_URL` | No | Public URL for metadata, sitemap, and robots. Defaults to `https://letagents.dev` |

## Deploy

Set the same variables on the host, then run `pnpm db:push` once against that database before accepting signups. The app builds without a database. The form returns a clear error until `DATABASE_URL` is set and the table exists.
