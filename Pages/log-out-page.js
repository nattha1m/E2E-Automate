const { expect } = require("@playwright/test");
const { fs } = require("fs");
const { chromium } = require("@playwright/test");
exports.LogOutPage = class LogOutPage {
  constructor(page) {
    this.page = page;
    this.iconHamburger = page.locator("id=react-burger-menu-btn");
    this.buttonLogOut = page.locator("data-test=logout-sidebar-link");
  }
  async clickIconHamburger() {
    await expect(this.iconHamburger).toBeVisible();
    await this.iconHamburger.click();
    await expect(this.buttonLogOut).toBeVisible();
  }
  async clickbuttonLogOut() {
    await expect(this.buttonLogOut).toBeVisible();
    await this.buttonLogOut.click();
  }
}