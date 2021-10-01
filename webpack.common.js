/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    slider: path.resolve(__dirname, 'src/plugins/simple-slider/index.ts'),
    panel: path.resolve(__dirname, 'src/plugins/control-panel/index.ts'),
    demo: path.resolve(__dirname, 'src/demo/index.ts'),
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name(module) {
  //           const packageName = module.context.match(
  //             /[\\/]node_modules[\\/](.*?)([\\/]|$)/
  //           )[1];

  //           return `npm.${packageName.replace('@', '')}`;
  //         },
  //       },
  //     },
  //   },
  // },
  devServer: {
    port: 4200,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/demo/index.pug'),
      filename: path.resolve(__dirname, 'dist/demo/index.html'),
    }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin([{ filename: 'styles.css' }]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/demo/images/help-image.png'),
          to: path.resolve(__dirname, 'dist/demo/src/images/help-image.png'),
        },
        {
          from: path.resolve(__dirname, 'favicon.ico'),
          to: path.resolve(__dirname, 'dist/demo/favicon.ico'),
        },
      ],
    }),
    new StylelintPlugin({
      configFile: path.resolve(__dirname, './stylelint.config.js'),
    }),
  ],
  // module: {
  //   rules: [
  //     {
  //       test: /\.(woff(2)?|ttf|eot)$/,
  //       use: [
  //         {
  //           loader: 'file-loader',
  //           options: {
  //             name: 'fonts/[name]/[name].[ext]',
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
};
