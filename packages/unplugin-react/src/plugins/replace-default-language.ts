import type { Compiler, RuleSetUseItem } from '@rspack/core';
import { SUZUME_DESIGN_COMPONENT_NAME } from '../config';
import { compileGlob } from '../utils';
import { SuzumeDesignPluginOptions } from '../types';

export class ReplaceDefaultLanguagePlugin {
  options: SuzumeDesignPluginOptions;

  constructor(options: SuzumeDesignPluginOptions) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    for (const type of ['es', 'lib']) {
      const use: RuleSetUseItem = {
        loader: require.resolve('../loaders/replace-default-language'),
        options: {
          defaultLanguage: this.options.defaultLanguage,
          type,
        },
      };
      compiler.options.module.rules.push({
        test: compileGlob(
          `**/node_modules/${SUZUME_DESIGN_COMPONENT_NAME}/${type}/locale/default.js`
        ),
        type: undefined,
        use: [use],
      });
    }
  }
}
