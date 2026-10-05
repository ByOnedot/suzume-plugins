import path from 'path';
import { SuzumeDesignPluginOptions } from './interface';

export class ReplaceIconPlugin {
  options: SuzumeDesignPluginOptions;

  constructor(options: SuzumeDesignPluginOptions) {
    this.options = options;
  }

  apply(compiler) {
    const { iconBox } = this.options;
    if (!iconBox) return;
    let iconBoxLib: Record<string, string>;
    let iconBoxDirname: string;
    try {
      iconBoxDirname = path.dirname(require.resolve(`${iconBox}/package.json`));
      iconBoxLib = require(iconBox); // eslint-disable-line
    } catch (e) {
      throw new Error(`IconBox ${iconBox} not existed`);
    }

    compiler.options.module.rules.unshift({
      test: /\.js/,
      include: /node_modules\/@byonedot\/web-react\/icon\/react-icon\/([^/]+)\/index\.js$/,
      use: [
        {
          loader: path.resolve(__dirname, './loaders/replace-icon.js'),
          options: {
            iconBoxLib,
            iconBoxDirname,
          },
        },
      ],
    });
  }
}
