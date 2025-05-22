import { test, expect, Page } from '@playwright/test';

test.describe('Lens Builder UI', () => {
  async function fillLensInfo(page: Page) {
    await expect(page.getByRole('heading', { name: /AWS Well-Architected Tool Lens Builder/i })).toBeVisible();
    await page.getByPlaceholder('1.0').fill('1.0');
    await page.getByPlaceholder('My Custom Lens').fill('Test Lens');
    await page.getByPlaceholder('A custom lens for AWS Well-Architected Tool').fill('Test description');
    await page.getByRole('button', { name: /Continue to Pillars/i }).click();
  }

  test('should render home page and add a pillar', async ({ page }) => {
    await page.goto('/');
    await fillLensInfo(page);
    await page.getByPlaceholder('Enter pillar name').fill('Security');
    await page.getByRole('button', { name: /Add Pillar/i }).click();
    // Use a more specific locator for the pillar name (span inside CardTitle)
    const pillarCard = page.locator('div:has-text("Security") .text-lg span', { hasText: 'Security' });
    await expect(pillarCard.first()).toBeVisible();
  });

  test('should add a question to a pillar', async ({ page }) => {
    await page.goto('/');
    await fillLensInfo(page);
    await page.getByPlaceholder('Enter pillar name').fill('Reliability');
    await page.getByRole('button', { name: /Add Pillar/i }).click();
    await page.getByRole('button', { name: /0 Questions?/i }).click();

    await page.getByPlaceholder('e.g., Do you follow example best practices?').fill('Is backup enabled?');
    await page.getByPlaceholder('e.g., Assess whether your team follows example standards and controls.').fill('Check if backup is enabled for all resources.');
    await page.getByRole('button', { name: /Add Question/i }).click();
    await expect(page.getByText('Is backup enabled?')).toBeVisible();
  });

  test('should show JSON preview after completing lens', async ({ page }) => {
    await page.goto('/');
    await fillLensInfo(page);
    await page.getByPlaceholder('Enter pillar name').fill('Performance');
    await page.getByRole('button', { name: /Add Pillar/i }).click();
    await page.getByRole('button', { name: /Generate JSON/i }).click();
    // Use a more generic check for the JSON preview (look for a code block or JSON string)
    await expect(page.locator('pre, code, textarea')).toBeVisible();
  });
});
