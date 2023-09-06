const chromium = require('chrome-aws-lambda');

switch (process.env.BROWSER) {

    case "chromium":
        module.exports = async () => {
            const path = await chromium.executablePath;
            const executablePath = process.platform === 'linux' ? path : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
            return {
                browsers: [process.env.BROWSER],
                exitOnPageError: false,
                launchType: 'LAUNCH',
                launchOptions: {
                    executablePath,
                    headless: false,
                    args: [
                        '--enable-features=NetworkService',
                        '--ignore-certificate-errors',
                        '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                        '--disable-web-security',
                        //'--auto-open-devtools-for-tabs',
                        '--disable-features=IsolateOrigins,site-per-process',
                        '--use-fake-ui-for-media-stream',
                        '--use-fake-device-for-media-stream',
                        '--auto-select-desktop-capture-source=AdaptiveU',
                        '--enable-usermedia-screen-capturing',
                        '--allow-no-sandbox-job'
                    ]
                }
            }
        }
        break;

    case "firefox":
        module.exports = {
            browsers: [process.env.BROWSER],
            exitOnPageError: false,
            launchOptions: {
                headless: false,
                firefoxUserPrefs: {
                    "media.navigator.permission.disabled": true,
                    "media.navigator.streams.fake": true,
                }
            }
        }
        break;

    // case "all":
    //     module.exports = {
    //         browsers: [
    //             {
    //                 name: 'chromium',
    //                 launchType: 'LAUNCH',
    //                 launchOptions: {
    //                     headless: false,
    //                     args: ['--window-size=1920,1170',
    //                         '--window-position=0,0',
    //                         '--enable-features=NetworkService',
    //                         '--disable-web-security',
    //                         '--disable-features=IsolateOrigins,site-per-process',
    //                         '--use-fake-ui-for-media-stream',
    //                         '--enable-usermedia-screen-capturing',
    //                         '--use-fake-device-for-media-stream',
    //                         '--allow-no-sandbox-job'
    //                     ]
    //                 }
    //             },
    //             {
    //                 name: 'firefox',
    //                 launchType: 'LAUNCH',
    //                 launchOptions: {
    //                     headless: false,
    //                     firefoxUserPrefs: {
    //                         "media.navigator.permission.disabled": true,
    //                         "media.navigator.streams.fake": true,
    //                     }
    //                 },
    //             },
    //         ],
    //     }
    //     break;
}