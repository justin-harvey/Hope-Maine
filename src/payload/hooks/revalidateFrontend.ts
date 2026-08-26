import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

/**
 * Keeps the site statically rendered.
 *
 * Reading content from a database would normally force every page that shows
 * it to render per request. Instead the front end stays static and this hook
 * rebuilds the affected paths the moment someone presses Publish, so a town
 * of 1,698 still serves cached HTML rather than paying for a database round
 * trip on every visit.
 *
 * Each collection passes the paths that actually display it. Getting this
 * list wrong is silent: the edit saves, the admin says so, and the public
 * page keeps serving the previous build until something else rebuilds it.
 */
export function revalidateFrontend(
  paths: string[],
): CollectionAfterChangeHook & CollectionAfterDeleteHook {
  return () => {
    for (const path of paths) {
      try {
        revalidatePath(path);
      } catch {
        // revalidatePath throws outside a request scope — the seed script and
        // migrations both run there. The next build regenerates these pages
        // anyway, so this is not fatal.
      }
    }
  };
}
