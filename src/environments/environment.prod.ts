
const packageJson = require('../../package.json');

export const environment = {
  appName: 'Movie Show',
  omdbApiKUrl: 'https://www.omdbapi.com',
  omdbApiKey: '428ee152',
  defaultLanguage: 'ru',
  production: true,
  hmr: false,
  versions: {
    app: packageJson.version
  }
};
