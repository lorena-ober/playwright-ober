import { test, expect } from '@playwright/test';
import LoginPage from '../POMs/loginPage';
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

test.describe('Login funkcionalnost', () => {
 
  test('Successful login with a newly registered user', async ({ page }) => {
    const register = new RegisterPage(page);
    const login = new LoginPage(page);
    const user = makeUser();

    // 1) registracija (happy path)
    await register.open();
    await register.register(user);
    await register.expectSuccess();

    // 2) logout da bismo stvarno testirali login
    await page.getByRole('link', { name: /log out/i }).click();
    await expect(page.locator('input[type="submit"][value="Log In"]')).toBeVisible({ timeout: 15000 });

    // 3) login
    await login.open();
    await login.login(user.username, user.password);

    // 4) assertion: log out link je dokaz da smo prijavljeni
    await expect(page.getByRole('link', { name: /log out/i })).toBeVisible({ timeout: 15000 });
  });
});
