# The private lab at `/lab`

An unlisted page holding work that isn't ready to be public — client
prototypes, experiments, anything you don't want on the portfolio yet.
Nothing on the site links to it.

## Why the apps are encrypted

This site is static and served from a public bucket. A password that merely
*checks* and then reveals would protect nothing: the app would still sit at
its own fetchable URL, and the check would be sitting in the page source for
anyone to delete.

So the apps are **encrypted instead**. What lives in this repository is
ciphertext; the browser derives a key from your passphrase and decrypts in
memory. A decrypted app is handed to its iframe as `srcdoc`, so the plaintext
never exists at a URL anyone else could request.

- **AES-256-GCM**, with the key from **PBKDF2-SHA256 at 310,000 iterations**.
- GCM is authenticated, so a wrong passphrase *fails* rather than yielding
  junk. That is what makes the check trustworthy instead of cosmetic.
- `public/lab/index.json` holds the salt and iteration count. Those must be
  readable — the browser cannot derive the key without them — and neither is
  a secret. Everything else, **including the list of app names**, is
  encrypted, so a locked page gives up nothing at all.

### What this does and does not buy you

It is real confidentiality, and its strength is **entirely your passphrase**.
Anyone who finds the path can download the `.enc` files and attack them
offline, on their own hardware, for as long as they like. 310k iterations
makes each guess cost real time; it does not save a short password. Use four
random words or 16+ characters.

The page also carries `noindex, nofollow`. It is deliberately **not** listed
in `robots.txt`, because a `Disallow: /lab/` line would advertise the path to
anyone who read the file.

## Adding an app

1. Put the app's HTML somewhere outside the repository, with an `apps.json`
   beside it:

   ```json
   [
     {
       "slug": "my-app",
       "file": "my-app.html",
       "name": "My app",
       "blurb": "One or two sentences shown on the shelf.",
       "note": "Optional smaller line under it."
     }
   ]
   ```

2. Seal everything (all apps are re-sealed together, so list them all):

   ```bash
   node tools/pack-lab.mjs <source-dir> --password-file <path-to-passphrase>
   # or: LAB_PASSWORD='…' node tools/pack-lab.mjs <source-dir>
   ```

3. Commit only `public/lab/`. **Never commit the plaintext sources** — keep
   them out of the repository entirely.

## Changing the passphrase

Re-run the packer with the new one. It makes a fresh salt, derives a fresh
key and re-seals every app, so the old ciphertext is replaced. Anyone holding
the old passphrase is locked out of the new files — but if they kept a copy
of the old `.enc` files, those remain decryptable with the old passphrase.
Treat a leaked passphrase as a leak of everything sealed under it.
