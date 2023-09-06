const { chromium,webkit,firefox } = require("@playwright/test");
import * as bundledchromium from 'chrome-aws-lambda';

let browser;
export class browserclass {

async browserintalizing(){
if (process.env.BROWSER== 'chromium'){
  browser =await Promise.resolve(bundledchromium.executablePath).then(
  (executablePath) => {
    if(!executablePath) {
      return chromium.launch();
    }
    return chromium.launch({executablePath});
  }
  )
}

if (process.env.BROWSER== 'webkit')
  browser = await webkit.launch();
if (process.env.BROWSER== 'firefox')
  browser = await firefox.launch();
  return browser;
}

}