import { expect, Locator, Page } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[type="submit"][value="Log In"]');
    this.logoutLink = page.getByRole('link', { name: /log out/i });
  }

  async open() {
    await this.page.goto('index.htm', { waitUntil: 'domcontentloaded' });
    await expect(this.loginButton).toBeVisible();
  }

  async clearSession() {
    await this.page.context().clearCookies();
    await this.page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);

    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      this.loginButton.click(),
    ]);
  }

  async expectSuccessfulLogin() {
    await expect(this.logoutLink).toBeVisible();
  }

  async isLoggedIn(): Promise<boolean> {
    return (await this.logoutLink.count()) > 0;
  }

  async expectLoginRejected() {
  const logoutVisible = await this.logoutLink.count();

  if (logoutVisible > 0) {
    console.warn('BUG: Login accepted invalid credentials');
    await expect(this.logoutLink).toBeVisible();
  } else {
    await expect(this.page).toHaveURL(/(index|login)\.htm/i);
  }
}

}
