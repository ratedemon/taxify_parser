const puppeteer = require('puppeteer');

const userData = {
    login: 'valik@taxidrive.com.ua',
    password: 'tttt1234'
};

(async () => {
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://fleets.taxify.eu/login');
    
    // await page.waitForSelector('#ember146 > div > div > form');
    await page.click('#username');
    await page.type('#username', userData.login);
  
    await page.click('#password');
    await page.type('#password', userData.password);
    await page.screenshot({path: 'google.png'});
    await page.click('form button[type=submit]');

    await page.waitForNavigation();
  
    await page.screenshot({path: 'google1.png'});

    await page.click('#ember152');
    
    await page.screenshot({path: 'google2.png'});
    // await page.waitForNavigation();

    await page.click('#email')
    await page.type('#email', 'test@mail.ru');

    await page.click('#phone')
    await page.type('#phone', '+380665820222');

    await page.screenshot({path: 'google2.png'});
    await page.click('form button[type=submit]');

    await page.waitFor(2000);
    await page.screenshot({path: 'google6.png'});
    await page.click('#ember10 > div > div > div > div.col-md-9.col-sm-8.content > div > div > h4:nth-child(3) > a');
    await page.waitForNavigation();

    await page.click('#first_name')
    await page.type('#first_name', 'Костя');

    await page.click('#last_name')
    await page.type('#last_name', 'Петров');

    await page.screenshot({path: 'google4.png'});
    await page.click('form button[type=submit]');

    await page.screenshot({path: 'google3.png'});
    await browser.close();
  }catch(e){
    console.log(e);
  }
})();
