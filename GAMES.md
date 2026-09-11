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

### How `aspectRatio` affects the player

Games open in a player dialog, and the ratio decides its layout:

- **Landscape** (wider than tall, e.g. `16 / 9`) — the game sits on top with its
  description underneath, and the dialog suggests playing fullscreen, since a
  landscape build is cramped in a window.
- **Portrait** (taller than wide, e.g. `9 / 16`) — the game sits on the left with
  its description beside it on the right, collapsing to a single column under
  900px wide.

So set `aspectRatio` to match the build's real canvas — it is a layout
instruction, not just a letterbox.

### One game at a time

Nothing loads until a visitor clicks **Play in browser**. The iframe is created
on open and *destroyed* on close, and opening another game tears the previous
one down first — a WebGL build keeps its GPU context, audio and render loop
alive for as long as its iframe exists, so leaving a finished game parked in the
page would quietly cost a phone its battery.

## The games currently on the site

Both builds were copied in from their source projects and adjusted for this
site. If you refresh either one, re-apply the changes below or they will come
back.

### Stress Experiment

- **Source:** `Kristopherius/Stress-Experiments`, branch `clouade`, file
  `build/index.html` (produced by `tools/build.ps1`). It is a single
  self-contained 6.3 MB file with all art base64-inlined.
- **Change applied:** the `<script src="https://game-cdn.poki.com/...">` tag was
  removed. That tag is for the Poki portal build. This site is not the portal,
  so there is no ad inventory to serve, and a personal portfolio should not ship
  a third-party ad and tracking script to its visitors — particularly with no
  consent flow, for an EU audience. `js/poki.js` is written to degrade to a
  no-op when `window.PokiSDK` is absent, so the game plays exactly as it does on
  Poki, minus the ad breaks.
- Needs **WebGL2**; it shows its own "UNABLE TO START" screen if that is missing.

To refresh: copy `build/index.html` over
`public/games/stress-experiment/index.html` and delete the Poki script tag again.

### Digi-Dash, Spherical! and Horns

Single-file builds, added from uploaded HTML. Three.js is inlined in Digi-Dash
and Spherical!, so none of the three fetch anything from a CDN.

- **Digi-Dash** and **Spherical!** had their Poki `<script>` tag removed, for the
  same reasons as Stress Experiment. Every call in both is guarded on
  `window.PokiSDK`, so it all no-ops without it. **Horns** never had one.
- **Digi-Dash expects 12 audio files** under `assets/audio/` (`jump.ogg`,
  `coin.ogg`, … and `music.mp3`) that are not inside the HTML. Each load is
  wrapped in try/catch and `playSfx()` no-ops on a missing buffer, so the game
  plays normally — silently. Drop the folder in at
  `public/games/digidash/assets/audio/` to restore sound; nothing else needs
  changing.

### Perihelion

- **Source:** the published Claude artifact (`Perihelion`), a single-file
  Three.js build.
- **Changes applied:**
  1. The Poki SDK loader is short-circuited (an early `return done();` in
     `Ads.init`), for the same reasons as above. The loader is left in place so
     a future portal build can re-enable it by deleting that one line.
  2. **three.js r128 is vendored** as `public/games/perihelion/three.min.js`
     instead of being pulled from cdnjs at runtime. A portfolio piece should not
     be able to turn into a blank screen because a CDN is blocked by a corporate
     network, an ad blocker, or a regional block.

To refresh: re-export the artifact, then re-apply both changes.

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
