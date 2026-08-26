import { s3Storage } from "@payloadcms/storage-s3";
import type { Plugin } from "payload";

/**
 * Where uploaded files actually live.
 *
 * Without this, uploads write to `public/uploads` — the same ephemeral
 * filesystem the host rebuilds on every deploy, so a PDF the Town Clerk
 * posted on Friday is gone after the next push. That is the failure mode
 * this exists to prevent.
 *
 * Supabase Storage speaks S3, so the same adapter covers it, Cloudflare R2,
 * Backblaze, and AWS itself. Take the endpoint, region, and keys from
 * Supabase → Project Settings → Storage → S3 connection; `forcePathStyle` is
 * required for Supabase and harmless on R2.
 */
export function buildStoragePlugin(): Plugin {
  const bucket = process.env.S3_BUCKET;
  const endpoint = process.env.S3_ENDPOINT;
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

  const configured = Boolean(bucket && endpoint && accessKeyId && secretAccessKey);

  if (!configured && process.env.NODE_ENV === "production") {
    // Loud, because the symptom otherwise appears days later as a document
    // that used to open and now 404s, with nothing in the logs tying it to
    // the deploy that erased it.
    console.warn(
      "[storage] S3 is not configured — uploads are being written to the " +
        "local filesystem. On a host that rebuilds its filesystem between " +
        "deploys, every uploaded file will be lost on the next deploy. " +
        "Set S3_BUCKET, S3_ENDPOINT, S3_ACCESS_KEY_ID, and S3_SECRET_ACCESS_KEY.",
    );
  }

  return s3Storage({
    enabled: configured,
    /**
     * Keeps the schema identical whether or not S3 is switched on, so the
     * first deploy against a real bucket is not also a schema change.
     *
     * `alwaysInsertFields` alone does not achieve that in
     * plugin-cloud-storage 3.88.0: its *enabled* branch calls `getFields`
     * without the flag, so the option only takes effect while the plugin is
     * off — the exact inverse of what it is for. Setting an explicit
     * `prefix` per collection below satisfies the other half of that
     * condition, so the field is inserted in both branches.
     */
    alwaysInsertFields: true,
    collections: {
      /**
       * Documents redirect rather than stream.
       *
       * `/api/documents/file/<name>` stays the public URL — same origin, so
       * links survive a change of storage provider and the front end never
       * has to label the town's own ordinance "Opens on another website".
       * But instead of piping the bytes through the Node process, the route
       * 302s to a signed URL and the file comes straight from Supabase.
       *
       * Some of the tax maps are tens of megabytes. Streaming those through
       * a serverless function is how you find the function timeout and the
       * egress bill at the same time.
       */
      documents: { prefix: "documents", signedDownloads: { expiresIn: 60 * 60 } },
      // Images are small and want long-lived, cacheable URLs, so they keep
      // the stable streamed path rather than a per-request signed one.
      media: { prefix: "media" },
    },
    bucket: bucket ?? "unset",
    config: {
      endpoint,
      // The SDK requires a region even where the provider ignores it.
      region: process.env.S3_REGION ?? "us-east-1",
      credentials:
        accessKeyId && secretAccessKey ? { accessKeyId, secretAccessKey } : undefined,
      // Supabase addresses buckets by path, not by subdomain.
      forcePathStyle: true,
    },
  });
}
