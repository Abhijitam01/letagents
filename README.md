# LetAgents

Landing page and waitlist. Agents get a calm control layer for the cloud. Visitors leave an email, and it is stored in Postgres.

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
