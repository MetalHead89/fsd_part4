/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/demo/index.ts'),
  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../src/demo/index.pug'),
      filename: path.resolve(__dirname, '../dist/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/demo/images/help-image.png'),
          to: path.resolve(__dirname, '../dist/images/help-image.png'),
        },
        {
          from: path.resolve(__dirname, '../favicon.ico'),
          to: path.resolve(__dirname, '../dist/favicon.ico'),
        },
      ],
    }),
  ],
};
