/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const { merge } = require('webpack-merge');
const common = require('./webpack-configs/webpack.common.js');
const prod = require('./webpack-configs/webpack.prod.js');
const slider = require('./webpack-configs/webpack.slider.js');

module.exports = merge(common, prod, slider);
