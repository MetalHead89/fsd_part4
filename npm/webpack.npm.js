/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('../webpack-configs/webpack.common.js');
const prod = require('../webpack-configs/webpack.prod.js');

module.exports = merge(common, prod, {
  entry: path.resolve(__dirname, '../src/plugins/simple-js-slider/index.ts'),
  output: {
    filename: 'simple-js-slider.js',
    path: path.resolve(__dirname, '../npm-build'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../npm/LICENSE'),
          to: path.resolve(__dirname, '../npm-build'),
        },
        {
          from: path.resolve(__dirname, '../npm/README.md'),
          to: path.resolve(__dirname, '../npm-build'),
        },
        {
          from: path.resolve(__dirname, '../npm/package.json'),
          to: path.resolve(__dirname, '../npm-build'),
        },
      ],
    }),
  ],
});
