require.context('', true, /\.scss$/);
require.context('../../fonts', true, /\.scss$/);

const sliderScripts = require.context('', true, /[^d]\.ts$/);
sliderScripts.keys().forEach((script) => {
  const directories = script.split('/');

  if (!directories.includes('__mocks__') && !directories.includes('tests')) {
    sliderScripts(script);
  }
});
