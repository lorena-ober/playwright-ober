import { expect, Locator, Page } from '@playwright/test';

export type RegisterUser = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
};

export default class RegisterPage {
  readonly page: Page;
  readonly panel: Locator;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly ssn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;

  readonly registerButton: Locator;
  readonly errorText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.panel = page.locator('#rightPanel');

    this.firstName = page.locator('input[name="customer.firstName"]');
    this.lastName = page.locator('input[name="customer.lastName"]');
    this.address = page.locator('input[name="customer.address.street"]');
    this.city = page.locator('input[name="customer.address.city"]');
    this.state = page.locator('input[name="customer.address.state"]');
    this.zipCode = page.locator('input[name="customer.address.zipCode"]');
    this.phone = page.locator('input[name="customer.phoneNumber"]');
    this.ssn = page.locator('input[name="customer.ssn"]');

    this.username = page.locator('input[name="customer.username"]');
    this.password = page.locator('input[name="customer.password"]');
    this.confirmPassword = page.locator('input[name="repeatedPassword"]');

    this.registerButton = this.panel.locator('input[type="submit"][value="Register"]');

    this.errorText = page.locator('.error');
  }

  async open() {
    await this.page.goto('register.htm', { waitUntil: 'domcontentloaded' });

    await expect(this.panel).toBeVisible();
    await expect(this.firstName).toBeVisible();
    await expect(this.registerButton).toBeVisible();
  }

  async submitEmpty() {
    await this.registerButton.click();
  }

  async register(user: RegisterUser) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.address.fill(user.address);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.zipCode.fill(user.zipCode);
    await this.phone.fill(user.phone);
    await this.ssn.fill(user.ssn);

    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.password);

    await this.registerButton.click();
  }

  async registerWithPasswordMismatch(user: RegisterUser, wrongConfirm: string) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.address.fill(user.address);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.zipCode.fill(user.zipCode);
    await this.phone.fill(user.phone);
    await this.ssn.fill(user.ssn);

    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(wrongConfirm);

    await this.registerButton.click();
  }

 async expectHasErrors() {
  await expect(this.errorText.first()).toBeVisible();
}


async expectSuccess() {
  await expect(this.panel).toContainText(/success/i);
}

  async expectRequiredFieldErrors() {
  await this.expectHasErrors();
}

async expectPasswordMismatchError() {
  await this.expectHasErrors();
}

async expectFirstNameRequired() {
  await expect(this.page.getByText('First name is required.')).toBeVisible();
}

async expectPasswordMismatchMessage() {
  await expect(this.page).toHaveURL(/register\.htm/i);

  await expect(this.page.getByRole('link', { name: /log out/i })).toHaveCount(0);

  await expect(this.page.getByText(/created successfully/i)).toHaveCount(0);


}




}
