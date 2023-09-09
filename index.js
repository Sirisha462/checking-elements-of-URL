const functions = require('@google-cloud/functions-framework');
const testing = require('@playwright/test')
const { stdout } = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

functions.http('helloGET', async (req, res) => {
   process.env.ENVIRONMENT = req.body.env;
   process.env.BASEURL = req.body.url;
   process.env.BROWSER = req.body.browser;
   const browser = req.body.browser;
   const script_name = req.body.script_name;
    const cmd = `.\\node_modules\\.bin\\playwright test ${script_name} --project ${browser} --headed`;
   console.log(cmd);

   // try {
   //    await exec(cmd,(stdout)=>{;
   //    console.log(stdout)});
   // } catch (error) {
   //    console.log(error)
   // }
   await exec(cmd, (error, stdout, stderr) => {
      if (error) {
         console.error(`exec error: ${error}`);
         return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
   });
   res.sendStatus(200);

});