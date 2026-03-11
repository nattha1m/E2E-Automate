const { expect } = require("@playwright/test");
const { fs } = require("fs");
const { chromium } = require("@playwright/test");
exports.CompletePage = class CompletePage {
  constructor(page) {
    this.page = page;
    this.buttonBackToMain = page.locator("data-test=back-to-products");
    this.checkVisableProducts = page.getByText("Products");
  }
  async clickButtonBackToMain() {
    await expect(this.buttonBackToMain).toBeVisible();
    await this.buttonBackToMain.click();
    await expect(this.checkVisableProducts).toBeVisible();
  }
}