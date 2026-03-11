const { expect } = require("@playwright/test");
const { fs } = require("fs");
const { chromium } = require("@playwright/test");
exports.CheckOutOverViewPage = class CheckOutOverViewPage {
  constructor(page) {
    this.page = page;
    this.reviewPricingProductA = page.locator("data-test=inventory-item-price").first();
    this.reviewPricingProductB = page.locator("data-test=inventory-item-price").nth(1);
    this.reviewPricingProductC = page.locator("data-test=inventory-item-price").nth(2);
    this.buttonFinish = page.locator("data-test=finish");
    this.checkVisableFinish = page.locator("data-test=pony-express");
  }
  async PricingProductA(value) {
    await expect(this.reviewPricingProductA).toBeVisible();
    await this.reviewPricingProductA.click();
    await expect(this.reviewPricingProductA).toHaveText(value);
  }
  async PricingProductB(value) {
    await expect(this.reviewPricingProductB).toBeVisible();
    await this.reviewPricingProductB.click();
    await expect(this.reviewPricingProductB).toHaveText(value);
  }
  async PricingProductC(value) {
    await expect(this.reviewPricingProductC).toBeVisible();
    await this.reviewPricingProductC.click();
    await expect(this.reviewPricingProductC).toHaveText(value);
  }
  async clickButtonFinish() {
    await expect(this.buttonFinish).toBeVisible();
    await this.buttonFinish.click();
    await expect(this.checkVisableFinish).toBeVisible();
  }
}