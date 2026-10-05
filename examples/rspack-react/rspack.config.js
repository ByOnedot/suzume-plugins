/* eslint-disable import/no-extraneous-dependencies */
const { SuzumeDesignPlugin } = require('@byonedot/plugin-unplugin-react');
const path = require('path');

/** @type {import('@rspack/core').Configuration} */
module.exports = {
  mode: 'development',
  entry: './src/main.jsx',
  output: {
    publicPath: '/',
  },
  devtool: 'source-map',
  builtins: {
    html: [
      {
        filename: 'index.html',
        template: 'public/index.html',
        inject: 'body',
      },
    ],
  },
  module: {
    rules: [
      {
        type: 'css',
        test: /\.less$/,
        use: [
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@byonedot/web-react': path.resolve(__dirname, 'node_modules/@byonedot/web-react'),
    },
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new SuzumeDesignPlugin({
      removeFontFace: true,
      defaultLanguage: 'ja-JP',
    }),
  ],
};
