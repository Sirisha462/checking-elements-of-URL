import { browserclass } from "./Browserinstancing";

const { test, expect, chromium,firefox } = require('@playwright/test')
export class baseclass {
    constructor(){
        this.browser=null;
        this.context=null;
        this.page=null;
        this.browservar=new browserclass();
    }


    async initializingBrowser(){
        this.browser=await this.browservar.browserintalizing();
        this.context=await this.browser.newContext();
        this. page = await this.context.newPage();
    }

    async returningPage(){
        return this.page;
    }

    async returningContext(){
        return this.context;
    }

    async closingthepage(page){
        await page.close();
    }

    async creatingnewpage(context) {
        return await context.newPage();
    }

    async gotoUrl(page, url) {
        await page.goto(url);
    }

    async gotoUrlForStatus(page, url) {
        return await page.goto(url);
    }

    async gotoUrl(page, url, state) {
        await page.goto(url, { waitUntil: state });
    }

    async clickAction(locator) {
        await locator.click();
    }

    async gettingAttribute(locator, attribute) {
        return await locator.getAttribute(attribute);
    }

    async gettingTextContext(locator) {
        return await locator.textContent();
    }

    async waitingForLoadState(page, state) {
        await page.waitForLoadState(state)
    }

     async waitingForEvent(context){
        return (await context).waitForEvent('page');
    }

    async softAssertion(status,value){
       await expect.soft(status).toBe(value);
    }

    async scrolling(locator) {
        await locator.scrollIntoViewIfNeeded();
    }
    async takingScreenshot(element, page) {
        await test.info().attach(page.url(), {
            body: await element.screenshot(),
            contentType: "image/png",
        })
    }


}