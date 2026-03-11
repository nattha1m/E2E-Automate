const { expect } = require("@playwright/test");
const { fs } = require("fs");
const { chromium } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.fieldUsername = page.locator("data-test=username");
    this.fieldPassword = page.locator("data-test=password");
    this.buttonLogIn = page.locator("data-test=login-button");
    this.checkVisableProducts = page.getByText("Products");
  }

  async gotoLoginPage() {
    if (process.env.NODE_ENV === "local") {
      this.gotoLogin();
    } else {
      await this.page.goto(
        "https://www.saucedemo.com/"
      );
    }
  }

  async inputUserAndPassword(username, password) {
    await expect(this.fieldUsername).toBeVisible();
    await this.fieldUsername.fill(username);
    await expect(this.fieldUsername).toBeVisible();
    await this.fieldPassword.fill(password);
  }

  async inputUsername (username){
    await expect(this.fieldUsername).toBeVisible();
    await this.fieldUsername.fill(username);
  }

   async inputPassword (password){
    await expect(this.fieldPassword).toBeVisible();
    await this.fieldPassword.fill(password);
  }

  async clickLoginButton() {
    await expect(this.buttonLogIn).toBeVisible();
    await this.buttonLogIn.click();
    await expect(this.checkVisableProducts).toBeVisible();
  }
}
