import type { Compiler } from '@rspack/core';
import { SUZUME_DESIGN_COMPONENT_NAME, SUZUME_DESIGN_ICON_NAME } from '../config';
import { SuzumeDesignPluginOptions } from '../types';

export class ImportPlugin {
  options: SuzumeDesignPluginOptions;

  constructor(options: SuzumeDesignPluginOptions) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    /**
     * Compatible with the new rspack version
     * due to since 0.63 removed options.builtins of compiler
     * https://github.com/web-infra-dev/rspack/releases/tag/v0.6.3
     */
    if (compiler.options.builtins) {
      compiler.options.builtins.pluginImport ||= [];

      compiler.options.builtins.pluginImport.push({
        libraryDirectory: this.options.libraryDirectory || 'es',
        style: this.options.style ?? true,
        libraryName: SUZUME_DESIGN_COMPONENT_NAME,
        camelToDashComponentName: false,
      });

      compiler.options.builtins.pluginImport.push({
        libraryName: SUZUME_DESIGN_ICON_NAME,
        libraryDirectory: 'react-icon',
        camelToDashComponentName: false,
      });

      if (this.options.iconBox) {
        compiler.options.builtins.pluginImport.push({
          libraryName: this.options.iconBox,
          libraryDirectory: 'esm',
          camelToDashComponentName: false,
        });
      }
    } else {
      compiler.options.module.rules ||= [];

      const rule = {
        test: /(jsx?|tsx?)$/,
        loader: 'builtin:swc-loader',
        options: {
          rspackExperiments: {
            import: [
              {
                customName: `${SUZUME_DESIGN_COMPONENT_NAME}/${
                  this.options.libraryDirectory || 'es'
                }/{{member}}`,
                style: this.options.style ?? true,
                libraryName: SUZUME_DESIGN_COMPONENT_NAME,
              },
              {
                libraryName: SUZUME_DESIGN_ICON_NAME,
                customName: `${SUZUME_DESIGN_ICON_NAME}/react-icon/{{member}}`,
              },
              {
                libraryName: this.options.iconBox,
                customName: `${this.options.iconBox}/esm/{{member}}`,
              },
            ],
          },
        },
      };

      compiler.options.module.rules.push(rule);
    }
  }
}
