import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";

/**
 * One switch, chosen by the shape of DATABASE_URI.
 *
 * Local development uses a SQLite file, so the CMS runs with no services to
 * install. Hosting is a different matter: on Netlify or Vercel the
 * filesystem is ephemeral and rebuilt on every deploy, so a SQLite file
 * there would silently discard everything the town had written. Deployed
 * environments must set DATABASE_URI to a Postgres connection string
 * (Neon and Supabase both have free tiers that comfortably fit this site).
 */
export function buildDatabaseAdapter() {
  const uri = process.env.DATABASE_URI ?? "file:./hope-cms.db";

  if (uri.startsWith("postgres://") || uri.startsWith("postgresql://")) {
    return postgresAdapter({ pool: { connectionString: uri } });
  }

  return sqliteAdapter({ client: { url: uri } });
}
