# Suzume Design 插件库

**Suzume Design** 生态（`@byonedot/*`，https://byonedot.in）的构建插件集合。

## 背景

`@byonedot/web-react` 已经内置预构建的 CSS，**不使用任何插件也能直接接入**。
本仓库中的插件面向希望与打包工具做更深度融合的应用：

1. **按需加载**：只打包项目真正引用到的样式（与图标）。
2. **主题注入**：把自定义 token 文件注入 Less 编译，无需改动应用自己的 Less 配置。
3. **移除 font-face**：应用自带字体时，可剔除组件库的 `@font-face`。
4. **图标替换**：指定另一个图标包，同名图标会在构建期被替换。
5. **默认语言替换**：替换组件库默认打包的语言包。

## 插件列表

| 包名 | 打包器 | 状态 |
| --- | --- | --- |
| [`@byonedot/plugin-webpack-react`](./packages/plugin-webpack-react/README.zh-CN.md) | webpack 4 / 5 | 稳定 |
| [`@byonedot/plugin-unplugin-react`](./packages/unplugin-react/README.zh-CN.md) | Rspack | 稳定 |
| [`@byonedot/plugin-vite-react`](./packages/plugin-vite-react/README.zh-CN.md) | Vite 2+ | 稳定 |
| [`@byonedot/plugin-utils`](./packages/utils/README.md) | - | 内部工具 |

## 用法（webpack）

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

## 用法（Rspack）

```js
// rspack.config.js
const { SuzumeDesignPlugin } = require('@byonedot/plugin-unplugin-react');

module.exports = {
  plugins: [new SuzumeDesignPlugin({ removeFontFace: true, defaultLanguage: 'ja-JP' })],
};
```

## 用法（Vite）

```js
// vite.config.ts
import { vitePluginForSuzume } from '@byonedot/plugin-vite-react';

export default {
  plugins: [vitePluginForSuzume()],
};
```

## Next.js

**`@byonedot/web-react` 在 Next.js 中无需任何插件即可使用**，推荐做法：

```tsx
// app/globals.css
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

App Router 边界、Server Component、SSR/水合、`transpilePackages` 与 Turbopack
等完整说明见 `suzume-design` 仓库的 `docs/nextjs.md`。

### 插件在 Next.js 上的支持情况（如实说明）

| 插件 | Next.js | 原因 |
| --- | --- | --- |
| `plugin-webpack-react` | **部分支持** | 可通过 `next.config.js` 的 `webpack()` 钩子运行主题 / font-face / 图标 / 默认语言子插件；但 Next.js 默认使用 **SWC** 编译业务代码，因此依赖 `babel-loader` 的按需样式注入只有在项目确实使用 `babel-loader` 时才生效。 |
| `plugin-unplugin-react` | **不支持** | 这是 Rspack 编译器插件，依赖 `compiler.options.builtins`，Next.js 不提供。 |
| `plugin-vite-react` | **不支持** | 仅适用于 Vite。 |

目前没有 Turbopack 专用插件，请勿假设其存在。若使用 Turbopack，请直接使用上面的预构建 CSS 引入方式。

## 开发

```bash
yarn install          # Yarn 4（见 .yarnrc.yml）
yarn build            # 构建全部可发布包
yarn check:branding   # 除法律声明白名单外出现上游标识即失败
```

## 贡献

请阅读 [行为准则](./CODE_OF_CONDUCT.md) 与 [贡献指南](./CONTRIBUTING.md)。

## 许可证

本项目采用 [MIT 许可证](./LICENSE)，上游归属见
[THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)。
