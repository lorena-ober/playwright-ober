import { test } from '@playwright/test';
import RegisterPage, { RegisterUser } from '../POMs/registerPage';

function makeUserBase(): RegisterUser {
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

test.describe('Register validations', () => {
  test('register shows validation errors when submitting empty form', async ({ page }) => {
    const register = new RegisterPage(page);

    await register.open();
    await register.submitEmpty();

    await register.expectRequiredFieldErrors(); 
  });

  test('Registration displays an error when confirmation password does not match', async ({ page }) => {
    const register = new RegisterPage(page);
    const user = makeUserBase();

    await register.open();
    await register.registerWithPasswordMismatch(user, 'WrongConfirm123');

    await register.expectPasswordMismatchMessage();

  });
});
