/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    demo: path.resolve(__dirname, 'src/demo/index.ts'),
    slider: path.resolve(__dirname, 'src/plugins/simple-js-slider/index.ts'),
  },
  output: {
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    jquery: '$',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/demo/index.pug'),
      filename: path.resolve(__dirname, 'dist/demo/index.html'),
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/demo/images/help-image.png'),
          to: path.resolve(__dirname, 'dist/demo/images/help-image.png'),
        },
        {
          from: path.resolve(__dirname, 'favicon.ico'),
          to: path.resolve(__dirname, 'dist/demo/favicon.ico'),
        },

        {
          from: path.resolve(__dirname, 'src/fonts'),
          to: path.resolve(__dirname, 'dist/slider/fonts'),
        },
      ],
    }),
    new StylelintPlugin({
      configFile: path.resolve(__dirname, './stylelint.config.js'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[path][name].[ext]',
              outputPath: 'demo',
              publicPath: './',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file-loader',
        options: {
          useRelativePath: true,
          name: 'images/[name].[ext]',
          outputPath: 'demo',
          publicPath: './',
        },
      },
    ],
  },
};
