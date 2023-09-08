const { test, expect,chromium,webkit,firefox } = require("@playwright/test");

let browser;
export class browserclass {

async browserintalizing(){
if (process.env.BROWSER== 'chromium')
  browser = await chromium.launch();
if (process.env.BROWSER== 'webkit')
  browser = await webkit.launch();
if (process.env.BROWSER== 'firefox')
  browser = await firefox.launch();
  return await browser;
}

}