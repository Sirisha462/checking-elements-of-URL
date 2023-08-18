# checking-elements-of-URL

## Project Description:
 This project is to check all the clickable elements and images of given url.

 ## Getting Started
  1. Install playwright from command line
  ```
   npm init playwright@latest
```
  2. While installing the playwright install the browsers as well.

 ## Test cases
 Test cases are present under "tests" folder.
 There are three test cases in this project
 1. To check whether all the links are clickable and taking screenshot after clicking the links
 2. To check whether all the buttons are clickable and taking screenshot  after clicking the buttons.
 3. To verify all the images are loading and taking screenshot of images on loading in new tab.

  ## To Run the test cases:
  Command to be used in windows:: 
   ``` 
   $env:URL="Provide any url" ; npx playwright test
 ```
   Example::
   ```
   $env:URL="https://tesing-answerforcewebsite.appspot.com/" ; npx playwright test 
```
   we can add all the requried parameters at the end of npx playwright test. Examples:
   <br /> For adding headed mode::
   
    
     $env:URL=" https://tesing-answerforcewebsite.appspot.com/" ; npx playwright test ./tests/clickable-elements.spec.js --headed
  For specifying the browser and headed mode:
    
     $env:URL=" https://tesing-answerforcewebsite.appspot.com/" ; npx playwright test ./tests/clickable-elements.spec.js --project chromium --headed 
  Other Browser options available are: firefox and webkit. Replace the specific browser in the place of chromium in above command.
    

## Languages used:
   Javascript
## Framework used:
   Playwright
