# Temporary dependency overrides

`next@16.2.12` declares PostCSS `8.4.31` and Sharp `^0.34.5`. npm currently reports high-severity advisories in both ranges:

- PostCSS: `GHSA-qx2v-qp2m-jg93`, `GHSA-6g55-p6wh-862q` and `GHSA-r28c-9q8g-f849`
- Sharp: `GHSA-f88m-g3jw-g9cj`

Forcing npm back to Next's declared dependency graph reproduces all three high-severity audit groups. The application therefore overrides these transitive packages with:

- `postcss@8.5.25`
- `sharp@0.35.3`

These versions sit outside Next's declared ranges. They are intentional security exceptions rather than routine upgrades.

## Release checks

Any change to these overrides must pass:

1. `npm ci`
2. `npm audit --audit-level=low`
3. `npm test`
4. `npm run lint`
5. `npm run build`
6. A live request to Next's `/_next/image` endpoint using a local JPEG, with a 200 response and an image content type

The production runtime is pinned to Node 22 in `netlify.toml`. `package.json` accepts Node versions from 20.9 through 24.

## Removal condition

Remove each override when a stable Next release declares a non-vulnerable version inside its own dependency range. Do not remove an override merely to satisfy semver if doing so restores a known high-severity advisory.
