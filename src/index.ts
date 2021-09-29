// import Demo from './demo/demo';

// require.context('', true, /\.scss$/);

// const scripts = require.context('', true, /[^d]\.ts$/);
// scripts.keys().forEach((script) => {
//   const directories = script.split('/');

//   if (!directories.includes('__mocks__') && !directories.includes('tests')) {
//     scripts(script);
//   }
// });

// const demo = new Demo();

require.context('./plugins/simple-slider', true, /\.scss$/);

const scripts = require.context('./plugins/simple-slider', true, /[^d]\.ts$/);
scripts.keys().forEach((script) => {
  const directories = script.split('/');

  if (!directories.includes('__mocks__') && !directories.includes('tests')) {
    scripts(script);
  }
});
