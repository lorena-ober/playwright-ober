import { expect, Locator, Page } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[type="submit"][value="Log In"]');
    this.errorMessage = page.locator('.error');
  }

  async open() {
    await this.page.goto('index.htm');
    await expect(this.username).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError() {
    await expect(this.errorMessage.first()).toBeVisible();
  }

  async expectSuccessfulLogin() {
  await expect(this.page.getByRole('link', { name: /log out/i }))
    .toBeVisible({ timeout: 15000 });
}

}
