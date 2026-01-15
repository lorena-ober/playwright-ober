import { expect, Locator, Page } from '@playwright/test';

export default class HomePage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;
  readonly logoutLink: Locator;
  readonly errorText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[type="submit"][value="Log In"]');
    this.registerLink = page.getByRole('link', { name: /register/i });
    this.logoutLink = page.getByRole('link', { name: /log out/i });
    this.errorText = page.locator('.error');
  }

  async open() {
    await this.page.goto('index.htm');
    await expect(this.loginButton).toBeVisible();
  }

  async goToRegister() {
    await this.registerLink.click();
    await expect(this.page).toHaveURL(/register\.htm/);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError() {
    await expect(this.errorText).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async assertUserIsLoggedOut() {
    await expect(this.loginButton).toBeVisible();
    await expect(this.page).toHaveURL(/index\.htm/);
  }
}
