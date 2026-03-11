const { expect } = require("@playwright/test");
const { fs } = require("fs");
const { chromium } = require("@playwright/test");
exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addProductA = page.locator("data-test=add-to-cart-sauce-labs-backpack");
    this.addProductB = page.locator("data-test=add-to-cart-sauce-labs-bike-light");
    this.addProductC = page.locator("data-test=add-to-cart-sauce-labs-bolt-t-shirt");
    this.buttonShoppingCart = page.locator("data-test=shopping-cart-link");
    this.checkVisableCart = page.getByText("Your Cart");
  }
  async clickAddProductA() {
    await expect(this.addProductA).toBeVisible();
    await this.addProductA.click();
  }
  async clickAddProductB() {
    await expect(this.addProductB).toBeVisible();
    await this.addProductB.click();
  }
  async clickAddProductC() {
    await expect(this.addProductC).toBeVisible();
    await this.addProductC.click();
  }
  async clickButtonShoppingCart() {
    await expect(this.buttonShoppingCart).toBeVisible();
    await this.buttonShoppingCart.click();
    await expect(this.checkVisableCart).toBeVisible();
  }
}