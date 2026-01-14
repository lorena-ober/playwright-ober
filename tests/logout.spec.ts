import { test, expect } from '@playwright/test';
import RegisterPage, { RegisterUser } from '../POMs/registerPage';

function makeUser(): RegisterUser {
  const unique = `ober_${Date.now()}`;
  const password = process.env.DEFAULT_PASSWORD || 'Test12345!';

  return {
    firstName: 'Lorena',
    lastName: 'Ober',
    address: 'Main street 1',
    city: 'Osijek',
    state: 'HR',
    zipCode: '31000',
    phone: '0911111111',
    ssn: '123456789',
    username: unique,
    password,
  };
}

test.describe('Logout funkcionalnost', () => {
  test('Successful user logout', async ({ page }) => {
    const register = new RegisterPage(page);
    const user = makeUser();

    // 1) registracija (automatski login)
    await register.open();
    await register.register(user);
    await register.expectSuccess();

    // 2) logout
    await page.getByRole('link', { name: /log out/i }).click();

    // 3) assertion – login forma mora biti vidljiva
    await expect(
      page.locator('input[type="submit"][value="Log In"]')
    ).toBeVisible({ timeout: 15000 });
  });
});
