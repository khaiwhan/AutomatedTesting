const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
  },
  env: {
    WEB_URL: process.env.WEB_URL || ''
  }
});
