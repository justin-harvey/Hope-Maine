# Home page hero image

Drop a single wide landscape photograph into this folder and it becomes the
home page hero on the next build. No code change is needed —
`src/components/HomeHero.tsx` reads this directory at build time.

- **Formats:** `.jpg`, `.jpeg`, `.png`, `.webp`, or `.avif`
- **Recommended size:** about 2000px wide. The hero renders 224px tall on
  phones, 288px on tablets, and 384px on desktop, full-bleed with
  `object-cover`, so a wide 16:9 photo crops cleanly.
- **If several images are present,** the first by filename wins. Keep one.

When the folder holds no image, the hero renders the town summary alone —
it does not leave a broken image behind.

## Alt text

The alt text lives in `HERO_ALT` in `src/components/HomeHero.tsx` and
currently describes a rowboat moored on a pond. **Update it to describe
whatever photo you add** — it is what screen reader users hear in place of
the image, so it should describe the scene rather than repeat the town name.
