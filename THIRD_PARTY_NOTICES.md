# Third-Party Notices

## Provenance

`suzume-plugins` is a modified redistribution of the upstream **arco-plugins**
project, published under the MIT License.

- Upstream project: `arco-plugins`
- Upstream copyright holders: see `LICENSE` in this repository
- License: MIT (`LICENSE`)

The upstream MIT copyright notice has been preserved verbatim in `LICENSE`.
Modifications performed for this distribution include renaming the product
("Arco Design" → "Suzume Design"), renaming the npm scope
(`@arco-plugins/*` → `@byonedot/plugin-*`), removing the upstream Vue
plugin (this ecosystem targets React / Next.js only), and updating
documentation and examples.

## Where upstream names may appear

Upstream project and company names are intentionally confined to:

- `LICENSE`
- this file (`THIRD_PARTY_NOTICES.md`)

Every other file in this repository is expected to be free of upstream
branding. This is enforced by `npm run check:branding`
(`scripts/check-branding.js`), which runs in CI.

## Third-party runtime dependencies

This repository's published packages depend only on openly licensed npm
packages (Babel, chalk, lodash, micromatch, minimatch, loader-utils).
Their licenses are recorded by their respective `package.json` files.
