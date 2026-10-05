import webpack from 'webpack';

export interface SuzumeDesignPluginOptions {
  context?: string;
  include: (string | RegExp)[];
  extensions: string[];
  style: string | boolean;
  libraryDirectory: string;
  iconBox?: string;
  babelConfig?: object;
  removeFontFace?: boolean;
  defaultLanguage?: string;
  theme?: string;
  modifyVars?: Record<string, string>;
  webpackImplementation?: typeof webpack;
  varsInjectScope?: (string | RegExp)[];
  modifyBabelLoader?: boolean | 'merge' | 'override';
}
