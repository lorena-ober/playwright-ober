import { expect, Locator, Page } from '@playwright/test';

export default class AccountsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /accounts overview/i });
    this.logoutLink = page.getByRole('link', { name: /log out/i });
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.page).toHaveURL(/overview\.htm/);
    await expect(this.logoutLink).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }
}
