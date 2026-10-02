/*
 * pack-lab.mjs — encrypt the private apps that sit behind /lab.
 *
 * The site is static and served from a public bucket, so a password that
 * merely *checks* and then reveals protects nothing: the app would still be
 * fetchable at its own URL, and the check would be sitting in the page
 * source. Instead each app is encrypted here, and the browser decrypts it
 * only once the right password has produced the right key. What lands in the
 * repository is ciphertext, and the password is never stored anywhere.
 *
 * Strength is entirely the password's. AES-256-GCM is not the weak point;
 * a short password is. PBKDF2 at 310k iterations is here to make each guess
 * cost real time in an attacker's browser too.
 *
 *   node tools/pack-lab.mjs <source-dir> [--password-file <path>]
 *
 * <source-dir> holds the plaintext apps plus an apps.json describing them.
 * Nothing in it is copied into the repository.
 */
import { webcrypto as crypto } from "node:crypto";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const OUT = "public/lab";
const ITER = 310000;

const enc = new TextEncoder();
const b64 = (buf) => Buffer.from(buf).toString("base64");

async function deriveKey(password, salt) {
  const material = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: ITER, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"],
  );
}

/* One payload: a fresh IV each time, and the GCM tag left appended to the
   ciphertext because that is the shape WebCrypto's decrypt() expects. */
async function seal(key, plaintext) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(plaintext));
  return { iv: b64(iv), data: b64(data) };
}

const args = process.argv.slice(2);
const srcDir = args[0];
if (!srcDir) {
  console.error("usage: node tools/pack-lab.mjs <source-dir> [--password-file <path>]");
  process.exit(1);
}
const pwFlag = args.indexOf("--password-file");
const password = pwFlag >= 0
  ? (await readFile(args[pwFlag + 1], "utf8")).replace(/\r?\n$/, "")
  : process.env.LAB_PASSWORD;
if (!password) {
  console.error("No password: pass --password-file <path> or set LAB_PASSWORD.");
  process.exit(1);
}
if (password.length < 10) {
  console.error(`Password is ${password.length} characters. The encryption is only as good as this; use a longer passphrase.`);
  process.exit(1);
}

const apps = JSON.parse(await readFile(path.join(srcDir, "apps.json"), "utf8"));
const salt = crypto.getRandomValues(new Uint8Array(16));
const key = await deriveKey(password, salt);

await mkdir(OUT, { recursive: true });

/* The salt and the iteration count are not secrets — the browser needs both
   before it can derive anything — but they are the only things here that are
   readable. Even the list of app names is encrypted, so the page gives up
   nothing at all until it is unlocked. */
await writeFile(path.join(OUT, "index.json"),
  JSON.stringify({ v: 1, kdf: "PBKDF2-SHA256", iter: ITER, salt: b64(salt) }, null, 2) + "\n");

const listing = [];
for (const app of apps) {
  const html = await readFile(path.join(srcDir, app.file), "utf8");
  await writeFile(path.join(OUT, `${app.slug}.enc`), JSON.stringify(await seal(key, html)));
  listing.push({ slug: app.slug, name: app.name, blurb: app.blurb, note: app.note ?? "", bytes: html.length });
  console.log(`  sealed ${app.slug.padEnd(16)} ${String(html.length).padStart(8)} bytes of plaintext`);
}
await writeFile(path.join(OUT, "manifest.enc"), JSON.stringify(await seal(key, JSON.stringify(listing))));

const files = (await readdir(OUT)).sort();
console.log(`\n${listing.length} app(s) sealed into ${OUT}/ -> ${files.join(", ")}`);
