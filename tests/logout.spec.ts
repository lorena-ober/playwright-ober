import { test } from '@playwright/test';
import RegisterPage, { RegisterUser } from '../POMs/registerPage';
import HomePage from '../POMs/homePage';

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
    const homePage = new HomePage(page);
    const user = makeUser();

    await register.open();
    await register.register(user);
    await register.expectSuccess();

    await homePage.logout();

    await homePage.assertUserIsLoggedOut();
  });
});
