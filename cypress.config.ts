import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {

    baseUrl: 'http://localhost:3000',
    videosFolder: '__tests__/videos',
    screenshotsFolder: '__tests__/screenshots',
    fixturesFolder: '__tests__/fixtures',
    downloadsFolder: '__tests__/downloads',
    supportFolder: '__tests__/support',
    specPattern: '__tests__/e2e/**/*.ts',
    supportFile: '__tests__/support/e2e.ts',
    setupNodeEvents(on, config) {
    }
  }
})