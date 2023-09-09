const { test, expect, chromium,firefox } = require('@playwright/test')
import { applicationpage } from '../Pages/checking-application'
import {baseclass } from '../Pages/Base'
let app;
let base;
let pageinstance;
test.beforeEach(async() => {
    const url=process.env.BASEURL;
    base=new baseclass();
    await base.initializingBrowser();
     pageinstance=await base.returningPage();
    const contextinstance=await base.returningContext();
    app=new applicationpage(contextinstance,pageinstance,url);
   await app.goToApplicationPage();

});

test.afterEach(async()=>{
    base.closingthepage(pageinstance);

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

    test.only('checking images are loaded or broken', async () => {
        const imagecount = await app.numberOfVisibleImages();
        await app.scrollingDown(imagecount);
        await app.checkingImage(imagecount);
    })


})