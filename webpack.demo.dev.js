/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const { merge } = require('webpack-merge');
const common = require('./webpack-configs/webpack.common.js');
const dev = require('./webpack-configs/webpack.dev.js');
const demo = require('./webpack-configs/webpack.demo.js');

module.exports = merge(common, dev, demo);
