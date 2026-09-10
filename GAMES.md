# Adding a playable browser game

The **Games** section on the homepage plays web builds that are hosted in this
repository, so visitors never leave the site and nothing is embedded from a
third party.

## 1. Drop the build in `public/games/`

Give each game its own folder, named with a lowercase slug:

```
public/games/
  my-game/
    index.html
    Build/
    TemplateData/
```

Everything under `public/` is copied to the site root at build time, so
`public/games/my-game/index.html` is served at `/games/my-game/index.html`.

Keep folder and file names lowercase with no spaces — GitHub Pages is
case-sensitive, and a mismatch that works locally will 404 once deployed.

## 2. Point `src/config.ts` at it

Add or edit an entry in the `games` array:

```ts
{
  name: "My Game",
  description: "One or two sentences on what the player does.",
  embedPath: "/games/my-game/index.html",
  thumbnail: "/images/MyGame/cover.png", // optional; a gradient is used if empty
  aspectRatio: "16 / 9",                  // match your build's canvas
  controls: "WASD to move, Space to jump",
  skills: ["Unity WebGL", "C#"],
  dateRange: "2025",
  link: "",                               // optional itch.io / Steam / source page
},
```

An entry with an empty `embedPath` renders as a "Coming soon" placeholder, so
you can announce a game before its build is ready. Emptying the whole `games`
array hides the section (and its nav links) entirely.

The game only loads when a visitor clicks **Play in browser** — the iframe is
created on click, so having several games on the page costs nothing until
someone actually plays one.

## Engine-specific notes

### Unity WebGL

Unity compresses builds with Brotli or Gzip by default and relies on the web
server sending a matching `Content-Encoding` header. **GitHub Pages does not
send that header**, so a default build loads locally in the Unity player but
fails on the live site with a decompression error.

Pick one of these in *Project Settings → Player → Publishing Settings*:

- **Compression Format: Disabled** — simplest, but the largest download.
- **Compression Format: Gzip or Brotli + Decompression Fallback: enabled** —
  Unity then decompresses in JavaScript instead of relying on the server.
  Smaller download, slightly slower startup.

Also note that GitHub blocks individual files over 100 MB, and a Pages site is
capped at 1 GB, so keep builds lean.

### Godot

Export with the *Web* preset. Godot 4 exports expect the
`Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy` headers for
threads, which GitHub Pages cannot set — export with **Thread Support
disabled** so the build runs without them.

### Plain HTML5 / JavaScript

Nothing special: make sure `index.html` references its assets with relative
paths (`./assets/…`, not `/assets/…`) so they resolve inside the game's folder.

## Testing before you push

```bash
npm run dev      # http://localhost:4321 — check the game boots and controls work
npm run build    # confirms the build succeeds
npm run preview  # serves the production build, closest match to GitHub Pages
```
