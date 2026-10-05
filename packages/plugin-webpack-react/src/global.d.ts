import { SuzumeDesignPluginOptions } from './suzume-design-plugin/interface';

declare global {
  interface suzumeDesignPlugin {
    options: SuzumeDesignPluginOptions;
  }
}

export {};
