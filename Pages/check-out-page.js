const { expect } = require("@playwright/test");
const { fs } = require("fs");
const { chromium } = require("@playwright/test");
exports.CheckOutPage = class CheckOutPage {
  constructor(page) {
    this.page = page;
    this.fieldFirstname = page.locator("data-test=firstName");
    this.fieldLastname = page.locator("data-test=lastName");
    this.fieldZipCode = page.locator("data-test=postalCode");
    this.buttonContinue = page.locator("data-test=continue");
    this.checkVisableCheckout = page.getByText("Checkout: Overview");
  }

  
  async inputDataCheckOut(firstname, lastname, zipcode) {
    await expect(this.fieldFirstname).toBeVisible();
    await this.fieldFirstname.fill(firstname);
    await expect(this.fieldLastname).toBeVisible();
    await this.fieldLastname.fill(lastname);
    await expect(this.fieldZipCode).toBeVisible();
    await this.fieldZipCode.fill(zipcode);
  }

  async clickButtonContinue() {
    await expect(this.buttonContinue).toBeVisible();
    await this.buttonContinue.click();
    await expect(this.checkVisableCheckout).toBeVisible();
  }
}
