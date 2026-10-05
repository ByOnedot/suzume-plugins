import type { WebpackPluginInstance } from 'webpack';

import { merge } from 'lodash';
import { ThemePlugin } from './plugin-for-theme';
import { ImportPlugin } from './plugin-for-import';
import { RemoveFontFacePlugin } from './plugin-for-remove-font-face';
import { ReplaceIconPlugin } from './plugin-for-replace-icon';
import { ReplaceDefaultLanguagePlugin } from './plugin-for-replace-default-language';
import { SuzumeDesignPluginOptions } from './interface';

export class SuzumeDesignPlugin {
  options: SuzumeDesignPluginOptions;
  themePluginInstance: WebpackPluginInstance;
  importPluginInstance: WebpackPluginInstance;
  pluginForImport?: WebpackPluginInstance;
  removeFontFacePluginInstance?: WebpackPluginInstance;
  replaceIconPluginInstance?: WebpackPluginInstance;
  replaceDefaultLanguagePluginInstance?: WebpackPluginInstance;
  constructor(options: Partial<SuzumeDesignPluginOptions> = {}) {
    const resolveOptions = merge(
      {
        include: ['src'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        style: true,
        libraryDirectory: 'es',
        modifyBabelLoader: true,
      },
      options
    );
    global.suzumeDesignPlugin = { options: resolveOptions };
    this.options = resolveOptions;
    this.themePluginInstance = new ThemePlugin(resolveOptions);
    this.importPluginInstance = new ImportPlugin(resolveOptions);
    // Compatible with `(new SuzumeWebpackPlugin()).pluginForImport.getBabelPlugins()` usage
    this.pluginForImport = this.importPluginInstance;
    if (resolveOptions.removeFontFace) {
      this.removeFontFacePluginInstance = new RemoveFontFacePlugin();
    }
    if (resolveOptions.iconBox) {
      this.replaceIconPluginInstance = new ReplaceIconPlugin(resolveOptions);
    }
    if (resolveOptions.defaultLanguage) {
      this.replaceDefaultLanguagePluginInstance = new ReplaceDefaultLanguagePlugin(resolveOptions);
    }
  }

  apply(compiler) {
    this.themePluginInstance.apply(compiler);
    this.importPluginInstance.apply(compiler);
    this.removeFontFacePluginInstance?.apply(compiler);
    this.replaceIconPluginInstance?.apply(compiler);
    this.replaceDefaultLanguagePluginInstance?.apply(compiler);
  }
}
