import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      on('task', {
        // Add custom tasks here
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        },
      });
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  env: {
    // Add environment variables here
    apiUrl: 'http://localhost:3000/api',
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  watchForFileChanges: false,
  chromeWebSecurity: false,
  includeShadowDom: true,
  numTestsKeptInMemory: 50,
  experimentalMemoryManagement: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
});