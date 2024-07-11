import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'd7wreu',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  chromeWebSecurity: false
});
