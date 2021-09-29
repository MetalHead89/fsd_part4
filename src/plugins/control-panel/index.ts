require.context('', true, /\.scss$/);
require.context('../../fonts', true, /\.scss$/);

const panelScripts = require.context('', true, /[^d]\.ts$/);
panelScripts.keys().forEach((script) => {
  const directories = script.split('/');

  if (!directories.includes('__mocks__') && !directories.includes('tests')) {
    panelScripts(script);
  }
});
