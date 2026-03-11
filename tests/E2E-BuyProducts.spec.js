const { test, expect } = require('@playwright/test')
const fs = require('fs/promises')
const path = require('path')

const { users } = require('../Data/data.json')
const { LoginPage } = require('../Pages/login-page')
const { CommonTool } = require('../Common/common-page')
const { ProductsPage } = require('../Pages/products-list-page')
const { CartPage } = require('../Pages/cart-page')
const { CheckOutPage } = require('../Pages/check-out-page')
const { CheckOutOverViewPage } = require('../Pages/check-out-overview-page')
const { CompletePage } = require('../Pages/complete-page')
const { LogOutPage } = require('../Pages/log-out-page')

const testData = {
    firstname: 'Natthachai',
    lastname: 'Sirinai',
    zipcode: '10700',
    priceA: '$29.99',
    priceB: '$9.99',
    priceC: '$15.99',
}

const logAndTimeStamp = message => {
    const date = new Date();
    const bangkokTime = date.toLocaleString("en-US", {
        timeZone: "Asia/Bangkok"
    });
    console.log(message, bangkokTime)
}

test.use({
    video: 'on',
    viewport: null
})

test.describe('E2E-BuyProducts.spec', async () => {
    logAndTimeStamp('E2E-BuyProducts.spec')
    test.setTimeout(600000)
    test.slow()

    test('Swag Labs', async () => {
        const commonTool = new CommonTool('Swag Labs-TC001')
        commonTool.setTitleflowVideo('Swag Labs')

        let { browser, page } = await commonTool.createPageWithFakeVideo(
            '../resources/temp-fake-video.y4m',
            'Swag Labs'
        )

        const login = new LoginPage(page)
        const products = new ProductsPage(page)
        const cart = new CartPage(page)
        const checkout = new CheckOutPage(page)
        const checkOutOverView = new CheckOutOverViewPage(page)
        const complete = new CompletePage(page)
        const logOut = new LogOutPage(page)

        await test.step('Login Page', async () => {
            logAndTimeStamp('Login Page')
            await login.gotoLoginPage()
            await page.waitForTimeout(3000)
            await page.screenshot({ path: 'screenshot.png' });
            await commonTool.takeScreenshot(page, 'Swag Labs', '1-Login')
            await login.inputUserAndPassword(
                users.testAccount.username,
                users.testAccount.password
            )
            await page.waitForTimeout(3000)
            await commonTool.takeScreenshot(
                page,
                'Swag Labs',
                '2-Input_Username_and_Password'
            )

            await login.clickLoginButton()
            await page.waitForTimeout(3000)
            await commonTool.takeScreenshot(page, 'Swag Labs', '3-Login Success')
        })
        
        await test.step('Products Page', async () => {
            logAndTimeStamp('Product Page')
            await products.clickAddProductA();
            await page.waitForTimeout(3000)
            await commonTool.takeScreenshot(page, 'Swag Labs', '4-clickAddProductA')
            await products.clickAddProductB();
            await page.waitForTimeout(3000)
            await commonTool.takeScreenshot(page, 'Swag Labs', '5-clickAddProductB')
            await products.clickAddProductC();
            await page.waitForTimeout(3000)
            await commonTool.takeScreenshot(page, 'Swag Labs', '6-clickAddProductC')
            await products.clickButtonShoppingCart();
            await page.waitForTimeout(3000)
            await commonTool.takeScreenshot(page, 'Swag Labs', '7-clickButtonShoppingCart')
 })
        await test.step('Cart Page', async () => {
            logAndTimeStamp('Cart Page')
            await cart.checkProductA(testData.priceA);
            await cart.checkProductB(testData.priceB);
            await cart.checkProductC(testData.priceC);
            await page.waitForTimeout(3000);
            await commonTool.takeScreenshot(page, 'Swag Labs', '8-checkProducts');
            await cart.clickButtonCheckOut();
        })
        await test.step('Check Out Page', async () => {
            logAndTimeStamp('Check Out Page')
            await checkout.inputDataCheckOut(testData.firstname,testData.lastname,testData.zipcode);
            await page.waitForTimeout(3000);
            await commonTool.takeScreenshot(page, 'Swag Labs', '9 inputDataCheckOut');
            await checkout.clickButtonContinue();
            await commonTool.takeScreenshot(page, 'Swag Labs', '10 clickButtonContinue');
        })
        await test.step('Check Out Overview Page', async () => {
            logAndTimeStamp('Check Out Overview Page')
            await checkOutOverView.PricingProductA(testData.priceA);
            await checkOutOverView.PricingProductB(testData.priceB);
            await checkOutOverView.PricingProductC(testData.priceC);
            await page.waitForTimeout(3000);
            await commonTool.takeScreenshot(page, 'Swag Labs', '11-checkOutOverView');
        })
        await test.step('Check Out Overview Page', async () => {
            logAndTimeStamp('Check Out Overview Page')
            await checkOutOverView.PricingProductA(testData.priceA);
            await checkOutOverView.PricingProductB(testData.priceB);
            await checkOutOverView.PricingProductC(testData.priceC);
            await page.waitForTimeout(3000);
            await commonTool.takeScreenshot(page, 'Swag Labs', '11-checkOutOverView');
            await checkOutOverView.clickButtonFinish();
        })
        await test.step('Complete Page', async () => {
            logAndTimeStamp('Complete Page')
            await complete.clickButtonBackToMain();
             await page.waitForTimeout(3000);
            await commonTool.takeScreenshot(page, 'Swag Labs', '12-clickButtonBackToMain');
        })
        await test.step('Log Out Page', async () => {
            logAndTimeStamp('Log Out Page')
            await logOut.clickIconHamburger()
            await page.waitForTimeout(3000);
            await commonTool.takeScreenshot(page, 'Swag Labs', '13-clickIconHamburger');
            await logOut.clickbuttonLogOut()
            await page.waitForTimeout(3000);
            await commonTool.takeScreenshot(page, 'Swag Labs', '13-clickbuttonLogOut');
        })
        
        
    })
})