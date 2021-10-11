/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/plugins/simple-js-slider/index.ts'),
  output: {
    filename: 'simple-js-slider.js',
    path: path.resolve(__dirname, '../dist'),
  },
};
