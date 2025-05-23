import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'pnpm start',
    port: 3999,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3999',
    headless: true,
  },
  reporter: 'json',
});
