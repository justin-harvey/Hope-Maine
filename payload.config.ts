import path from "path";
import { fileURLToPath } from "url";

import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Boards } from "@/payload/collections/Boards";
import { Documents } from "@/payload/collections/Documents";
import { Meetings } from "@/payload/collections/Meetings";
import { Media } from "@/payload/collections/Media";
import { News } from "@/payload/collections/News";
import { Users } from "@/payload/collections/Users";
import { buildDatabaseAdapter } from "@/payload/db";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    // Payload's default account avatar is a Gravatar lookup, which sends a
    // hash of the user's email to a third party on every admin page load.
    // Town staff email addresses are not ours to hand out.
    avatar: "default",
    meta: {
      titleSuffix: " · Town of Hope",
    },
  },
  collections: [News, Meetings, Boards, Documents, Media, Users],
  editor: lexicalEditor(),
  db: buildDatabaseAdapter(),
  // Used to sign login cookies. A deployed site must set this; a changed
  // value logs everyone out, which is the intended behaviour if it leaks.
  secret: process.env.PAYLOAD_SECRET ?? "hope-maine-development-secret",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
  sharp,
  // Uploads are served from /uploads, and Next needs to know the site's own
  // origin to build absolute URLs for them.
  serverURL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
})
