const { test, expect, chromium } = require('@playwright/test')
import { applicationpage } from '../Pages/checking-application'
let app;
let browser;
let page;
let context;


test.beforeEach(async() => {
    const url=process.env.URL;
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    app=new applicationpage(browser,context,page,url);
   await app.goToApplicationPage();

});

test.afterEach(async()=>{
    page.close();

})

test.describe('checking element in an application', () => {
    
    test('clicking links and taking screenshot', async () => {
        const linkcount =  await app.numberOfVisibleLinks();
        await app.clickingLinks(linkcount);
    })

    test('clicking buttons and taking screenshot', async () => {
        const buttoncount =  await app.numberOfVisibleButtons(); 
        await app.clickingButtons(buttoncount);
    })

    test('checking images are loaded or broken', async () => {
        const imagecount = await app.numberOfVisibleImages();
        await app.scrollingDown(imagecount);
        await app.checkingImage(imagecount);
    })


})