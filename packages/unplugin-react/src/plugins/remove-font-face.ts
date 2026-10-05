import type { Compiler, RuleSetUseItem } from '@rspack/core';
import { SUZUME_DESIGN_COMPONENT_NAME } from '../config';
import { compileGlob } from '../utils';

export class RemoveFontFacePlugin {
  apply(compiler: Compiler) {
    const use: RuleSetUseItem = {
      loader: require.resolve('../loaders/remove-font-face'),
      options: {},
    };
    compiler.options.module.rules.push({
      test: compileGlob(`**/node_modules/${SUZUME_DESIGN_COMPONENT_NAME}/{es,lib}/style/index.less`),
      type: undefined,
      use: [use],
    });
  }
}
