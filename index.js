const functions = require('@google-cloud/functions-framework');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

functions.http('helloGET', async (req, res) => {
   process.env.ENVIRONMENT = req.body.env;
   process.env.BASEURL = req.body.url;
   const browser = req.body.browser;
   const script_name = req.body.script_name;
   // const cmd = "C:/Users/SIRI/Desktop/ClickableElements/node_modules/.bin/playwright test ./tests/clickable-elements.spec.js --project chromium --headed";
   const cmd="npx playwright test ./tests/clickable-elements.spec.js --project chromium --headed";
   console.log(cmd);

   try {
      await exec(cmd);
   } catch (error) {
      console.log(error)
   }

   res.sendStatus(200);

});