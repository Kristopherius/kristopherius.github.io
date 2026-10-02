/*
 * unpack-lab.mjs — the inverse of pack-lab.mjs.
 *
 *   node tools/unpack-lab.mjs <out-dir> [--password-file <path>]
 *
 * Decrypts public/lab/*.enc into <out-dir> as <slug>.html plus an apps.json
 * that pack-lab.mjs accepts as-is, so the edit loop is unpack, edit, re-pack.
 * <out-dir> must live OUTSIDE the repository: plaintext is never committed.
 */
import { webcrypto as crypto } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const LAB = "public/lab";
const args = process.argv.slice(2);
const outDir = args[0];
if (!outDir) {
  console.error("usage: node tools/unpack-lab.mjs <out-dir> [--password-file <path>]");
  process.exit(1);
}
if (!path.relative(process.cwd(), path.resolve(outDir)).startsWith("..")) {
  console.error("Refusing to write plaintext inside the repository; choose a directory outside it.");
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

const unb64 = (s) => new Uint8Array(Buffer.from(s, "base64"));
const { iter, salt } = JSON.parse(await readFile(path.join(LAB, "index.json"), "utf8"));
const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt: unb64(salt), iterations: iter, hash: "SHA-256" },
  material, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);

async function open(file) {
  const { iv, data } = JSON.parse(await readFile(path.join(LAB, file), "utf8"));
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(iv) }, key, unb64(data));
  return new TextDecoder().decode(plain);
}

let listing;
try {
  listing = JSON.parse(await open("manifest.enc"));
} catch {
  console.error("Wrong passphrase (or corrupted manifest).");
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
const apps = [];
for (const app of listing) {
  const html = await open(`${app.slug}.enc`);
  await writeFile(path.join(outDir, `${app.slug}.html`), html);
  apps.push({ slug: app.slug, file: `${app.slug}.html`, name: app.name, blurb: app.blurb, ...(app.note ? { note: app.note } : {}) });
  console.log(`  opened ${app.slug.padEnd(16)} ${String(html.length).padStart(8)} bytes`);
}
await writeFile(path.join(outDir, "apps.json"), JSON.stringify(apps, null, 2) + "\n");
console.log(`\n${apps.length} app(s) written to ${outDir}`);
