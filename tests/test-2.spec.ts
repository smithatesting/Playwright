import { test, expect, chromium } from '@playwright/test';
const browser = await chromium.launch();
const context = await browser.newContext();
await context.tracing.start({ screenshots: true, snapshots: true });

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('azure devops');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  await page.getByRole('link', { name: 'Azure Repos' }).click();
  await page.locator('#highlight-oce16b').getByRole('link', { name: 'Try Azure for free' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Start free' }).getByRole('link', { name: 'Sign up for your Azure account, start free' }).click();
  await page.getByText('Sign in No account? Create one! Can’t access your account? Next Sign in with Git').click();
});
await context.tracing.stop({path:"trace.zip"})