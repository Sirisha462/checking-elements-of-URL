const { test, expect } = require("@playwright/test");
import {baseclass } from '../Pages/Base'
export class applicationpage {
   constructor(context,page,url) {
      // this.browser = browser;
      // this.context = context;
      // this.page = page;
      this.base = new baseclass();
      this.url = url;
      this.page= page;
      this.context=context;
      this.links =this.page.locator('a:visible');
      this.buttons = this.page.locator('button:visible');
      this.images =this.page.locator("img:visible");
   }
   

   async goToApplicationPage() {
      await this.base.gotoUrl(this.page, this.url);
   }

   async numberOfVisibleLinks() {
      const linkcount = await this.links.count();
      console.log('total number of visible links ' + linkcount);
      return linkcount;
   }

   async numberOfVisibleButtons() {
      const buttoncount = await this.buttons.count();
      console.log('total number of visible buttons ' + buttoncount);
      return buttoncount;
   }

   async numberOfVisibleImages() {
      const numberofimages = await this.images.count();
      console.log("Number of visible images: " + numberofimages);
      return numberofimages;
   }

   async clickingLinks(linkcount) {

      for (var i = 1; i < linkcount; i++) {
         const clickable = await this.base.gettingAttribute(this.links.nth(i), 'href');
         const targetvalue = await this.base.gettingAttribute(this.links.nth(i), 'target');
         console.log(i + ":" + clickable);

         if (clickable == null) {
            console.log("the link is not clickable");
         }

         else if (targetvalue == "_blank") {
            console.log("Opening in new tab");
            const pagepromise = this.base.waitingForEvent(this.context);
            await this.base.clickAction(this.links.nth(i));
            const newpage = await pagepromise;
            await this.base.waitingForLoadState(newpage, "load");
            await this.base.takingScreenshot(newpage, newpage);
            await this.base.closingthepage(newpage);

         }

         else {
            await this.base.clickAction(this.links.nth(i));
            await this.base.waitingForLoadState(this.page, "load");
            await this.base.takingScreenshot(this.page, this.page);
         }
         await this.base.gotoUrl(this.page, this.url, 'load');
      }
   }

   async clickingButtons(buttoncount) {
      for (var i = 0; i < buttoncount; i++) {
         const clickable = await this.base.gettingTextContext(this.buttons.nth(i))
         console.log(i + ":" + clickable);
         await this.base.clickAction(this.buttons.nth(i));
         await this.base.waitingForLoadState(this.page, "load");
         await this.base.takingScreenshot(this.page, this.page);
         await this.base.gotoUrl(this.page, this.url, 'load');
      }
   }

   async scrollingDown(imagecount) {
      for (var i = 0; i < imagecount; i++) {
         await this.base.scrolling(this.images.nth(i));
      }
   }

   async checkingImage(imagecount) {
      for (var i = 0; i < imagecount; i++) {
         var imageurl = '';
         const src = await this.base.gettingAttribute(this.images.nth(i), 'src')
         console.log(i + ":" + src);
         await this.base.takingScreenshot(this.images.nth(i), this.page);
         const newpage = await this.base.creatingnewpage(this.context);
         if (src.startsWith("http") || src.startsWith("https"))
            imageurl = src;
         else
            imageurl = this.url + src;
         const response = await this.base.gotoUrlForStatus(newpage, imageurl);
         await this.base.waitingForLoadState(newpage, "load");
         const status = await response.status();
         await this.base.softAssertion(status,200);
         await this.base.takingScreenshot(newpage, newpage);
         await this.base.closingthepage(newpage);
      }

   }

}