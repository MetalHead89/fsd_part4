require.context('', true, /\.scss$/);

const scripts = require.context('', true, /[^d]\.ts$/);
scripts.keys().forEach((script) => {
  const directories = script.split('/');

  if (!directories.includes('__mocks__') && !directories.includes('tests')) {
    scripts(script);
  }
});
