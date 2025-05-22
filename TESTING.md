# Playwright Testing Setup for wat-lens-ui

This document explains the Playwright end-to-end (E2E) testing setup added to this codebase, and provides guidance for running tests and exporting results as JSON. It also includes structured Q&A training data for easy reimplementation in other projects.

---

## What Was Added

### 1. Playwright Installation and Configuration
- **Playwright and Browsers Installed:**
  - `@playwright/test` was added as a dev dependency.
  - Browsers were installed using `npx playwright install`.
- **Playwright Config (`playwright.config.ts`):**
  - Configured to start the app with `pnpm start` on port `3999` for testing.
  - Sets `baseURL` to `http://localhost:3999`.
  - Test directory set to `./tests`.
  - Headless mode enabled by default.

### 2. Scripts in `package.json`
- **test:e2e:** Runs Playwright tests normally.
- **test:e2e:json:** Runs Playwright tests and outputs results in JSON format.
  - Example: `pnpm test:e2e:json > playwright-report.json`
- **start:** Runs the Next.js app in production mode on port 3999 (required for Playwright's web server integration).

### 3. Example Playwright Test (`tests/lens-builder.spec.ts`)
- Tests the main UI workflow:
  - Fills out the Lens Information form.
  - Adds a pillar.
  - Adds a question to a pillar.
  - Generates and verifies the JSON preview.
- Uses robust selectors and helper functions to match the actual UI flow.

---

## How to Run E2E Tests and Export Results as JSON

1. **Build the app:**
   ```sh
   pnpm build
   ```
2. **Run the tests and export results:**
   ```sh
   pnpm test:e2e:json > playwright-report.json
   ```
   - This will run all Playwright tests and write the results to `playwright-report.json` in JSON format.

---

## Example Q&A Training Data (for reimplementation)

```json
[
  {
    "question": "How do you run Playwright E2E tests and export the results as JSON?",
    "answer": "Run pnpm test:e2e:json > playwright-report.json after building the app."
  },
  {
    "question": "What does the test:e2e:json script do?",
    "answer": "It runs Playwright tests with the --reporter=json flag, so results are output in JSON format."
  },
  {
    "question": "How is the Playwright web server configured?",
    "answer": "It starts the app with pnpm start on port 3999 before running tests, using the baseURL http://localhost:3999." 
  },
  {
    "question": "Where are the Playwright tests located?",
    "answer": "In the ./tests directory, for example tests/lens-builder.spec.ts."
  },
  {
    "question": "What must you do before running Playwright tests?",
    "answer": "You must build the app with pnpm build so the production server can start."
  },
  {
    "question": "How do you change the port used for Playwright testing?",
    "answer": "Edit the port in both the start script in package.json and the webServer.port in playwright.config.ts."
  }
]
```

---

## Summary
- Playwright is fully integrated for E2E testing.
- Tests can be run and exported as JSON for CI or reporting.
- The setup and scripts are reusable for other Next.js/React projects.

For more details, see the Playwright documentation: https://playwright.dev/docs/test-intro
