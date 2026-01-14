import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('Register link opens the Register page', async ({ page }) => {
    await page.goto('index.htm', { waitUntil: 'domcontentloaded' });

    const registerLink = page.getByRole('link', { name: /^register$/i });
    await expect(registerLink).toBeVisible({ timeout: 15000 });

    await registerLink.click();

    await expect(page).toHaveURL(/register\.htm/i);
    await expect(page.getByRole('heading', { name: /signing up is easy/i })).toBeVisible({ timeout: 15000 });
  });

  test('Forgot login info link opens the Customer Lookup page', async ({ page }) => {
    await page.goto('index.htm', { waitUntil: 'domcontentloaded' });

    const forgotLink = page.getByRole('link', { name: /forgot login info/i });
    await expect(forgotLink).toBeVisible({ timeout: 15000 });

    await forgotLink.click();

    await expect(page).toHaveURL(/lookup\.htm/i);
    await expect(page.getByRole('heading', { name: /customer lookup/i })).toBeVisible({ timeout: 15000 });
await expect(page.locator('input[name="firstName"]')).toBeVisible();
await expect(page.locator('input[name="lastName"]')).toBeVisible();

  });
});
