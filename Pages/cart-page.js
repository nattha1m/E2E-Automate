const { expect } = require("@playwright/test");
const { fs } = require("fs");
const { chromium } = require("@playwright/test");

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.reviewProductA = page.locator("data-test=inventory-item-price").first();
    this.reviewProductB = page.locator("data-test=inventory-item-price").nth(1);
    this.reviewProductC = page.locator("data-test=inventory-item-price").nth(2);
    this.buttonCheckOut = page.locator("data-test=checkout");
    this.checkVisableCheckOut = page.getByText("Checkout: Your Information");
    // this.checkVisableCheckOut = page.getByText("Checkout: Your Information");
  }
  async checkProductA(value) {
    await expect(this.reviewProductA).toBeVisible();
    await this.reviewProductA.click();
    await expect(this.reviewProductA).toHaveText(value);

  }
  async checkProductB(value) {
    await expect(this.reviewProductB).toBeVisible();
    await this.reviewProductB.click();
    await expect(this.reviewProductB).toHaveText(value);
  }
  async checkProductC(value) {
    await expect(this.reviewProductC).toBeVisible();
    await this.reviewProductC.click();
    await expect(this.reviewProductC).toHaveText(value);
  }
  async clickButtonCheckOut() {
    await expect(this.buttonCheckOut).toBeVisible();
    await this.buttonCheckOut.click();
    await expect(this.checkVisableCheckOut).toBeVisible();
  }
  
}