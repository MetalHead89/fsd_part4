import Demo from './demo';

require.context('', true, /\.scss$/);
require.context('../fonts', true, /\.scss$/);

const demoScripts = require.context('', true, /[^d]\.ts$/);
demoScripts.keys().forEach((script) => {
  const directories = script.split('/');

  if (!directories.includes('__mocks__') && !directories.includes('tests')) {
    demoScripts(script);
  }
});

const demo = new Demo();
