require.context('', true, /\.scss$/);

const scripts = require.context('', true, /[^d]\.ts$/);
scripts.keys().forEach((script) => {
  scripts(script);
});
