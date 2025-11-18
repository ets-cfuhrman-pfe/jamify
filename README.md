# Do Not Delete: CDN Assets Branch (gh-pages)

This branch exists solely to host the `img/` folder for the Figma widget. The widget loads avatars via a CDN using this branch as the source. Deleting or renaming this branch will break image URLs in production.

## Purpose
- Provide a tiny, public snapshot that contains only `img/`.
- Serve images from a stable CDN URL so the widget stays fast and reliable for many users.

## How It’s Used
- Base URL in code (`profile-constants.ts`):
  - `https://cdn.jsdelivr.net/gh/ets-cfuhrman-pfe/jamify@gh-pages/img`
- Example image URL:
  - `https://cdn.jsdelivr.net/gh/ets-cfuhrman-pfe/jamify@gh-pages/img/Bard_1.png`
- Widget manifest must allow the domain:
  - `https://cdn.jsdelivr.net`

## Why CDN (jsDelivr) and Not Raw or Pages
- Raw GitHub (`raw.githubusercontent.com`):
  - Rate limits (429) under load;
- GitHub Pages (`ets-cfuhrman-pfe.github.io/jamify`): (Futur proof solution to do later in developpement)
  - Great for static hosting; Control exactly what’s published but need repo setting access
- jsDelivr CDN (chosen):
  - Pros: Global edge caching; works without repo Settings
  - Cons: jsDelivr fetches a snapshot of the branch; 50 MB package limit. Keep this branch minimal (only `img/`).

## Maintenance Guidelines
- Keep only `img/` in this branch. Do not commit build outputs (`dist/`) or large artifacts.
- When adding or replacing images:
  - Prefer small assets (target 64–96 px or 2× for high‑DPI).
  - Optimize images (PNG quantization or JPEG/WebP at reasonable quality).
  - Use consistent names (e.g., `Ranger_1.png`, `Mage_2.png`).
- Cache busting:
  - jsDelivr caches aggressively. If you must force an update, commit the new file and (optionally) pin code to a specific commit hash or change the filename.

## Switching to GitHub Pages (Optional Future)
If you later have Settings access and prefer Pages:
- Enable Pages to serve from this `gh-pages` branch (root).
- Update the base URL in `profile-constants.ts` to:
  - `https://ets-cfuhrman-pfe.github.io/jamify/img`
- Add `https://ets-cfuhrman-pfe.github.io` to the widget `manifest.json` `allowedDomains`.
