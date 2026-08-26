import configPromise from "@payload-config";
import { getPayload } from "payload";

/**
 * The Local API — Payload running in-process, not over HTTP.
 *
 * Server components call this directly, so reading a news post costs a
 * database query rather than a round trip through the site's own REST API.
 */
export function getPayloadClient() {
  return getPayload({ config: configPromise });
}
