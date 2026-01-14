import { test, expect } from '@playwright/test';
import HomePage from '../POMs/homePage';
import RegisterPage, { RegisterUser } from '../POMs/registerPage';
import AccountsPage from '../POMs/accountsPage';

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

test.describe('Auth (register -> login -> logout)', () => {
  test('register creates a new user (happy path)', async ({ page }) => {
    const register = new RegisterPage(page);
    const user = makeUser();

    await register.open();
    await register.register(user);

    await register.expectSuccess(); // auto-retry assertion
  });

  test('login with newly registered user redirects to Accounts Overview', async ({ page }) => {
    const register = new RegisterPage(page);
    const home = new HomePage(page);
    const accounts = new AccountsPage(page);

    const user = makeUser();

    await register.open();
    await register.register(user);
    await register.expectSuccess();

    // nakon registracije si već logiran, ali provjerimo da Accounts Overview radi
    // (ParaBank često odmah odvede na overview)
    await accounts.expectLoaded();

    // za svaki slučaj i logout pa login ponovno (čisti E2E)
    await accounts.logout();
    await home.expectLoggedOut();

    await home.login(user.username, user.password);
    await accounts.expectLoaded();
  });

  test('logout returns user to login page', async ({ page }) => {
    const register = new RegisterPage(page);
    const home = new HomePage(page);
    const accounts = new AccountsPage(page);

    const user = makeUser();

    await register.open();
    await register.register(user);
    await register.expectSuccess();

    await accounts.expectLoaded();
    await accounts.logout();

    await home.expectLoggedOut(); // auto-retry assertions
  });
});
