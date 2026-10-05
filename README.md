# Suzume Design plugin library

A collection of build plugins for the **Suzume Design** ecosystem
(`@byonedot/*`, https://byonedot.in).

## Background

`@byonedot/web-react` ships prebuilt CSS, so **you do not need any plugin
to use it**. These plugins exist for applications that want deeper integration
with their bundler:

1. **On-demand loading** - only the styles (and icons) that a project actually
   imports are emitted.
2. **Theme injection** - a custom token file is injected into the Less
   compilation so `modifyVars`-style theming works without touching the
   application's own Less config.
3. **Font-face removal** - drop the library's `@font-face` rules when the
   application provides its own fonts.
4. **Icon replacement** - point at an alternative icon package and same-named
   icons are swapped out during the build.
5. **Default language replacement** - swap the locale bundled by default.

## Plugin list

| Package | Bundler | Status |
| --- | --- | --- |
| [`@byonedot/plugin-webpack-react`](./packages/plugin-webpack-react/README.md) | webpack 4 / 5 | stable |
| [`@byonedot/plugin-unplugin-react`](./packages/unplugin-react/README.md) | Rspack | stable |
| [`@byonedot/plugin-vite-react`](./packages/plugin-vite-react/README.md) | Vite 2+ | stable |
| [`@byonedot/plugin-utils`](./packages/utils/README.md) | - | shared internals |

## Usage (webpack)

```js
// webpack.config.js
const SuzumeWebpackPlugin = require('@byonedot/plugin-webpack-react');

module.exports = {
  plugins: [
    new SuzumeWebpackPlugin({
      include: ['src'],
      webpackImplementation: require('webpack'),
    }),
  ],
};
```

## Usage (Rspack)

```js
// rspack.config.js
const { SuzumeDesignPlugin } = require('@byonedot/plugin-unplugin-react');

module.exports = {
  plugins: [
    new SuzumeDesignPlugin({
      removeFontFace: true,
      defaultLanguage: 'ja-JP',
    }),
  ],
};
```

## Usage (Vite)

```js
// vite.config.ts
import { vitePluginForSuzume } from '@byonedot/plugin-vite-react';

export default {
  plugins: [vitePluginForSuzume()],
};
```

## Next.js

**`@byonedot/web-react` works in Next.js without any plugin.** The
recommended Next.js setup is:

```tsx
// app/globals.css (or app/globals.scss)
@import '@byonedot/web-react/dist/css/suzume.css';
```

```tsx
// app/components/button.tsx
'use client';

import { Button } from '@byonedot/web-react';

export function SaveButton() {
  return <Button type="primary">Save</Button>;
}
```

Everything you need to know about the Next.js integration - App Router
boundaries, Server Components, SSR/hydration, `transpilePackages` and
Turbopack - is documented in the `docs/nextjs.md` file of the `suzume-design`
repository.

### Honest support matrix for the plugins on Next.js

| Plugin | On Next.js | Why |
| --- | --- | --- |
| `plugin-webpack-react` | **Partial** | Next.js exposes a `webpack()` hook in `next.config.js`, so the theme / font-face / icon / default-language sub-plugins can run. However Next.js compiles application code with **SWC by default**, so the plugin's `babel-loader` manipulation (used for on-demand style imports) only takes effect if your project actually compiles with `babel-loader`. |
| `plugin-unplugin-react` | **No** | It is a Rspack compiler plugin and reads `compiler.options.builtins`, which Next.js does not expose. |
| `plugin-vite-react` | **No** | Vite only. |

No Turbopack-specific plugin exists today; do not assume one does. If your
Next.js build uses Turbopack, rely on the prebuilt CSS import shown above.

## Development

```bash
yarn install          # Yarn 4 (see .yarnrc.yml)
yarn build            # builds every publishable package
yarn check:branding   # fails on any upstream identifier outside the legal allowlist
```

## Contributing

Read the [Code of Conduct](./CODE_OF_CONDUCT.md) and the
[Contributing Guide](./CONTRIBUTING.md).

## License

This project is [MIT licensed](./LICENSE). See
[THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) for upstream attribution.
