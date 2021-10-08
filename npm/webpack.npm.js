/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, '../src'),
  mode: 'production',
  entry: path.resolve(__dirname, '../src/plugins/simple-js-slider/index.ts'),
  output: {
    filename: 'simple-js-slider.js',
    path: path.resolve(__dirname, '../npm-build'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    jquery: '$',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
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
    new StylelintPlugin({
      configFile: path.resolve(__dirname, '../stylelint.config.js'),
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
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                config: path.resolve(__dirname, '../postcss.config.js'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                config: path.resolve(__dirname, '../postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[path][name].[ext]',
              // outputPath: 'demo',
              // publicPath: './',
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
          // outputPath: 'demo',
          // publicPath: './',
        },
      },
    ],
  },
};
