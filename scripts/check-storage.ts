/**
 * Confirms the storage plugin flips behaviour on the S3 environment
 * variables, without needing a reachable bucket. The S3 client is created
 * lazily on first upload, so loading the config here contacts nothing.
 *
 *   npx tsx scripts/dbcheck.ts
 */
import configPromise from "../payload.config";

async function main() {
  const config = await configPromise;
  const documents = config.collections.find((c) => c.slug === "documents");
  const media = config.collections.find((c) => c.slug === "media");

  const upload = (c: typeof documents) =>
    typeof c?.upload === "object" ? c.upload : undefined;

  console.log("S3 configured:", Boolean(process.env.S3_BUCKET && process.env.S3_ENDPOINT));
  console.log("documents.disableLocalStorage:", upload(documents)?.disableLocalStorage ?? false);
  console.log("media.disableLocalStorage:", upload(media)?.disableLocalStorage ?? false);
  const names = (c: typeof documents) =>
    (c?.fields ?? []).map((f) => ("name" in f ? f.name : f.type)).join(", ");
  console.log("documents fields:", names(documents));
  console.log("media fields:", names(media));
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
